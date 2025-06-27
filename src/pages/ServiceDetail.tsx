import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Star, 
  Clock, 
  ArrowLeft, 
  Shield, 
  MessageCircle,
  Check,
  Calendar,
  User,
  Award
} from 'lucide-react';
import toast from 'react-hot-toast';

const ServiceDetail = () => {
  const { id } = useParams();
  const [selectedPackage, setSelectedPackage] = useState('standard');

  // Mock service data - in real app, this would come from API
  const service = {
    id: id || '1',
    name: 'Full Stack Web Development',
    description: 'Complete web application development using modern technologies like React, Node.js, and MongoDB',
    longDescription: `I will create a complete full-stack web application tailored to your specific needs. With over 5 years of experience in web development, I specialize in building scalable, secure, and user-friendly applications.

My development process includes:
- Initial consultation and requirement analysis
- UI/UX design and wireframing
- Frontend development with React/Next.js
- Backend API development with Node.js
- Database design and implementation
- Testing and quality assurance
- Deployment and maintenance support

I work closely with clients throughout the development process, providing regular updates and incorporating feedback to ensure the final product exceeds expectations.`,
    image: 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'development',
    rating: 4.9,
    reviews: 45,
    completedProjects: 127,
    responseTime: '< 2 hours',
    packages: {
      basic: {
        name: 'Basic',
        price: 1500,
        duration: '2-3 weeks',
        features: [
          'Simple landing page',
          'Responsive design',
          'Contact form',
          'Basic SEO',
          '2 revisions'
        ]
      },
      standard: {
        name: 'Standard',
        price: 2500,
        duration: '4-6 weeks',
        features: [
          'Multi-page website',
          'User authentication',
          'Database integration',
          'Admin panel',
          'Payment integration',
          '5 revisions',
          '30 days support'
        ]
      },
      premium: {
        name: 'Premium',
        price: 4000,
        duration: '8-10 weeks',
        features: [
          'Full-stack application',
          'Advanced features',
          'Third-party integrations',
          'Mobile app (React Native)',
          'Advanced analytics',
          'Unlimited revisions',
          '90 days support',
          'Source code documentation'
        ]
      }
    },
    portfolio: [
      {
        title: 'E-commerce Platform',
        image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=400',
        description: 'Complete online store with payment integration'
      },
      {
        title: 'SaaS Dashboard',
        image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=400',
        description: 'Analytics dashboard for business intelligence'
      },
      {
        title: 'Social Media App',
        image: 'https://images.pexels.com/photos/147413/twitter-facebook-together-exchange-of-information-147413.jpeg?auto=compress&cs=tinysrgb&w=400',
        description: 'Mobile-first social networking platform'
      }
    ],
    skills: ['React', 'Node.js', 'MongoDB', 'TypeScript', 'AWS', 'Docker'],
    faqs: [
      {
        question: 'What technologies do you use?',
        answer: 'I primarily work with React, Node.js, MongoDB, and TypeScript. I also have experience with Next.js, Express.js, PostgreSQL, and various cloud platforms.'
      },
      {
        question: 'Do you provide ongoing support?',
        answer: 'Yes, all packages include post-delivery support. The duration varies by package, ranging from 30 to 90 days of free support.'
      },
      {
        question: 'Can you work with my existing design?',
        answer: 'Absolutely! I can work with your existing designs, Figma files, or create new designs based on your requirements.'
      }
    ]
  };

  const handleBookService = () => {
    toast.success('Booking request sent! I will contact you within 2 hours.');
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
            to="/services"
            className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Services
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Service Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8"
            >
              <div className="flex items-center space-x-2 mb-4">
                <span className="text-sm font-medium text-purple-400 uppercase tracking-wide">
                  {service.category}
                </span>
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-sm text-gray-300">{service.rating}</span>
                  <span className="text-sm text-gray-500">({service.reviews} reviews)</span>
                </div>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                {service.name}
              </h1>

              <p className="text-gray-400 text-lg mb-6">
                {service.description}
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{service.completedProjects}</div>
                  <div className="text-sm text-gray-400">Projects</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{service.rating}★</div>
                  <div className="text-sm text-gray-400">Rating</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">{service.responseTime}</div>
                  <div className="text-sm text-gray-400">Response</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">100%</div>
                  <div className="text-sm text-gray-400">Success Rate</div>
                </div>
              </div>
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8"
            >
              <h2 className="text-2xl font-bold text-white mb-4">About This Service</h2>
              <div className="text-gray-300 leading-relaxed whitespace-pre-line">
                {service.longDescription}
              </div>
            </motion.div>

            {/* Portfolio */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8"
            >
              <h2 className="text-2xl font-bold text-white mb-6">Portfolio</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {service.portfolio.map((item, index) => (
                  <div key={index} className="group">
                    <div className="aspect-video rounded-lg overflow-hidden mb-3">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <h3 className="text-white font-semibold mb-1">{item.title}</h3>
                    <p className="text-gray-400 text-sm">{item.description}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Skills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8"
            >
              <h2 className="text-2xl font-bold text-white mb-6">Skills & Technologies</h2>
              <div className="flex flex-wrap gap-3">
                {service.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border border-purple-500/30 text-purple-300 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* FAQs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8"
            >
              <h2 className="text-2xl font-bold text-white mb-6">Frequently Asked Questions</h2>
              <div className="space-y-4">
                {service.faqs.map((faq, index) => (
                  <div key={index} className="border-b border-gray-700 pb-4 last:border-b-0">
                    <h3 className="text-white font-semibold mb-2">{faq.question}</h3>
                    <p className="text-gray-400">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="sticky top-24 space-y-6"
            >
              {/* Package Selection */}
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">Choose Package</h3>
                
                <div className="space-y-3 mb-6">
                  {Object.entries(service.packages).map(([key, pkg]) => (
                    <button
                      key={key}
                      onClick={() => setSelectedPackage(key)}
                      className={`w-full text-left p-4 rounded-lg border transition-colors ${
                        selectedPackage === key
                          ? 'border-purple-500 bg-purple-500/10'
                          : 'border-gray-600 hover:border-gray-500'
                      }`}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold text-white">{pkg.name}</span>
                        <span className="text-xl font-bold text-purple-400">${pkg.price}</span>
                      </div>
                      <div className="flex items-center text-gray-400 text-sm">
                        <Clock className="h-4 w-4 mr-1" />
                        {pkg.duration}
                      </div>
                    </button>
                  ))}
                </div>

                {/* Selected Package Features */}
                <div className="mb-6">
                  <h4 className="text-white font-semibold mb-3">What's Included:</h4>
                  <div className="space-y-2">
                    {service.packages[selectedPackage as keyof typeof service.packages].features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Check className="h-4 w-4 text-green-400" />
                        <span className="text-gray-300 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleBookService}
                  className="w-full px-6 py-3 bg-gradient-to-r from-purple-500 to-cyan-500 text-white rounded-lg hover:from-purple-600 hover:to-cyan-600 transition-all font-medium"
                >
                  Book Service (${service.packages[selectedPackage as keyof typeof service.packages].price})
                </button>

                <div className="mt-4 flex items-center justify-center space-x-2 text-green-400">
                  <Shield className="h-4 w-4" />
                  <span className="text-sm">Secure escrow payment</span>
                </div>
              </div>

              {/* Contact */}
              <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">Contact Me</h3>
                <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-600 text-white rounded-lg hover:border-purple-500 hover:bg-purple-500/10 transition-all">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Send Message
                </button>
                <div className="mt-4 text-center text-sm text-gray-400">
                  Average response time: {service.responseTime}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;