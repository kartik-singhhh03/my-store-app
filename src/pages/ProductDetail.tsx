import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Star, Download, ShoppingCart, Tag, User, Calendar, FileText } from 'lucide-react'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { useStore } from '../store/useStore'
import { formatPrice, formatDate, formatFileSize } from '../lib/utils'
import { api } from '../lib/api'

interface Product {
  _id: string
  title: string
  description: string
  price: number
  category: string
  coverImage: string
  fileName: string
  fileSize: number
  tags: string[]
  rating: number
  reviews: number
  downloadCount: number
  createdBy: {
    name: string
  }
  createdAt: string
}

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const { addToCart } = useStore()

  useEffect(() => {
    if (id) {
      fetchProduct(id)
    }
  }, [id])

  const fetchProduct = async (productId: string) => {
    try {
      const response = await api.get(`/products/${productId}`)
      setProduct(response.data)
    } catch (error) {
      console.error('Error fetching product:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddToCart = () => {
    if (product) {
      addToCart({
        id: product._id,
        title: product.title,
        price: product.price,
        coverImage: product.coverImage
      })
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Product Not Found</h1>
          <p className="text-muted-foreground">The product you're looking for doesn't exist.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div className="relative aspect-video rounded-2xl overflow-hidden">
              <img
                src={product.coverImage}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Product Stats */}
            <div className="grid grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <Star className="h-6 w-6 mx-auto mb-2 text-yellow-400" />
                  <div className="text-2xl font-bold">{product.rating}</div>
                  <div className="text-sm text-muted-foreground">{product.reviews} reviews</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <Download className="h-6 w-6 mx-auto mb-2 text-green-400" />
                  <div className="text-2xl font-bold">{product.downloadCount}</div>
                  <div className="text-sm text-muted-foreground">downloads</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <FileText className="h-6 w-6 mx-auto mb-2 text-blue-400" />
                  <div className="text-lg font-bold">{formatFileSize(product.fileSize)}</div>
                  <div className="text-sm text-muted-foreground">file size</div>
                </CardContent>
              </Card>
            </div>
          </motion.div>

          {/* Product Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div>
              <h1 className="text-4xl font-bold text-foreground mb-4">{product.title}</h1>
              <div className="text-3xl font-bold text-primary mb-6">{formatPrice(product.price)}</div>
            </div>

            <div className="prose prose-invert max-w-none">
              <p className="text-muted-foreground text-lg leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-3 py-1 bg-muted text-muted-foreground text-sm rounded-full"
                >
                  <Tag className="h-3 w-3 mr-1" />
                  {tag}
                </span>
              ))}
            </div>

            {/* Product Info */}
            <Card>
              <CardHeader>
                <CardTitle>Product Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Category</span>
                  <span className="font-medium capitalize">{product.category}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">File Name</span>
                  <span className="font-medium">{product.fileName}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Created By</span>
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span className="font-medium">{product.createdBy.name}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Created</span>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4" />
                    <span className="font-medium">{formatDate(product.createdAt)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Purchase Actions */}
            <div className="space-y-4">
              <Button
                size="lg"
                className="w-full"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Add to Cart
              </Button>
              <p className="text-sm text-muted-foreground text-center">
                Instant download after purchase • 30-day money-back guarantee
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}