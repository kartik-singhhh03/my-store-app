import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import connectDB from '@/lib/mongodb'
import Order from '@/lib/models/Order'
import Product from '@/lib/models/Product'
import { validateDownloadToken } from '@/lib/utils'
import { generatePresignedDownloadUrl } from '@/lib/s3'

export async function GET(
  request: NextRequest,
  { params }: { params: { token: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Validate download token
    const tokenData = validateDownloadToken(params.token)
    if (!tokenData) {
      return NextResponse.json(
        { error: 'Invalid download token' },
        { status: 400 }
      )
    }

    // Check if token is expired (24 hours)
    const tokenAge = Date.now() - tokenData.timestamp
    if (tokenAge > 24 * 60 * 60 * 1000) {
      return NextResponse.json(
        { error: 'Download link expired' },
        { status: 410 }
      )
    }

    await connectDB()

    // Find the order and verify ownership
    const order = await Order.findOne({
      _id: tokenData.orderId,
      customer: session.user.id,
      status: 'completed'
    }).populate('products.product')

    if (!order) {
      return NextResponse.json(
        { error: 'Order not found or access denied' },
        { status: 404 }
      )
    }

    // Find the specific product in the order
    const orderProduct = order.products.find(
      p => p.product._id.toString() === tokenData.productId
    )

    if (!orderProduct) {
      return NextResponse.json(
        { error: 'Product not found in order' },
        { status: 404 }
      )
    }

    // Check download limits (max 3 downloads)
    if (orderProduct.downloadCount >= 3) {
      return NextResponse.json(
        { error: 'Download limit exceeded' },
        { status: 429 }
      )
    }

    // Generate presigned URL for S3 download
    const product = orderProduct.product
    const fileKey = product.fileUrl.split('/').pop() // Extract S3 key from URL
    
    const downloadUrl = await generatePresignedDownloadUrl(fileKey!, 300) // 5 minutes

    // Increment download count
    orderProduct.downloadCount += 1
    await order.save()

    // Redirect to the presigned URL
    return NextResponse.redirect(downloadUrl)
  } catch (error) {
    console.error('Error processing download:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}