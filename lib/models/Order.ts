import mongoose, { Document, Schema } from 'mongoose'

export interface IOrder extends Document {
  _id: string
  orderNumber: string
  customer: mongoose.Types.ObjectId
  products: {
    product: mongoose.Types.ObjectId
    price: number
    downloadUrl?: string
    downloadExpiry?: Date
    downloadCount: number
  }[]
  totalAmount: number
  status: 'pending' | 'completed' | 'failed' | 'refunded'
  paymentIntentId: string
  paymentStatus: 'pending' | 'succeeded' | 'failed'
  createdAt: Date
  updatedAt: Date
}

const OrderSchema = new Schema<IOrder>({
  orderNumber: {
    type: String,
    required: true,
    unique: true
  },
  customer: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  products: [{
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    downloadUrl: {
      type: String
    },
    downloadExpiry: {
      type: Date
    },
    downloadCount: {
      type: Number,
      default: 0
    }
  }],
  totalAmount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'refunded'],
    default: 'pending'
  },
  paymentIntentId: {
    type: String,
    required: true
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'succeeded', 'failed'],
    default: 'pending'
  }
}, {
  timestamps: true
})

OrderSchema.index({ customer: 1 })
OrderSchema.index({ orderNumber: 1 })
OrderSchema.index({ status: 1 })
OrderSchema.index({ createdAt: -1 })

export default mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema)