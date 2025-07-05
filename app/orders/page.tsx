'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { motion } from 'framer-motion'
import { Package, Download, Calendar, FileText, Eye } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { formatPrice, formatDate } from '@/lib/utils'
import Link from 'next/link'
import Image from 'next/image'

interface Order {
  _id: string
  orderNumber: string
  products: Array<{
    product: {
      _id: string
      title: string
      coverImage: string
    }
    price: number
    downloadUrl?: string
  }>
  totalAmount: number
  status: string
  createdAt: string
}

export default function OrdersPage() {
  const { data: session } = useSession()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (session) {
      fetchOrders()
    }
  }, [session])

  const fetchOrders = async () => {
    try {
      const response = await fetch('/api/orders')
      if (response.ok) {
        const data = await response.json()
        setOrders(data.orders || [])
      }
    } catch (error) {
      console.error('Error fetching orders:', error)
    } finally {
      setLoading(false)
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
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">My Orders</h1>
          <p className="text-muted-foreground">
            View and download your purchased products
          </p>
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-16">
            <Package className="h-16 w-16 mx-auto text-muted-foreground mb-6" />
            <h2 className="text-2xl font-bold text-foreground mb-4">No orders yet</h2>
            <p className="text-muted-foreground mb-8">
              Start shopping to see your orders here
            </p>
            <Button asChild size="lg">
              <Link href="/products">Browse Products</Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order, index) => (
              <motion.div
                key={order._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Order #{order.orderNumber}</CardTitle>
                        <CardDescription className="flex items-center space-x-4 mt-2">
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4" />
                            <span>{formatDate(order.createdAt)}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <FileText className="h-4 w-4" />
                            <span>{order.products.length} item(s)</span>
                          </div>
                        </CardDescription>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold">{formatPrice(order.totalAmount)}</div>
                        <span className={`px-3 py-1 text-sm rounded-full ${
                          order.status === 'completed' 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                            : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {order.products.map((item, productIndex) => (
                        <div
                          key={productIndex}
                          className="flex items-center space-x-4 p-4 border border-border rounded-lg"
                        >
                          <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                            <Image
                              src={item.product.coverImage}
                              alt={item.product.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-foreground line-clamp-2">
                              {item.product.title}
                            </h4>
                            <p className="text-sm text-muted-foreground">
                              {formatPrice(item.price)}
                            </p>
                            {order.status === 'completed' && (
                              <div className="flex space-x-2 mt-2">
                                <Button size="sm" asChild>
                                  <Link href={`/products/${item.product._id}`}>
                                    <Eye className="h-3 w-3 mr-1" />
                                    View
                                  </Link>
                                </Button>
                                {item.downloadUrl && (
                                  <Button size="sm" variant="outline" asChild>
                                    <a href={item.downloadUrl} target="_blank" rel="noopener noreferrer">
                                      <Download className="h-3 w-3 mr-1" />
                                      Download
                                    </a>
                                  </Button>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}