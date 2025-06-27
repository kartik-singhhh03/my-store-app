import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  Users, 
  Package, 
  DollarSign,
  TrendingUp,
  ShoppingCart,
  MessageSquare,
  Settings,
  Plus,
  Eye,
  Edit,
  Trash2
} from 'lucide-react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data
  const stats = [
    { icon: <DollarSign className="h-6 w-6" />, label: 'Total Revenue', value: '$45,230', change: '+12.5%' },
    { icon: <Users className="h-6 w-6" />, label: 'Total Users', value: '2,847', change: '+8.2%' },
    { icon: <Package className="h-6 w-6" />, label: 'Products Sold', value: '1,234', change: '+15.3%' },
    { icon: <ShoppingCart className="h-6 w-6" />, label: 'Active Orders', value: '89', change: '+5.1%' }
  ];

  const recentOrders = [
    { id: '1', customer: 'John Doe', product: 'React Template', amount: '$49.99', status: 'completed' },
    { id: '2', customer: 'Jane Smith', product: 'Web Development', amount: '$2,500', status: 'in_progress' },
    { id: '3', customer: 'Mike Johnson', product: 'UI Components', amount: '$29.99', status: 'completed' },
    { id: '4', customer: 'Sarah Wilson', product: 'Mobile App', amount: '$4,000', status: 'pending' }
  ];

  const products = [
    { id: '1', name: 'React E-commerce Template', price: '$49.99', sales: 124, status: 'active' },
    { id: '2', name: 'MERN Stack Boilerplate', price: '$79.99', sales: 89, status: 'active' },
    { id: '3', name: 'UI Component Library', price: '$29.99', sales: 203, status: 'active' },
    { id: '4', name: 'Next.js SaaS Starter', price: '$99.99', sales: 156, status: 'draft' }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <BarChart3 className="h-4 w-4" /> },
    { id: 'products', label: 'Products', icon: <Package className="h-4 w-4" /> },
    { id: 'orders', label: 'Orders', icon: <ShoppingCart className="h-4 w-4" /> },
    { id: 'users', label: 'Users', icon: <Users className="h-4 w-4" /> },
    { id: 'messages', label: 'Messages', icon: <MessageSquare className="h-4 w-4" /> },
    { id: 'settings', label: 'Settings', icon: <Settings className="h-4 w-4" /> }
  ];

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Admin Dashboard
          </h1>
          <p className="text-gray-400">Manage your digital store and monitor performance</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6">
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? 'bg-purple-500 text-white'
                        : 'text-gray-400 hover:text-white hover:bg-gray-700'
                    }`}
                  >
                    {tab.icon}
                    <span>{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-4"
          >
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {stats.map((stat, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="p-2 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg">
                          <div className="text-white">{stat.icon}</div>
                        </div>
                        <div className="text-green-400 text-sm font-medium">{stat.change}</div>
                      </div>
                      <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                      <div className="text-gray-400 text-sm">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>

                {/* Recent Orders */}
                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6">
                  <h2 className="text-xl font-semibold text-white mb-6">Recent Orders</h2>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-700">
                          <th className="text-left text-gray-400 font-medium py-3">Customer</th>
                          <th className="text-left text-gray-400 font-medium py-3">Product</th>
                          <th className="text-left text-gray-400 font-medium py-3">Amount</th>
                          <th className="text-left text-gray-400 font-medium py-3">Status</th>
                          <th className="text-left text-gray-400 font-medium py-3">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentOrders.map((order) => (
                          <tr key={order.id} className="border-b border-gray-700/50">
                            <td className="py-4 text-white">{order.customer}</td>
                            <td className="py-4 text-gray-300">{order.product}</td>
                            <td className="py-4 text-white font-semibold">{order.amount}</td>
                            <td className="py-4">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                order.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                                order.status === 'in_progress' ? 'bg-yellow-500/20 text-yellow-400' :
                                'bg-gray-500/20 text-gray-400'
                              }`}>
                                {order.status.replace('_', ' ')}
                              </span>
                            </td>
                            <td className="py-4">
                              <button className="text-purple-400 hover:text-purple-300 mr-2">
                                <Eye className="h-4 w-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'products' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-white">Products</h2>
                  <button className="flex items-center px-4 py-2 bg-gradient-to-r from-purple-500 to-cyan-500 text-white rounded-lg hover:from-purple-600 hover:to-cyan-600 transition-all">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Product
                  </button>
                </div>

                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-700">
                          <th className="text-left text-gray-400 font-medium py-3">Product</th>
                          <th className="text-left text-gray-400 font-medium py-3">Price</th>
                          <th className="text-left text-gray-400 font-medium py-3">Sales</th>
                          <th className="text-left text-gray-400 font-medium py-3">Status</th>
                          <th className="text-left text-gray-400 font-medium py-3">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {products.map((product) => (
                          <tr key={product.id} className="border-b border-gray-700/50">
                            <td className="py-4 text-white">{product.name}</td>
                            <td className="py-4 text-white font-semibold">{product.price}</td>
                            <td className="py-4 text-gray-300">{product.sales}</td>
                            <td className="py-4">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                product.status === 'active' ? 'bg-green-500/20 text-green-400' :
                                'bg-gray-500/20 text-gray-400'
                              }`}>
                                {product.status}
                              </span>
                            </td>
                            <td className="py-4">
                              <div className="flex space-x-2">
                                <button className="text-purple-400 hover:text-purple-300">
                                  <Eye className="h-4 w-4" />
                                </button>
                                <button className="text-blue-400 hover:text-blue-300">
                                  <Edit className="h-4 w-4" />
                                </button>
                                <button className="text-red-400 hover:text-red-300">
                                  <Trash2 className="h-4 w-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {(activeTab === 'orders' || activeTab === 'users' || activeTab === 'messages' || activeTab === 'settings') && (
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-white mb-6">
                  {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
                </h2>
                <div className="text-center py-12">
                  <div className="text-gray-400 mb-4">This section is coming soon!</div>
                  <p className="text-gray-500">We're working on bringing you more admin features.</p>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;