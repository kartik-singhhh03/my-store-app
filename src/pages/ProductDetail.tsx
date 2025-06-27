import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Star, 
  Download, 
  ShoppingCart, 
  ArrowLeft, 
  Shield, 
  Clock,
  Users,
  Check
} from 'lucide-react';
import { useStore } from '../store/useStore';
import toast from 'react-hot-toast';

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useStore();

  // Mock product data - in real app, this would come from API
  const product = {
    id: id || '1',
    name: 'React E-commerce Template',
    description: 'Complete e-commerce solution built with React, TypeScript, and Tailwind CSS. This premium template includes everything you need to launch your online store quickly and efficiently.',
    longDescription: `This comprehensive React e-commerce template is designed for developers who want to create professional online stores without starting from scratch. Built with modern technologies and best practices, it provides a solid foundation for any e-commerce project.

The template includes a fully responsive design that works perfectly on desktop, tablet, and mobile devices. Every component is carefully crafted with attention to detail and user experience in mind.`,
    price: 49.99,
    originalPrice: 79.99,
    image: 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'templates',
    rating: 4.8,
    reviews: 124,
    downloadUrl: '/downloads/react-ecommerce.zip',
    features: [
      'Fully responsive design',
      'TypeScript support',
      'Tailwind CSS styling',
      'Shopping cart functionality',
      'User authentication',
      'Payment integration ready',
      'Admin dashboard',
      'SEO optimized',
      'Dark/Light theme',
      'Mobile-first approach'
    ],
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'React Router', 'Zustand'],
    fileSize: '15.2 MB',
    lastUpdated: '2024-01-15',
    downloads: 1247
  };

  const [selectedImage, setSelectedImage] = React.useState(0);

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      type: 'product',
      name: product.name,
      price: product.price,
      image: product.image
    });
    toast.success('Added to cart!');
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <Link
            to="/products"
            className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Products
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <div className="aspect-video rounded-2xl overflow-hidden bg-gray-800">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex space-x-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === index ? 'border-purple-500' : 'border-gray-700'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-sm font-medium text-purple-400 uppercase tracking-wide">
                  {product.category}
                </span>
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-sm text-gray-300">{product.rating}</span>
                  <span className="text-sm text-gray-500">({product.reviews} reviews)</span>
                </div>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                {product.name}
              </h1>
              
              <p className="text-gray-400 text-lg leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Pricing */}
            <div className="flex items-center space-x-4">
              <div className="text-3xl font-bold text-white">
                ${product.price}
              </div>
              {product.originalPrice && (
                <div className="text-xl text-gray-500 line-through">
                  ${product.originalPrice}
                </div>
              )}
              <div className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-medium">
                Save ${(product.originalPrice! - product.price).toFixed(2)}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 py-4 border-y border-gray-700">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{product.downloads}</div>
                <div className="text-sm text-gray-400">Downloads</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{product.fileSize}</div>
                <div className="text-sm text-gray-400">File Size</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">4.8★</div>
                <div className="text-sm text-gray-400">Rating</div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center px-6 py-3 bg-gradient-to-r from-purple-500 to-cyan-500 text-white rounded-lg hover:from-purple-600 hover:to-cyan-600 transition-all font-medium"
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                Add to Cart
              </button>
              <button className="px-6 py-3 border border-gray-600 text-white rounded-lg hover:border-purple-500 hover:bg-purple-500/10 transition-all">
                Preview Demo
              </button>
            </div>

            {/* Security Badge */}
            <div className="flex items-center space-x-2 text-green-400">
              <Shield className="h-5 w-5" />
              <span className="text-sm">Secure download with lifetime access</span>
            </div>
          </motion.div>
        </div>

        {/* Product Details Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-16"
        >
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Features */}
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">What's Included</h3>
                <div className="space-y-3">
                  {product.features.map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <Check className="h-5 w-5 text-green-400" />
                      <span className="text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Stack */}
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {product.techStack.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Last Updated</span>
                    <span className="text-white">{product.lastUpdated}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">File Size</span>
                    <span className="text-white">{product.fileSize}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Downloads</span>
                    <span className="text-white">{product.downloads.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Long Description */}
            <div className="mt-8 pt-8 border-t border-gray-700">
              <h3 className="text-2xl font-bold text-white mb-4">Description</h3>
              <div className="text-gray-300 leading-relaxed whitespace-pre-line">
                {product.longDescription}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductDetail;