'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Package, Calendar, User, DollarSign, Filter } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { formatPrice, formatDate } from '@/lib/utils'

interface Order {
  _id: string
  orderNumber: string
  customer: {
    name: string
    email: string
  }
  products: Array<{
    product: {
      title: string
    }
    price: number
  }>
  totalAmount: number
  status: string
  createdAt: string
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState('all')

  useEffect(() => {
    fetchOrders()
  }, [statusFilter])

  const fetchOrders = async () => {
    try {
      const params = new URLSearchParams()
      if (statusFilter !== 'all') {
        params.append('status', statusFilter)
      }
      
      const response = await fetch(`/api/admin/orders?${params}`)
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
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Orders</h1>
            <p className="text-muted-foreground">Manage customer orders</p>
          </div>
          
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 bg-background border border-border rounded-lg text-foreground"
            >
              <option value="all">All Orders</option>
              <option value="pending">Pending</option>
              <option value="completed">Completed</option>
              <option value="failed">Failed</option>
              <option value="refunded">Refunded</option>
            </select>
          </div>
        </div>

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
                          <User className="h-4 w-4" />
                          <span>{order.customer.name}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-4 w-4" />
                          <span>{formatDate(order.createdAt)}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Package className="h-4 w-4" />
                          <span>{order.products.length} item(s)</span>
                        </div>
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold flex items-center">
                        <DollarSign className="h-5 w-5 mr-1" />
                        {formatPrice(order.totalAmount)}
                      </div>
                      <span className={`px-3 py-1 text-sm rounded-full ${
                        order.status === 'completed' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : order.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                          : order.status === 'failed'
                          ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                          : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="text-sm text-muted-foreground">
                      <strong>Customer:</strong> {order.customer.email}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <strong>Products:</strong>
                    </div>
                    <ul className="list-disc list-inside space-y-1 ml-4">
                      {order.products.map((item, productIndex) => (
                        <li key={productIndex} className="text-sm text-muted-foreground">
                          {item.product.title} - {formatPrice(item.price)}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {orders.length === 0 && (
          <div className="text-center py-12">
            <Package className="h-16 w-16 mx-auto text-muted-foreground mb-6" />
            <h2 className="text-2xl font-bold text-foreground mb-4">No orders found</h2>
            <p className="text-muted-foreground">
              {statusFilter === 'all' 
                ? 'No orders have been placed yet'
                : `No ${statusFilter} orders found`
              }
            </p>
          </div>
        )}
      </div>
    </div>
  )
}