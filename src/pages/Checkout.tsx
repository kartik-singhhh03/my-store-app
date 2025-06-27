import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { 
  CreditCard, 
  Lock, 
  ArrowLeft, 
  Check,
  User,
  Mail,
  MapPin,
  Phone
} from 'lucide-react';
import { useStore } from '../store/useStore';
import toast from 'react-hot-toast';

interface CheckoutForm {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  phone: string;
  paymentMethod: 'stripe' | 'razorpay' | 'paypal';
}

const Checkout = () => {
  const { cart, cartTotal, clearCart, user } = useStore();
  const navigate = useNavigate();
  const [processing, setProcessing] = useState(false);
  const { register, handleSubmit, formState: { errors }, watch } = useForm<CheckoutForm>({
    defaultValues: {
      email: user?.email || '',
      firstName: user?.name?.split(' ')[0] || '',
      lastName: user?.name?.split(' ')[1] || '',
      paymentMethod: 'stripe'
    }
  });

  const paymentMethod = watch('paymentMethod');

  const onSubmit = async (data: CheckoutForm) => {
    setProcessing(true);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Clear cart and redirect
      clearCart();
      toast.success('Payment successful! Check your email for download links.');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Payment failed. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <h2 className="text-3xl font-bold text-white mb-4">Your cart is empty</h2>
          <p className="text-gray-400 mb-8">Add some products to proceed with checkout</p>
          <Link
            to="/products"
            className="px-6 py-3 bg-gradient-to-r from-purple-500 to-cyan-500 text-white rounded-lg hover:from-purple-600 hover:to-cyan-600 transition-all"
          >
            Browse Products
          </Link>
        </motion.div>
      </div>
    );
  }

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
            to="/cart"
            className="inline-flex items-center text-purple-400 hover:text-purple-300 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Cart
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Checkout
          </h1>
          <p className="text-gray-400">Complete your purchase securely</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6"
              >
                <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Contact Information
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      First Name
                    </label>
                    <input
                      {...register('firstName', { required: 'First name is required' })}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="John"
                    />
                    {errors.firstName && (
                      <p className="mt-1 text-sm text-red-400">{errors.firstName.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Last Name
                    </label>
                    <input
                      {...register('lastName', { required: 'Last name is required' })}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Doe"
                    />
                    {errors.lastName && (
                      <p className="mt-1 text-sm text-red-400">{errors.lastName.message}</p>
                    )}
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      {...register('email', {
                        required: 'Email is required',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Invalid email address'
                        }
                      })}
                      type="email"
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="john@example.com"
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
                  )}
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      {...register('phone', { required: 'Phone number is required' })}
                      type="tel"
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg pl-10 pr-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-400">{errors.phone.message}</p>
                  )}
                </div>
              </motion.div>

              {/* Billing Address */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6"
              >
                <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  Billing Address
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Address
                    </label>
                    <input
                      {...register('address', { required: 'Address is required' })}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="123 Main Street"
                    />
                    {errors.address && (
                      <p className="mt-1 text-sm text-red-400">{errors.address.message}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        City
                      </label>
                      <input
                        {...register('city', { required: 'City is required' })}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="New York"
                      />
                      {errors.city && (
                        <p className="mt-1 text-sm text-red-400">{errors.city.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Postal Code
                      </label>
                      <input
                        {...register('postalCode', { required: 'Postal code is required' })}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="10001"
                      />
                      {errors.postalCode && (
                        <p className="mt-1 text-sm text-red-400">{errors.postalCode.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Country
                      </label>
                      <select
                        {...register('country', { required: 'Country is required' })}
                        className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                      >
                        <option value="">Select Country</option>
                        <option value="US">United States</option>
                        <option value="IN">India</option>
                        <option value="CA">Canada</option>
                        <option value="GB">United Kingdom</option>
                        <option value="AU">Australia</option>
                      </select>
                      {errors.country && (
                        <p className="mt-1 text-sm text-red-400">{errors.country.message}</p>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Payment Method */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6"
              >
                <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
                  <CreditCard className="h-5 w-5 mr-2" />
                  Payment Method
                </h2>

                <div className="space-y-3">
                  <label className="flex items-center p-4 border border-gray-600 rounded-lg cursor-pointer hover:border-purple-500 transition-colors">
                    <input
                      {...register('paymentMethod')}
                      type="radio"
                      value="stripe"
                      className="text-purple-500 focus:ring-purple-500"
                    />
                    <div className="ml-3 flex-1">
                      <div className="text-white font-medium">Credit/Debit Card</div>
                      <div className="text-gray-400 text-sm">Visa, Mastercard, American Express</div>
                    </div>
                  </label>

                  <label className="flex items-center p-4 border border-gray-600 rounded-lg cursor-pointer hover:border-purple-500 transition-colors">
                    <input
                      {...register('paymentMethod')}
                      type="radio"
                      value="razorpay"
                      className="text-purple-500 focus:ring-purple-500"
                    />
                    <div className="ml-3 flex-1">
                      <div className="text-white font-medium">Razorpay</div>
                      <div className="text-gray-400 text-sm">UPI, Net Banking, Wallets</div>
                    </div>
                  </label>

                  <label className="flex items-center p-4 border border-gray-600 rounded-lg cursor-pointer hover:border-purple-500 transition-colors">
                    <input
                      {...register('paymentMethod')}
                      type="radio"
                      value="paypal"
                      className="text-purple-500 focus:ring-purple-500"
                    />
                    <div className="ml-3 flex-1">
                      <div className="text-white font-medium">PayPal</div>
                      <div className="text-gray-400 text-sm">Pay with your PayPal account</div>
                    </div>
                  </label>
                </div>
              </motion.div>

              {/* Submit Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <button
                  type="submit"
                  disabled={processing}
                  className="w-full flex items-center justify-center px-6 py-4 bg-gradient-to-r from-purple-500 to-cyan-500 text-white rounded-lg hover:from-purple-600 hover:to-cyan-600 transition-all font-medium text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {processing ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <Lock className="h-5 w-5 mr-2" />
                      Complete Payment (${(cartTotal + 2.99).toFixed(2)})
                    </>
                  )}
                </button>
              </motion.div>
            </form>
          </div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 sticky top-24">
              <h2 className="text-xl font-semibold text-white mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6">
                {cart.map((item) => (
                  <div key={item.id} className="flex items-center space-x-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="text-white font-medium text-sm">{item.name}</h3>
                      <p className="text-gray-400 text-xs">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-white font-semibold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 mb-6 pt-4 border-t border-gray-700">
                <div className="flex justify-between">
                  <span className="text-gray-400">Subtotal</span>
                  <span className="text-white">${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Processing Fee</span>
                  <span className="text-white">$2.99</span>
                </div>
                <div className="flex justify-between text-lg font-semibold pt-3 border-t border-gray-700">
                  <span className="text-white">Total</span>
                  <span className="text-purple-400">${(cartTotal + 2.99).toFixed(2)}</span>
                </div>
              </div>

              <div className="flex items-center space-x-2 text-green-400 text-sm">
                <Check className="h-4 w-4" />
                <span>Secure 256-bit SSL encryption</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;