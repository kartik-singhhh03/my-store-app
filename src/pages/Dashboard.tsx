import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Download, 
  Calendar, 
  Star, 
  Package, 
  Briefcase, 
  MessageCircle,
  Settings,
  User,
  CreditCard
} from 'lucide-react';
import { useStore } from '../store/useStore';

const Dashboard = () => {
  const { user } = useStore();
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data
  const purchases = [
    {
      id: '1',
      name: 'React E-commerce Template',
      type: 'product',
      price: 49.99,
      date: '2024-01-15',
      status: 'completed',
      downloadUrl: '/downloads/react-ecommerce.zip'
    },
    {
      id: '2',
      name: 'Full Stack Web Development',
      type: 'service',
      price: 2500,
      date: '2024-01-10',
      status: 'in_progress',
      progress: 75
    }
  ];

  const stats = [
    { icon: <Package className="h-6 w-6" />, label: 'Products', value: '12' },
    { icon: <Briefcase className="h-6 w-6" />, label: 'Services', value: '3' },
    { icon: <Download className="h-6 w-6" />, label: 'Downloads', value: '24' },
    { icon: <Star className="h-6 w-6" />, label: 'Reviews', value: '4.8' }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <User className="h-4 w-4" /> },
    { id: 'purchases', label: 'Purchases', icon: <Package className="h-4 w-4" /> },
    { id: 'services', label: 'Services', icon: <Briefcase className="h-4 w-4" /> },
    { id: 'messages', label: 'Messages', icon: <MessageCircle className="h-4 w-4" /> },
    { id: 'billing', label: 'Billing', icon: <CreditCard className="h-4 w-4" /> },
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
          <h1 className="text-3xl md:text-4xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-gray-400">Manage your products, services, and account</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="h-12 w-12 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full flex items-center justify-center">
                  <span className="text-lg font-bold text-white">
                    {user?.name?.charAt(0) || 'U'}
                  </span>
                </div>
                <div>
                  <h3 className="text-white font-semibold">{user?.name}</h3>
                  <p className="text-gray-400 text-sm">{user?.email}</p>
                </div>
              </div>

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
            className="lg:col-span-3"
          >
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {stats.map((stat, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 text-center"
                    >
                      <div className="flex justify-center mb-3">
                        <div className="p-3 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full">
                          <div className="text-white">{stat.icon}</div>
                        </div>
                      </div>
                      <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                      <div className="text-gray-400 text-sm">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>

                {/* Recent Activity */}
                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6">
                  <h2 className="text-xl font-semibold text-white mb-6">Recent Activity</h2>
                  <div className="space-y-4">
                    {purchases.map((purchase) => (
                      <div key={purchase.id} className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="p-2 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg">
                            {purchase.type === 'product' ? 
                              <Package className="h-5 w-5 text-white" /> :
                              <Briefcase className="h-5 w-5 text-white" />
                            }
                          </div>
                          <div>
                            <h3 className="text-white font-medium">{purchase.name}</h3>
                            <p className="text-gray-400 text-sm">{purchase.date}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-white font-semibold">${purchase.price}</div>
                          <div className={`text-sm ${
                            purchase.status === 'completed' ? 'text-green-400' :
                            purchase.status === 'in_progress' ? 'text-yellow-400' :
                            'text-gray-400'
                          }`}>
                            {purchase.status === 'completed' ? 'Completed' :
                             purchase.status === 'in_progress' ? `${purchase.progress}% Complete` :
                             'Pending'}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'purchases' && (
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6">
                <h2 className="text-xl font-semibold text-white mb-6">My Purchases</h2>
                <div className="space-y-4">
                  {purchases.filter(p => p.type === 'product').map((purchase) => (
                    <div key={purchase.id} className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
                      <div>
                        <h3 className="text-white font-medium">{purchase.name}</h3>
                        <p className="text-gray-400 text-sm">{purchase.date}</p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="text-white font-semibold">${purchase.price}</span>
                        {purchase.status === 'completed' && (
                          <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-cyan-500 text-white rounded-lg hover:from-purple-600 hover:to-cyan-600 transition-all">
                            <Download className="h-4 w-4 mr-2 inline" />
                            Download
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'services' && (
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6">
                <h2 className="text-xl font-semibold text-white mb-6">My Services</h2>
                <div className="space-y-4">
                  {purchases.filter(p => p.type === 'service').map((service) => (
                    <div key={service.id} className="p-4 bg-gray-700/50 rounded-lg">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-white font-medium">{service.name}</h3>
                          <p className="text-gray-400 text-sm">{service.date}</p>
                        </div>
                        <span className="text-white font-semibold">${service.price}</span>
                      </div>
                      {service.progress && (
                        <div>
                          <div className="flex justify-between text-sm mb-2">
                            <span className="text-gray-400">Progress</span>
                            <span className="text-white">{service.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-600 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-purple-500 to-cyan-500 h-2 rounded-full"
                              style={{ width: `${service.progress}%` }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {(activeTab === 'messages' || activeTab === 'billing' || activeTab === 'settings') && (
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6">
                <h2 className="text-xl font-semibold text-white mb-6">
                  {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
                </h2>
                <div className="text-center py-12">
                  <div className="text-gray-400 mb-4">This section is coming soon!</div>
                  <p className="text-gray-500">We're working on bringing you more features.</p>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;