import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'
import Stripe from 'stripe'
import connectDB from '@/lib/mongodb'
import Order from '@/lib/models/Order'
import Product from '@/lib/models/Product'
import User from '@/lib/models/User'
import { generateSecureDownloadUrl } from '@/lib/utils'
import { sendOrderConfirmationEmail, sendAdminNotificationEmail } from '@/lib/email'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const headersList = headers()
    const signature = headersList.get('stripe-signature')!

    let event: Stripe.Event

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
    } catch (err) {
      console.error('Webhook signature verification failed:', err)
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 400 }
      )
    }

    await connectDB()

    if (event.type === 'payment_intent.succeeded') {
      const paymentIntent = event.data.object as Stripe.PaymentIntent

      // Find the order
      const order = await Order.findOne({
        paymentIntentId: paymentIntent.id
      }).populate('customer products.product')

      if (!order) {
        console.error('Order not found for payment intent:', paymentIntent.id)
        return NextResponse.json({ error: 'Order not found' }, { status: 404 })
      }

      // Update order status
      order.status = 'completed'
      order.paymentStatus = 'succeeded'

      // Generate download URLs for each product
      for (const orderProduct of order.products) {
        const downloadUrl = generateSecureDownloadUrl(
          orderProduct.product._id.toString(),
          order._id.toString()
        )
        orderProduct.downloadUrl = downloadUrl
        orderProduct.downloadExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours

        // Increment download count for the product
        await Product.findByIdAndUpdate(
          orderProduct.product._id,
          { $inc: { downloadCount: 1 } }
        )
      }

      await order.save()

      // Send confirmation emails
      try {
        await sendOrderConfirmationEmail(
          order.customer.email,
          order.orderNumber,
          order.products.map(p => ({
            title: p.product.title,
            price: p.price
          })),
          order.totalAmount
        )

        await sendAdminNotificationEmail(
          order.orderNumber,
          order.customer.email,
          order.totalAmount
        )
      } catch (emailError) {
        console.error('Error sending emails:', emailError)
        // Don't fail the webhook for email errors
      }
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 500 }
    )
  }
}