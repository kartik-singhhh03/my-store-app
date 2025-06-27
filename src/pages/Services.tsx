import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Star, 
  Clock, 
  Search, 
  Filter,
  Code,
  Palette,
  Smartphone,
  Globe,
  Database,
  Zap
} from 'lucide-react';

const Services = () => {
  const [filterCategory, setFilterCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data - in real app, this would come from API
  const services = [
    {
      id: '1',
      name: 'Full Stack Web Development',
      description: 'Complete web application development using modern technologies like React, Node.js, and MongoDB',
      price: 2500,
      image: 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=500',
      category: 'development',
      duration: '4-6 weeks',
      rating: 4.9,
      reviews: 45,
      icon: <Code className="h-6 w-6" />
    },
    {
      id: '2',
      name: 'E-commerce Website',
      description: 'Custom e-commerce platform with payment integration, inventory management, and admin dashboard',
      price: 3500,
      image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=500',
      category: 'ecommerce',
      duration: '6-8 weeks',
      rating: 4.8,
      reviews: 32,
      icon: <Globe className="h-6 w-6" />
    },
    {
      id: '3',
      name: 'Mobile App Development',
      description: 'Cross-platform mobile application using React Native with native performance',
      price: 4000,
      image: 'https://images.pexels.com/photos/147413/twitter-facebook-together-exchange-of-information-147413.jpeg?auto=compress&cs=tinysrgb&w=500',
      category: 'mobile',
      duration: '8-10 weeks',
      rating: 4.7,
      reviews: 28,
      icon: <Smartphone className="h-6 w-6" />
    },
    {
      id: '4',
      name: 'UI/UX Design',
      description: 'Complete design system, wireframes, and high-fidelity mockups for web and mobile',
      price: 1500,
      image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=500',
      category: 'design',
      duration: '2-3 weeks',
      rating: 4.9,
      reviews: 67,
      icon: <Palette className="h-6 w-6" />
    },
    {
      id: '5',
      name: 'API Development',
      description: 'RESTful API development with authentication, documentation, and testing',
      price: 1800,
      image: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=500',
      category: 'backend',
      duration: '3-4 weeks',
      rating: 4.8,
      reviews: 39,
      icon: <Database className="h-6 w-6" />
    },
    {
      id: '6',
      name: 'Performance Optimization',
      description: 'Website speed optimization, SEO improvements, and technical audit',
      price: 800,
      image: 'https://images.pexels.com/photos/270360/pexels-photo-270360.jpeg?auto=compress&cs=tinysrgb&w=500',
      category: 'optimization',
      duration: '1-2 weeks',
      rating: 4.6,
      reviews: 23,
      icon: <Zap className="h-6 w-6" />
    }
  ];

  const categories = [
    { value: 'all', label: 'All Services' },
    { value: 'development', label: 'Web Development' },
    { value: 'mobile', label: 'Mobile Apps' },
    { value: 'design', label: 'UI/UX Design' },
    { value: 'ecommerce', label: 'E-commerce' },
    { value: 'backend', label: 'Backend' },
    { value: 'optimization', label: 'Optimization' }
  ];

  const filteredServices = services.filter(service => {
    const matchesCategory = filterCategory === 'all' || service.category === filterCategory;
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         service.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
            Freelance Services
          </h1>
          <p className="text-gray-400 text-lg">
            Professional development and design services with secure escrow payments
          </p>
        </motion.div>

        {/* Filters and Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 flex flex-col lg:flex-row gap-4 items-center justify-between"
        >
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              {categories.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl overflow-hidden hover:border-purple-500/50 transition-all duration-300"
            >
              <div className="relative">
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent" />
                <div className="absolute top-4 left-4 p-2 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg">
                  <div className="text-white">{service.icon}</div>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-purple-400 uppercase tracking-wide">
                    {service.category}
                  </span>
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-300">{service.rating}</span>
                    <span className="text-sm text-gray-500">({service.reviews})</span>
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-purple-400 transition-colors">
                  {service.name}
                </h3>

                <p className="text-gray-400 mb-4 line-clamp-3">{service.description}</p>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2 text-gray-400">
                    <Clock className="h-4 w-4" />
                    <span className="text-sm">{service.duration}</span>
                  </div>
                  <div className="text-2xl font-bold text-white">
                    ${service.price}
                  </div>
                </div>

                <Link
                  to={`/services/${service.id}`}
                  className="block w-full text-center px-4 py-2 bg-gradient-to-r from-purple-500 to-cyan-500 text-white rounded-lg hover:from-purple-600 hover:to-cyan-600 transition-all font-medium"
                >
                  Book Service
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Service Process */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mt-20 bg-gray-800/30 rounded-3xl p-8 md:p-12"
        >
          <h2 className="text-3xl font-bold text-center mb-12 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            How It Works
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Choose Service</h3>
              <p className="text-gray-400">Browse and select the service that fits your needs</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Secure Payment</h3>
              <p className="text-gray-400">Pay securely with our escrow system</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Work Begins</h3>
              <p className="text-gray-400">Collaborate throughout the development process</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-white">4</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Delivery</h3>
              <p className="text-gray-400">Receive your completed project and release funds</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Services;