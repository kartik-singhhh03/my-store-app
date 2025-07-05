import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import connectDB from '@/lib/mongodb'
import Order from '@/lib/models/Order'
import { stripe } from '@/lib/stripe'

export async function GET(
  request: NextRequest,
  { params }: { params: { orderId: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    await connectDB()

    const order = await Order.findOne({
      _id: params.orderId,
      customer: session.user.id
    }).populate('products.product', 'title coverImage')

    if (!order) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      )
    }

    // Get client secret for payment
    let clientSecret = ''
    if (order.paymentIntentId && order.status === 'pending') {
      const paymentIntent = await stripe.paymentIntents.retrieve(order.paymentIntentId)
      clientSecret = paymentIntent.client_secret || ''
    }

    return NextResponse.json({
      order,
      clientSecret
    })
  } catch (error) {
    console.error('Error fetching order:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}