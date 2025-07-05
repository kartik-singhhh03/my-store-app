'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Plus, Edit, Trash2, Eye, Upload } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useToast } from '@/hooks/use-toast'
import { formatPrice, formatDate } from '@/lib/utils'
import Image from 'next/image'

interface Product {
  _id: string
  title: string
  description: string
  price: number
  category: string
  coverImage: string
  tags: string[]
  isActive: boolean
  downloadCount: number
  createdAt: string
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: 'templates',
    tags: '',
  })
  const [coverImageFile, setCoverImageFile] = useState<File | null>(null)
  const [productFile, setProductFile] = useState<File | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const { toast } = useToast()

  const categories = [
    { value: 'templates', label: 'Templates' },
    { value: 'components', label: 'Components' },
    { value: 'themes', label: 'Themes' },
    { value: 'plugins', label: 'Plugins' },
    { value: 'courses', label: 'Courses' },
    { value: 'ebooks', label: 'E-books' },
    { value: 'graphics', label: 'Graphics' },
    { value: 'other', label: 'Other' }
  ]

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/admin/products')
      if (response.ok) {
        const data = await response.json()
        setProducts(data.products || [])
      }
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!coverImageFile || !productFile) {
      toast({
        title: 'Error',
        description: 'Please select both cover image and product file',
        variant: 'destructive',
      })
      return
    }

    setSubmitting(true)

    try {
      const formDataToSend = new FormData()
      formDataToSend.append('title', formData.title)
      formDataToSend.append('description', formData.description)
      formDataToSend.append('price', formData.price)
      formDataToSend.append('category', formData.category)
      formDataToSend.append('tags', JSON.stringify(formData.tags.split(',').map(tag => tag.trim())))
      formDataToSend.append('coverImage', coverImageFile)
      formDataToSend.append('productFile', productFile)

      const response = await fetch('/api/admin/products', {
        method: 'POST',
        body: formDataToSend,
      })

      if (response.ok) {
        toast({
          title: 'Success',
          description: 'Product created successfully!',
        })
        setShowForm(false)
        setFormData({
          title: '',
          description: '',
          price: '',
          category: 'templates',
          tags: '',
        })
        setCoverImageFile(null)
        setProductFile(null)
        fetchProducts()
      } else {
        const data = await response.json()
        toast({
          title: 'Error',
          description: data.error || 'Failed to create product',
          variant: 'destructive',
        })
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Products</h1>
            <p className="text-muted-foreground">Manage your digital products</p>
          </div>
          <Button onClick={() => setShowForm(!showForm)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Product
          </Button>
        </div>

        {showForm && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Card>
              <CardHeader>
                <CardTitle>Add New Product</CardTitle>
                <CardDescription>Create a new digital product</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="title">Title</Label>
                      <Input
                        id="title"
                        value={formData.title}
                        onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="price">Price ($)</Label>
                      <Input
                        id="price"
                        type="number"
                        step="0.01"
                        value={formData.price}
                        onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="description">Description</Label>
                    <textarea
                      id="description"
                      className="w-full p-3 border border-border rounded-lg bg-background text-foreground"
                      rows={4}
                      value={formData.description}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="category">Category</Label>
                      <select
                        id="category"
                        className="w-full p-3 border border-border rounded-lg bg-background text-foreground"
                        value={formData.category}
                        onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                      >
                        {categories.map((cat) => (
                          <option key={cat.value} value={cat.value}>
                            {cat.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="tags">Tags (comma separated)</Label>
                      <Input
                        id="tags"
                        value={formData.tags}
                        onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
                        placeholder="react, typescript, template"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="coverImage">Cover Image</Label>
                      <Input
                        id="coverImage"
                        type="file"
                        accept="image/*"
                        onChange={(e) => setCoverImageFile(e.target.files?.[0] || null)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="productFile">Product File</Label>
                      <Input
                        id="productFile"
                        type="file"
                        onChange={(e) => setProductFile(e.target.files?.[0] || null)}
                        required
                      />
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <Button type="submit" disabled={submitting}>
                      {submitting ? 'Creating...' : 'Create Product'}
                    </Button>
                    <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src={product.coverImage}
                    alt={product.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-medium">
                    {formatPrice(product.price)}
                  </div>
                </div>
                
                <CardHeader>
                  <CardTitle className="line-clamp-2">{product.title}</CardTitle>
                  <CardDescription className="line-clamp-3">
                    {product.description}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      product.isActive 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                    }`}>
                      {product.isActive ? 'Active' : 'Inactive'}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {product.downloadCount} downloads
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {product.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="text-sm text-muted-foreground mb-4">
                    Created: {formatDate(product.createdAt)}
                  </div>

                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline">
                      <Eye className="h-3 w-3 mr-1" />
                      View
                    </Button>
                    <Button size="sm" variant="outline">
                      <Edit className="h-3 w-3 mr-1" />
                      Edit
                    </Button>
                    <Button size="sm" variant="outline">
                      <Trash2 className="h-3 w-3 mr-1" />
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {products.length === 0 && (
          <div className="text-center py-12">
            <Upload className="h-16 w-16 mx-auto text-muted-foreground mb-6" />
            <h2 className="text-2xl font-bold text-foreground mb-4">No products yet</h2>
            <p className="text-muted-foreground mb-8">
              Create your first digital product to get started
            </p>
            <Button onClick={() => setShowForm(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Product
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}