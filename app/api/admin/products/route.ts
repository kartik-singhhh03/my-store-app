import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import connectDB from '@/lib/mongodb'
import Product from '@/lib/models/Product'
import { uploadFile } from '@/lib/s3'
import { rateLimit } from '@/lib/rate-limit'

export async function POST(request: NextRequest) {
  // Rate limiting
  const rateLimitResult = rateLimit(request, 10, 60000) // 10 requests per minute
  if (!rateLimitResult.success) {
    return NextResponse.json(
      { error: 'Too many requests' },
      { status: 429 }
    )
  }

  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id || session.user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const formData = await request.formData()
    
    const title = formData.get('title') as string
    const description = formData.get('description') as string
    const price = parseFloat(formData.get('price') as string)
    const category = formData.get('category') as string
    const tags = JSON.parse(formData.get('tags') as string || '[]')
    const coverImageFile = formData.get('coverImage') as File
    const productFile = formData.get('productFile') as File

    // Validation
    if (!title || !description || !price || !category || !coverImageFile || !productFile) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    await connectDB()

    // Upload cover image
    const coverImageBuffer = Buffer.from(await coverImageFile.arrayBuffer())
    const coverImageKey = `covers/${Date.now()}-${coverImageFile.name}`
    const coverImageUrl = await uploadFile(
      coverImageBuffer,
      coverImageKey,
      coverImageFile.type
    )

    // Upload product file
    const productFileBuffer = Buffer.from(await productFile.arrayBuffer())
    const productFileKey = `products/${Date.now()}-${productFile.name}`
    const productFileUrl = await uploadFile(
      productFileBuffer,
      productFileKey,
      productFile.type
    )

    // Create product
    const product = await Product.create({
      title,
      description,
      price,
      category,
      tags,
      coverImage: coverImageUrl,
      fileUrl: productFileUrl,
      fileName: productFile.name,
      fileSize: productFile.size,
      createdBy: session.user.id
    })

    return NextResponse.json(product)
  } catch (error) {
    console.error('Error creating product:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id || session.user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    await connectDB()

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const skip = (page - 1) * limit

    const [products, total] = await Promise.all([
      Product.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate('createdBy', 'name')
        .lean(),
      Product.countDocuments()
    ])

    return NextResponse.json({
      products,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching admin products:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}