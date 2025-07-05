'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { motion } from 'framer-motion'
import { CreditCard, Lock, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from '@/hooks/use-toast'
import { formatPrice } from '@/lib/utils'
import Link from 'next/link'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

interface Order {
  _id: string
  orderNumber: string
  products: Array<{
    product: {
      title: string
      coverImage: string
    }
    price: number
  }>
  totalAmount: number
  status: string
}

function CheckoutForm({ order, clientSecret }: { order: Order; clientSecret: string }) {
  const stripe = useStripe()
  const elements = useElements()
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (!stripe || !elements) {
      return
    }

    setLoading(true)

    const { error } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement)!,
      }
    })

    if (error) {
      toast({
        title: 'Payment failed',
        description: error.message,
        variant: 'destructive',
      })
    } else {
      toast({
        title: 'Payment successful!',
        description: 'Your order has been processed.',
      })
      router.push('/dashboard')
    }

    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="p-4 border border-border rounded-lg">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: '16px',
                color: '#ffffff',
                '::placeholder': {
                  color: '#aab7c4',
                },
              },
            },
          }}
        />
      </div>
      
      <Button 
        type="submit" 
        disabled={!stripe || loading} 
        className="w-full" 
        size="lg"
      >
        <Lock className="h-4 w-4 mr-2" />
        {loading ? 'Processing...' : `Pay ${formatPrice(order.totalAmount)}`}
      </Button>
    </form>
  )
}

export default function CheckoutPage() {
  const params = useParams()
  const [order, setOrder] = useState<Order | null>(null)
  const [clientSecret, setClientSecret] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (params.orderId) {
      fetchOrder(params.orderId as string)
    }
  }, [params.orderId])

  const fetchOrder = async (orderId: string) => {
    try {
      const response = await fetch(`/api/orders/${orderId}`)
      if (response.ok) {
        const data = await response.json()
        setOrder(data.order)
        setClientSecret(data.clientSecret)
      }
    } catch (error) {
      console.error('Error fetching order:', error)
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

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Order Not Found</h1>
          <p className="text-muted-foreground">The order you're looking for doesn't exist.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Button variant="ghost" asChild>
            <Link href="/cart">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Cart
            </Link>
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
                <CardDescription>Order #{order.orderNumber}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {order.products.map((item, index) => (
                  <div key={index} className="flex justify-between">
                    <span>{item.product.title}</span>
                    <span>{formatPrice(item.price)}</span>
                  </div>
                ))}
                <div className="border-t pt-4">
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>{formatPrice(order.totalAmount)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Payment Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="h-5 w-5 mr-2" />
                  Payment Details
                </CardTitle>
                <CardDescription>
                  Your payment information is secure and encrypted
                </CardDescription>
              </CardHeader>
              <CardContent>
                {clientSecret && (
                  <Elements stripe={stripePromise}>
                    <CheckoutForm order={order} clientSecret={clientSecret} />
                  </Elements>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}