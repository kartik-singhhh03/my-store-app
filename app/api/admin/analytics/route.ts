import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import connectDB from '@/lib/mongodb'
import Order from '@/lib/models/Order'
import Product from '@/lib/models/Product'
import User from '@/lib/models/User'

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

    // Get date range (default to last 30 days)
    const { searchParams } = new URL(request.url)
    const days = parseInt(searchParams.get('days') || '30')
    const startDate = new Date()
    startDate.setDate(startDate.getDate() - days)

    // Aggregate analytics data
    const [
      totalRevenue,
      totalOrders,
      totalProducts,
      totalUsers,
      recentOrders,
      topProducts,
      revenueByDay
    ] = await Promise.all([
      // Total revenue
      Order.aggregate([
        { $match: { status: 'completed' } },
        { $group: { _id: null, total: { $sum: '$totalAmount' } } }
      ]),
      
      // Total orders
      Order.countDocuments({ status: 'completed' }),
      
      // Total products
      Product.countDocuments({ isActive: true }),
      
      // Total users
      User.countDocuments(),
      
      // Recent orders
      Order.find({ createdAt: { $gte: startDate } })
        .sort({ createdAt: -1 })
        .limit(10)
        .populate('customer', 'name email')
        .populate('products.product', 'title')
        .lean(),
      
      // Top products by sales
      Order.aggregate([
        { $match: { status: 'completed' } },
        { $unwind: '$products' },
        { $group: {
          _id: '$products.product',
          sales: { $sum: 1 },
          revenue: { $sum: '$products.price' }
        }},
        { $sort: { sales: -1 } },
        { $limit: 5 },
        { $lookup: {
          from: 'products',
          localField: '_id',
          foreignField: '_id',
          as: 'product'
        }},
        { $unwind: '$product' }
      ]),
      
      // Revenue by day
      Order.aggregate([
        { $match: { 
          status: 'completed',
          createdAt: { $gte: startDate }
        }},
        { $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          revenue: { $sum: '$totalAmount' },
          orders: { $sum: 1 }
        }},
        { $sort: { _id: 1 } }
      ])
    ])

    return NextResponse.json({
      overview: {
        totalRevenue: totalRevenue[0]?.total || 0,
        totalOrders,
        totalProducts,
        totalUsers
      },
      recentOrders,
      topProducts,
      revenueByDay
    })
  } catch (error) {
    console.error('Error fetching analytics:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}