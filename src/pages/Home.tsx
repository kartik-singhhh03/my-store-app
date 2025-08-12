import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  Zap, 
  ShoppingBag, 
  Shield, 
  Star, 
  ArrowRight,
  Download,
  Users,
  Trophy,
  Sparkles
} from 'lucide-react'
import { Button } from '../components/ui/button'

export default function Home() {
  const features = [
    {
      icon: <ShoppingBag className="h-8 w-8" />,
      title: 'Digital Products',
      description: 'Premium templates, software, and digital assets for developers and designers'
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: 'Secure Payments',
      description: 'Safe transactions with Stripe integration and secure download links'
    },
    {
      icon: <Download className="h-8 w-8" />,
      title: 'Instant Downloads',
      description: 'Get your digital products immediately after purchase'
    },
    {
      icon: <Star className="h-8 w-8" />,
      title: 'Quality Guaranteed',
      description: 'All products are carefully curated and tested for quality'
    }
  ]

  const stats = [
    { icon: <Users className="h-6 w-6" />, value: '10,000+', label: 'Happy Customers' },
    { icon: <Download className="h-6 w-6" />, value: '50,000+', label: 'Downloads' },
    { icon: <Trophy className="h-6 w-6" />, value: '500+', label: 'Products' },
    { icon: <Star className="h-6 w-6" />, value: '4.9/5', label: 'Average Rating' }
  ]

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
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border border-purple-500/30 rounded-full px-6 py-3 mb-8"
            >
              <Sparkles className="h-5 w-5 text-purple-400" />
              <span className="text-purple-300 font-medium">Welcome to the Future of Digital Commerce</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6"
            >
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                Kartik Digital Store
              </span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed"
            >
              Premium digital products and professional services with secure payments. 
              Build, buy, and grow with confidence.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Button size="lg" asChild>
                <Link to="/products" className="group">
                  Browse Products
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/blog">
                  Read Blog
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full">
                    <div className="text-white">{stat.icon}</div>
                  </div>
                </div>
                <div className="text-3xl font-bold text-foreground mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent"
            >
              Why Choose Us?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-muted-foreground max-w-3xl mx-auto"
            >
              We provide everything you need to succeed in the digital world
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group p-6 bg-card/50 backdrop-blur-sm border border-border rounded-2xl hover:border-primary/50 transition-all duration-300"
              >
                <div className="p-3 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-xl w-fit mb-4 group-hover:scale-110 transition-transform">
                  <div className="text-white">{feature.icon}</div>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
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
            animate={{ opacity: 1, y: 0 }}
            className="p-8 bg-gradient-to-r from-purple-900/50 to-cyan-900/50 border border-primary/30 rounded-3xl"
          >
            <Zap className="h-16 w-16 text-primary mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of satisfied customers and start your digital journey today
            </p>
            <Button size="lg" asChild>
              <Link to="/auth/signup">
                Get Started Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}