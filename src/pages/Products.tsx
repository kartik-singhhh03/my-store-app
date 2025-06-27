import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Star, Filter, Grid, List, Search, ShoppingCart } from 'lucide-react';
import { useStore } from '../store/useStore';

const Products = () => {
  const { addToCart } = useStore();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filterCategory, setFilterCategory] = useState('all');
  const [sortBy, setSortBy] = useState('popular');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data - in real app, this would come from API
  const products = [
    {
      id: '1',
      name: 'React E-commerce Template',
      description: 'Complete e-commerce solution built with React, TypeScript, and Tailwind CSS',
      price: 49.99,
      image: 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=500',
      category: 'templates',
      rating: 4.8,
      reviews: 124,
      downloadUrl: '/downloads/react-ecommerce.zip'
    },
    {
      id: '2',
      name: 'Full Stack MERN Boilerplate',
      description: 'Production-ready MERN stack application with authentication and deployment configs',
      price: 79.99,
      image: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=500',
      category: 'boilerplates',
      rating: 4.9,
      reviews: 89,
      downloadUrl: '/downloads/mern-boilerplate.zip'
    },
    {
      id: '3',
      name: 'UI Component Library',
      description: '50+ beautiful React components with Storybook documentation',
      price: 29.99,
      image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=500',
      category: 'components',
      rating: 4.7,
      reviews: 203,
      downloadUrl: '/downloads/ui-components.zip'
    },
    {
      id: '4',
      name: 'Next.js SaaS Starter',
      description: 'Complete SaaS application template with Stripe integration and user management',
      price: 99.99,
      image: 'https://images.pexels.com/photos/270360/pexels-photo-270360.jpeg?auto=compress&cs=tinysrgb&w=500',
      category: 'templates',
      rating: 4.9,
      reviews: 156,
      downloadUrl: '/downloads/nextjs-saas.zip'
    },
    {
      id: '5',
      name: 'Design System Tokens',
      description: 'Complete design system with tokens, icons, and style guides',
      price: 39.99,
      image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=500',
      category: 'design',
      rating: 4.6,
      reviews: 78,
      downloadUrl: '/downloads/design-system.zip'
    },
    {
      id: '6',
      name: 'Mobile App Template',
      description: 'React Native app template with navigation and authentication',
      price: 59.99,
      image: 'https://images.pexels.com/photos/147413/twitter-facebook-together-exchange-of-information-147413.jpeg?auto=compress&cs=tinysrgb&w=500',
      category: 'mobile',
      rating: 4.5,
      reviews: 92,
      downloadUrl: '/downloads/mobile-template.zip'
    }
  ];

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'templates', label: 'Templates' },
    { value: 'boilerplates', label: 'Boilerplates' },
    { value: 'components', label: 'Components' },
    { value: 'design', label: 'Design' },
    { value: 'mobile', label: 'Mobile' }
  ];

  const filteredProducts = products.filter(product => {
    const matchesCategory = filterCategory === 'all' || product.category === filterCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddToCart = (product: any) => {
    addToCart({
      id: product.id,
      type: 'product',
      name: product.name,
      price: product.price,
      image: product.image
    });
  };

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
            Digital Products
          </h1>
          <p className="text-gray-400 text-lg">
            Premium digital assets and templates for developers and designers
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
                placeholder="Search products..."
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

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="popular">Most Popular</option>
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>

          {/* View Mode */}
          <div className="flex items-center space-x-2 bg-gray-800 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded ${viewMode === 'grid' ? 'bg-purple-500 text-white' : 'text-gray-400 hover:text-white'}`}
            >
              <Grid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded ${viewMode === 'list' ? 'bg-purple-500 text-white' : 'text-gray-400 hover:text-white'}`}
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </motion.div>

        {/* Products Grid/List */}
        <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`group bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl overflow-hidden hover:border-purple-500/50 transition-all duration-300 ${
                viewMode === 'list' ? 'flex flex-col md:flex-row' : ''
              }`}
            >
              <div className={`relative ${viewMode === 'list' ? 'md:w-1/3' : ''}`}>
                <img
                  src={product.image}
                  alt={product.name}
                  className={`w-full object-cover group-hover:scale-105 transition-transform duration-300 ${
                    viewMode === 'list' ? 'h-48 md:h-full' : 'h-48'
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent" />
              </div>

              <div className={`p-6 ${viewMode === 'list' ? 'md:w-2/3 flex flex-col justify-between' : ''}`}>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-purple-400 uppercase tracking-wide">
                      {product.category}
                    </span>
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-300">{product.rating}</span>
                      <span className="text-sm text-gray-500">({product.reviews})</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-purple-400 transition-colors">
                    {product.name}
                  </h3>

                  <p className="text-gray-400 mb-4 line-clamp-2">{product.description}</p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-white">
                    ${product.price}
                  </div>

                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="p-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors"
                      title="Add to Cart"
                    >
                      <ShoppingCart className="h-5 w-5" />
                    </button>
                    <Link
                      to={`/products/${product.id}`}
                      className="px-4 py-2 bg-gradient-to-r from-purple-500 to-cyan-500 text-white rounded-lg hover:from-purple-600 hover:to-cyan-600 transition-all font-medium"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;