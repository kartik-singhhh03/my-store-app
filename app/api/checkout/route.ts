import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import connectDB from '@/lib/mongodb'
import Product from '@/lib/models/Product'
import Order from '@/lib/models/Order'
import { createPaymentIntent } from '@/lib/stripe'
import { generateOrderNumber } from '@/lib/utils'
import { rateLimit } from '@/lib/rate-limit'

export async function POST(request: NextRequest) {
  // Rate limiting
  const rateLimitResult = rateLimit(request, 5, 60000) // 5 requests per minute
  if (!rateLimitResult.success) {
    return NextResponse.json(
      { error: 'Too many requests' },
      { status: 429 }
    )
  }

  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { productIds } = await request.json()

    if (!productIds || !Array.isArray(productIds) || productIds.length === 0) {
      return NextResponse.json(
        { error: 'Invalid product IDs' },
        { status: 400 }
      )
    }

    await connectDB()

    // Fetch products
    const products = await Product.find({
      _id: { $in: productIds },
      isActive: true
    }).lean()

    if (products.length !== productIds.length) {
      return NextResponse.json(
        { error: 'Some products not found or inactive' },
        { status: 400 }
      )
    }

    // Calculate total
    const totalAmount = products.reduce((sum, product) => sum + product.price, 0)

    // Create order
    const orderNumber = generateOrderNumber()
    
    // Create Stripe payment intent
    const paymentIntent = await createPaymentIntent(totalAmount, {
      orderNumber,
      customerId: session.user.id,
      productIds: productIds.join(',')
    })

    // Create order in database
    const order = await Order.create({
      orderNumber,
      customer: session.user.id,
      products: products.map(product => ({
        product: product._id,
        price: product.price
      })),
      totalAmount,
      paymentIntentId: paymentIntent.id,
      status: 'pending',
      paymentStatus: 'pending'
    })

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      orderId: order._id,
      orderNumber
    })
  } catch (error) {
    console.error('Error creating checkout session:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}