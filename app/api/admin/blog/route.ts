import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import connectDB from '@/lib/mongodb'
import BlogPost from '@/lib/models/BlogPost'
import { createSlug } from '@/lib/utils'
import { uploadFile } from '@/lib/s3'

export async function POST(request: NextRequest) {
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
    const content = formData.get('content') as string
    const excerpt = formData.get('excerpt') as string
    const tags = JSON.parse(formData.get('tags') as string || '[]')
    const isPublished = formData.get('isPublished') === 'true'
    const metaTitle = formData.get('metaTitle') as string
    const metaDescription = formData.get('metaDescription') as string
    const coverImageFile = formData.get('coverImage') as File | null

    // Validation
    if (!title || !content || !excerpt) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    await connectDB()

    // Generate slug
    const slug = createSlug(title)
    
    // Check if slug already exists
    const existingPost = await BlogPost.findOne({ slug })
    if (existingPost) {
      return NextResponse.json(
        { error: 'A post with this title already exists' },
        { status: 400 }
      )
    }

    let coverImageUrl = ''
    
    // Upload cover image if provided
    if (coverImageFile) {
      const coverImageBuffer = Buffer.from(await coverImageFile.arrayBuffer())
      const coverImageKey = `blog/${Date.now()}-${coverImageFile.name}`
      coverImageUrl = await uploadFile(
        coverImageBuffer,
        coverImageKey,
        coverImageFile.type
      )
    }

    // Create blog post
    const post = await BlogPost.create({
      title,
      slug,
      content,
      excerpt,
      tags,
      isPublished,
      author: session.user.id,
      coverImage: coverImageUrl || undefined,
      metaTitle: metaTitle || title,
      metaDescription: metaDescription || excerpt
    })

    return NextResponse.json(post)
  } catch (error) {
    console.error('Error creating blog post:', error)
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

    const [posts, total] = await Promise.all([
      BlogPost.find()
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate('author', 'name')
        .select('-content') // Exclude content for list view
        .lean(),
      BlogPost.countDocuments()
    ])

    return NextResponse.json({
      posts,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching admin blog posts:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}