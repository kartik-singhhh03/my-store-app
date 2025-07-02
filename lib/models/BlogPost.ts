import mongoose, { Document, Schema } from 'mongoose'

export interface IBlogPost extends Document {
  _id: string
  title: string
  slug: string
  content: string
  excerpt: string
  coverImage?: string
  tags: string[]
  isPublished: boolean
  author: mongoose.Types.ObjectId
  views: number
  metaTitle?: string
  metaDescription?: string
  createdAt: Date
  updatedAt: Date
}

const BlogPostSchema = new Schema<IBlogPost>({
  title: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  content: {
    type: String,
    required: true
  },
  excerpt: {
    type: String,
    required: true,
    maxlength: 300
  },
  coverImage: {
    type: String
  },
  tags: [{
    type: String,
    trim: true
  }],
  isPublished: {
    type: Boolean,
    default: false
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  views: {
    type: Number,
    default: 0
  },
  metaTitle: {
    type: String
  },
  metaDescription: {
    type: String
  }
}, {
  timestamps: true
})

BlogPostSchema.index({ slug: 1 })
BlogPostSchema.index({ isPublished: 1 })
BlogPostSchema.index({ tags: 1 })
BlogPostSchema.index({ createdAt: -1 })
BlogPostSchema.index({ title: 'text', content: 'text', tags: 'text' })

export default mongoose.models.BlogPost || mongoose.model<IBlogPost>('BlogPost', BlogPostSchema)