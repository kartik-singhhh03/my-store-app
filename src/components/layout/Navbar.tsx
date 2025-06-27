import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ShoppingCart, 
  User, 
  Search, 
  Menu, 
  X, 
  Zap,
  MessageCircle,
  LogOut,
  Settings
} from 'lucide-react';
import { useStore } from '../../store/useStore';

const Navbar = () => {
  const { 
    isAuthenticated, 
    user, 
    cart, 
    logout, 
    sidebarOpen, 
    toggleSidebar 
  } = useStore();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setDropdownOpen(false);
  };

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-50 bg-gray-900/80 backdrop-blur-xl border-b border-gray-800"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="p-2 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Kartik Digital Store
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              to="/products" 
              className="text-gray-300 hover:text-white transition-colors hover:bg-gray-800 px-3 py-2 rounded-lg"
            >
              Products
            </Link>
            <Link 
              to="/services" 
              className="text-gray-300 hover:text-white transition-colors hover:bg-gray-800 px-3 py-2 rounded-lg"
            >
              Services
            </Link>
            
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            {/* Cart */}
            <Link to="/cart" className="relative p-2 text-gray-300 hover:text-white transition-colors">
              <ShoppingCart className="h-6 w-6" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-purple-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </Link>

            {/* Messages */}
            {isAuthenticated && (
              <Link to="/messages" className="p-2 text-gray-300 hover:text-white transition-colors">
                <MessageCircle className="h-6 w-6" />
              </Link>
            )}

            {/* User Menu */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center space-x-2 p-2 text-gray-300 hover:text-white transition-colors"
                >
                  <div className="h-8 w-8 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium text-white">
                      {user?.name?.charAt(0) || 'U'}
                    </span>
                  </div>
                </button>

                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute right-0 mt-2 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-xl"
                  >
                    <div className="py-2">
                      <Link
                        to="/dashboard"
                        className="flex items-center px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700"
                        onClick={() => setDropdownOpen(false)}
                      >
                        <User className="h-4 w-4 mr-2" />
                        Dashboard
                      </Link>
                      {user?.role === 'admin' && (
                        <Link
                          to="/admin"
                          className="flex items-center px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700"
                          onClick={() => setDropdownOpen(false)}
                        >
                          <Settings className="h-4 w-4 mr-2" />
                          Admin Panel
                        </Link>
                      )}
                      <Link
                        to="/profile"
                        className="flex items-center px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700"
                        onClick={() => setDropdownOpen(false)}
                      >
                        <User className="h-4 w-4 mr-2" />
                        Profile
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-gray-700"
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Logout
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-gradient-to-r from-purple-500 to-cyan-500 text-white rounded-lg hover:from-purple-600 hover:to-cyan-600 transition-all"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={toggleSidebar}
              className="md:hidden p-2 text-gray-300 hover:text-white"
            >
              {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <motion.div
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 300 }}
          className="md:hidden fixed inset-y-0 right-0 w-64 bg-gray-900 border-l border-gray-800 z-50"
        >
          <div className="p-4 space-y-4">
            <Link
              to="/products"
              className="block px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg"
              onClick={toggleSidebar}
            >
              Products
            </Link>
            <Link
              to="/services"
              className="block px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg"
              onClick={toggleSidebar}
            >
              Services
            </Link>
            {!isAuthenticated && (
              <>
                <Link
                  to="/login"
                  className="block px-4 py-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg"
                  onClick={toggleSidebar}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block px-4 py-2 bg-gradient-to-r from-purple-500 to-cyan-500 text-white rounded-lg text-center"
                  onClick={toggleSidebar}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;