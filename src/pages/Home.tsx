import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Zap, 
  ShoppingBag, 
  Briefcase, 
  Shield, 
  Star, 
  ArrowRight,
  Download,
  Users,
  Trophy,
  Sparkles
} from 'lucide-react';

const Home = () => {
  const features = [
    {
      icon: <ShoppingBag className="h-8 w-8" />,
      title: 'Digital Products',
      description: 'Premium templates, software, and digital assets for developers and designers'
    },
    {
      icon: <Briefcase className="h-8 w-8" />,
      title: 'Freelance Services',
      description: 'Professional web development, design, and consulting services'
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: 'Secure Escrow',
      description: 'Safe payments with milestone-based release system'
    },
    {
      icon: <Download className="h-8 w-8" />,
      title: 'Instant Downloads',
      description: 'Get your digital products immediately after purchase'
    }
  ];

  const stats = [
    { icon: <Users className="h-6 w-6" />, value: '10,000+', label: 'Happy Customers' },
    { icon: <Download className="h-6 w-6" />, value: '50,000+', label: 'Downloads' },
    { icon: <Trophy className="h-6 w-6" />, value: '500+', label: 'Projects Completed' },
    { icon: <Star className="h-6 w-6" />, value: '4.9/5', label: 'Average Rating' }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Startup Founder',
      content: 'Kartik delivered an amazing website that exceeded all expectations. The escrow system made the entire process secure and transparent.',
      rating: 5
    },
    {
      name: 'Mike Chen',
      role: 'Developer',
      content: 'The React templates are incredibly well-coded and saved me weeks of development time. Worth every penny!',
      rating: 5
    },
    {
      name: 'Emma Davis',
      role: 'Designer',
      content: 'Professional service, great communication, and delivered exactly what I needed for my project.',
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/30 via-blue-900/30 to-teal-900/30" />
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border border-purple-500/30 rounded-full px-6 py-3 mb-8"
            >
              <Sparkles className="h-5 w-5 text-purple-400" />
              <span className="text-purple-300 font-medium">Welcome to the Future of Digital Commerce</span>
            </motion.div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                Kartik Digital Store
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Premium digital products and professional freelance services with secure escrow payments. 
              Build, buy, and grow with confidence.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/products"
                className="group px-8 py-4 bg-gradient-to-r from-purple-500 to-cyan-500 text-white rounded-full font-semibold text-lg hover:from-purple-600 hover:to-cyan-600 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/25"
              >
                Browse Products
                <ArrowRight className="inline-block ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/services"
                className="px-8 py-4 border-2 border-gray-600 text-white rounded-full font-semibold text-lg hover:border-purple-500 hover:bg-purple-500/10 transition-all duration-300"
              >
                View Services
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full">
                    <div className="text-white">{stat.icon}</div>
                  </div>
                </div>
                <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Why Choose Us?
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              We provide everything you need to succeed in the digital world
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group p-6 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl hover:border-purple-500/50 transition-all duration-300"
              >
                <div className="p-3 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-xl w-fit mb-4 group-hover:scale-110 transition-transform">
                  <div className="text-white">{feature.icon}</div>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              What Our Clients Say
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-6 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl"
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-300 mb-6">"{testimonial.content}"</p>
                <div>
                  <div className="font-semibold text-white">{testimonial.name}</div>
                  <div className="text-gray-400 text-sm">{testimonial.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="p-8 bg-gradient-to-r from-purple-900/50 to-cyan-900/50 border border-purple-500/30 rounded-3xl"
          >
            <Zap className="h-16 w-16 text-purple-400 mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of satisfied customers and start your digital journey today
            </p>
            <Link
              to="/register"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-500 to-cyan-500 text-white rounded-full font-semibold text-lg hover:from-purple-600 hover:to-cyan-600 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/25"
            >
              Get Started Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;