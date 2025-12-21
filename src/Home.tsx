import React from 'react';
import { Link } from 'react-router-dom';
import ParticlesCanvas from './assets/components/ParticlesCanvas';
import logo from "@assets/images/amicare.png";
import { 
  BarChart3, 
  Users, 
  Package, 
  Shield, 
  CheckCircle,
  Menu,
  X
} from 'lucide-react';
import { useState } from 'react';

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const features = [
    {
      icon: <Package className="w-8 h-8" />,
      title: "Product Management",
      description: "Easily add, edit, and organize your products with detailed categorization and inventory tracking."
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Sales Analytics",
      description: "Get real-time insights into your sales performance with comprehensive dashboards and reports."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Customer Management",
      description: "Manage customer relationships, track interactions, and improve customer satisfaction."
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Secure & Reliable",
      description: "Enterprise-grade security with data encryption and regular backups to protect your business."
    }
  ];

  const testimonials = [
    {
      name: "John Smith",
      role: "CEO, TechCorp",
      content: "This CRM transformed how we manage our products. Sales increased by 40% in just 3 months!"
    },
    {
      name: "Sarah Johnson",
      role: "Operations Manager",
      content: "The inventory management features saved us countless hours. Highly recommended for any growing business."
    },
    {
      name: "Mike Chen",
      role: "Small Business Owner",
      content: "As a small business, this system gave us enterprise-level capabilities at an affordable price."
    }
  ];

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      <ParticlesCanvas />
      
      {/* Navigation */}
      <nav className="relative z-50 bg-white/80 backdrop-blur-sm border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <img src={logo} alt="Logo" className="h-8 sm:h-10 w-auto" />
              <span className="text-lg sm:text-xl font-bold text-gray-800">ProductCRM</span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
              <a href="#features" className="text-gray-600 hover:text-[#1d9b4c] transition-colors">Features</a>
              <a href="#pricing" className="text-gray-600 hover:text-[#1d9b4c] transition-colors">Pricing</a>
              <a href="#testimonials" className="text-gray-600 hover:text-[#1d9b4c] transition-colors">Testimonials</a>
              <a href="#contact" className="text-gray-600 hover:text-[#1d9b4c] transition-colors">Contact</a>
            </div>
            
            <div className="hidden md:flex items-center space-x-4">
              <Link 
                to="/login" 
                className="text-gray-600 hover:text-[#1d9b4c] font-medium transition-colors"
              >
                Sign In
              </Link>
              <Link 
                to="/register" 
                className="bg-[#1d9b4c] text-white px-4 sm:px-6 py-2 rounded-lg font-semibold hover:bg-[#189749] transition-colors whitespace-nowrap"
              >
                Get Started Free
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-gray-600 hover:text-[#1d9b4c]"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4">
              <div className="flex flex-col space-y-4">
                <a href="#features" className="text-gray-600 hover:text-[#1d9b4c] transition-colors">Features</a>
                <a href="#pricing" className="text-gray-600 hover:text-[#1d9b4c] transition-colors">Pricing</a>
                <a href="#testimonials" className="text-gray-600 hover:text-[#1d9b4c] transition-colors">Testimonials</a>
                <a href="#contact" className="text-gray-600 hover:text-[#1d9b4c] transition-colors">Contact</a>
                <div className="pt-2 border-t">
                  <Link 
                    to="/login" 
                    className="block text-gray-600 hover:text-[#1d9b4c] font-medium py-2 transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link 
                    to="/register" 
                    className="block bg-[#1d9b4c] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#189749] transition-colors text-center mt-2"
                  >
                    Get Started Free
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-4 sm:mb-6">
              Streamline Your 
              <span className="text-[#1d9b4c] block sm:inline"> Product Management</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-8 sm:mb-10 px-2">
              All-in-one CRM solution designed specifically for product-based businesses. 
              Manage inventory, track sales, and grow your business efficiently.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
              <Link 
                to="/register" 
                className="bg-[#1d9b4c] text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg hover:bg-[#189749] transition-colors shadow-lg"
              >
                Start Free Trial
              </Link>
              <Link 
                to="/login" 
                className="border-2 border-[#1d9b4c] text-[#1d9b4c] px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg hover:bg-[#1d9b4c] hover:text-white transition-colors"
              >
                View Demo
              </Link>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mt-12 sm:mt-16 max-w-4xl mx-auto px-2">
              <div className="text-center p-3 sm:p-4 bg-white/50 rounded-lg">
                <div className="text-2xl sm:text-3xl font-bold text-[#1d9b4c]">500+</div>
                <div className="text-gray-600 text-sm sm:text-base">Businesses</div>
              </div>
              <div className="text-center p-3 sm:p-4 bg-white/50 rounded-lg">
                <div className="text-2xl sm:text-3xl font-bold text-[#1d9b4c]">40%</div>
                <div className="text-gray-600 text-sm sm:text-base">Avg. Growth</div>
              </div>
              <div className="text-center p-3 sm:p-4 bg-white/50 rounded-lg">
                <div className="text-2xl sm:text-3xl font-bold text-[#1d9b4c]">99.9%</div>
                <div className="text-gray-600 text-sm sm:text-base">Uptime</div>
              </div>
              <div className="text-center p-3 sm:p-4 bg-white/50 rounded-lg">
                <div className="text-2xl sm:text-3xl font-bold text-[#1d9b4c]">24/7</div>
                <div className="text-gray-600 text-sm sm:text-base">Support</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-12 sm:py-16 md:py-20 bg-gray-50 relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-3 sm:mb-4">Powerful Features</h2>
            <p className="text-gray-600 text-base sm:text-lg">Everything you need to manage your products effectively</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-4 sm:p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-[#1d9b4c] mb-3 sm:mb-4">{feature.icon}</div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2 sm:mb-3">{feature.title}</h3>
                <p className="text-gray-600 text-sm sm:text-base">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12 sm:py-16 md:py-20 relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-3 sm:mb-4">Simple & Effective</h2>
            <p className="text-gray-600 text-base sm:text-lg">Get started in three easy steps</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#1d9b4c] text-white rounded-full flex items-center justify-center text-xl sm:text-2xl font-bold mx-auto mb-4 sm:mb-6">1</div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Sign Up</h3>
              <p className="text-gray-600 text-sm sm:text-base px-4">Create your free account in under 2 minutes</p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#1957A4] text-white rounded-full flex items-center justify-center text-xl sm:text-2xl font-bold mx-auto mb-4 sm:mb-6">2</div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Add Products</h3>
              <p className="text-gray-600 text-sm sm:text-base px-4">Import or add your products with detailed information</p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-[#1d9b4c] text-white rounded-full flex items-center justify-center text-xl sm:text-2xl font-bold mx-auto mb-4 sm:mb-6">3</div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Start Managing</h3>
              <p className="text-gray-600 text-sm sm:text-base px-4">Track sales, manage inventory, and grow your business</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-12 sm:py-16 md:py-20 bg-gray-50 relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-3 sm:mb-4">Trusted by Businesses</h2>
            <p className="text-gray-600 text-base sm:text-lg">See what our customers say about us</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 sm:p-8 rounded-xl shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#1d9b4c] rounded-full flex items-center justify-center text-white font-bold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className="ml-3 sm:ml-4">
                    <h4 className="font-semibold text-base sm:text-lg">{testimonial.name}</h4>
                    <p className="text-gray-600 text-xs sm:text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-700 text-sm sm:text-base italic">"{testimonial.content}"</p>
                <div className="flex mt-4">
                  {[...Array(5)].map((_, i) => (
                    <CheckCircle key={i} className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 md:py-20 relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-4 sm:mb-6">
            Ready to Transform Your Product Management?
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-8 sm:mb-10 px-2">
            Join thousands of successful businesses using our platform
          </p>
          <Link 
            to="/register" 
            className="inline-block bg-[#1d9b4c] text-white px-6 sm:px-10 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg hover:bg-[#189749] transition-colors shadow-lg"
          >
            Get Started For Free
          </Link>
          <p className="text-gray-500 text-sm sm:text-base mt-3 sm:mt-4">No credit card required • 14-day free trial</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 sm:py-12 relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <img src={logo} alt="Logo" className="h-6 sm:h-8 w-auto" />
                <span className="text-lg sm:text-xl font-bold">ProductCRM</span>
              </div>
              <p className="text-gray-400 text-sm sm:text-base">
                Empowering businesses with powerful product management solutions since 2024.
              </p>
            </div>
            
            <div>
              <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white text-sm sm:text-base">Features</a></li>
                <li><a href="#" className="hover:text-white text-sm sm:text-base">Pricing</a></li>
                <li><a href="#" className="hover:text-white text-sm sm:text-base">API</a></li>
                <li><a href="#" className="hover:text-white text-sm sm:text-base">Documentation</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white text-sm sm:text-base">About</a></li>
                <li><a href="#" className="hover:text-white text-sm sm:text-base">Blog</a></li>
                <li><a href="#" className="hover:text-white text-sm sm:text-base">Careers</a></li>
                <li><a href="#" className="hover:text-white text-sm sm:text-base">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Connect</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white text-sm sm:text-base">Twitter</a></li>
                <li><a href="#" className="hover:text-white text-sm sm:text-base">LinkedIn</a></li>
                <li><a href="#" className="hover:text-white text-sm sm:text-base">Facebook</a></li>
                <li><a href="#" className="hover:text-white text-sm sm:text-base">Instagram</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-gray-400">
            <p className="text-sm sm:text-base">&copy; {new Date().getFullYear()} ProductCRM. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;