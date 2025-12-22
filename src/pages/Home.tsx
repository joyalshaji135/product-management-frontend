import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ParticlesCanvas from "@/assets/components/ParticlesCanvas";
import logo from "@assets/images/amicare.png";
import {
  Package,
  Shield,
  Zap,
  ArrowRight,
  Check,
  Star,
  TrendingUp,
  ChevronRight,
  Search,
  Eye,
  Tag,
} from "lucide-react";
import { publicService, Category, Product } from "@/services/publicService";

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [categoriesData, productsData] = await Promise.all([
          publicService.getAllCategories(),
          publicService.getAllProducts(),
        ]);

        setCategories(categoriesData);
        setProducts(productsData);

        // Get featured products (first 6 products or products with discount)
        const featured = productsData
          .filter((product) => product.discount > 0 || product.isDefault)
          .slice(0, 6);
        setFeaturedProducts(featured);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const calculateDiscountedPrice = (price: number, discount: number) => {
    return price - (price * discount) / 100;
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" ||
      (typeof product.category === "object" &&
        product.category._id === selectedCategory);

    return matchesSearch && matchesCategory;
  });

  const benefits = [
    { text: "Increase sales by up to 35%" },
    { text: "Reduce inventory costs by 20%" },
    { text: "Save 15+ hours weekly on admin" },
    { text: "99.9% platform uptime guarantee" },
  ];

  const testimonials = [
    {
      name: "Alex Chen",
      role: "Founder, TechStyle",
      content:
        "The analytics dashboard alone paid for itself in the first month. Incredible ROI.",
      rating: 5,
    },
    {
      name: "Maya Rodriguez",
      role: "Operations Director",
      content:
        "Seamless integration with our existing tools. Our team adapted in days, not weeks.",
      rating: 5,
    },
    {
      name: "James Wilson",
      role: "E-commerce Manager",
      content:
        "Finally a CRM that understands product businesses. The forecasting tools are game-changing.",
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      <ParticlesCanvas />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <img src={logo} alt="Logo" className="h-7 w-auto" />
              <span className="text-lg font-semibold text-gray-800">
                ProductFlow
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <a
                href="#features"
                className="text-gray-600 hover:text-gray-900 transition-colors text-sm"
              >
                Features
              </a>
              <a
                href="#products"
                className="text-gray-600 hover:text-gray-900 transition-colors text-sm"
              >
                Products
              </a>
              <a
                href="#categories"
                className="text-gray-600 hover:text-gray-900 transition-colors text-sm"
              >
                Categories
              </a>
              <a
                href="#testimonials"
                className="text-gray-600 hover:text-gray-900 transition-colors text-sm"
              >
                Testimonials
              </a>
            </div>

            <div className="hidden md:flex items-center space-x-3">
              <Link
                to="/login"
                className="text-gray-700 hover:text-gray-900 font-medium transition-colors text-sm"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="bg-gradient-to-r from-blue-600 to-emerald-500 text-white px-5 py-2.5 rounded-lg font-medium hover:shadow-lg transition-all duration-200 text-sm"
              >
                Get Started
                <ArrowRight className="w-3 h-3 ml-1 inline" />
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-gray-600 hover:text-gray-900"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <div className="space-y-1.5">
                <div
                  className={`w-6 h-0.5 bg-gray-600 transition-all duration-200 ${
                    isMenuOpen ? "rotate-45 translate-y-2" : ""
                  }`}
                ></div>
                <div
                  className={`w-6 h-0.5 bg-gray-600 transition-all duration-200 ${
                    isMenuOpen ? "opacity-0" : "opacity-100"
                  }`}
                ></div>
                <div
                  className={`w-6 h-0.5 bg-gray-600 transition-all duration-200 ${
                    isMenuOpen ? "-rotate-45 -translate-y-2" : ""
                  }`}
                ></div>
              </div>
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden absolute top-full left-0 right-0 bg-white border-t shadow-lg animate-slideDown">
              <div className="flex flex-col space-y-4 p-6">
                <a
                  href="#features"
                  className="text-gray-700 hover:text-gray-900 transition-colors"
                >
                  Features
                </a>
                <a
                  href="#products"
                  className="text-gray-700 hover:text-gray-900 transition-colors"
                >
                  Products
                </a>
                <a
                  href="#categories"
                  className="text-gray-700 hover:text-gray-900 transition-colors"
                >
                  Categories
                </a>
                <a
                  href="#testimonials"
                  className="text-gray-700 hover:text-gray-900 transition-colors"
                >
                  Testimonials
                </a>
                <div className="pt-4 border-t space-y-3">
                  <Link
                    to="/login"
                    className="block text-gray-700 hover:text-gray-900 font-medium py-2"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="block bg-gradient-to-r from-blue-600 to-emerald-500 text-white px-4 py-3 rounded-lg font-medium text-center hover:shadow-lg transition-all"
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
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-50 to-emerald-50 px-4 py-2 rounded-full mb-6">
              <Zap className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-700">
                Live Products: {products.length} Items
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Discover Amazing
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-500">
                Products & Categories
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
              Browse our collection of {products.length} products across{" "}
              {categories.length} categories. Find what you need with ease.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-10">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search products by name or description..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/register"
                className="group bg-gradient-to-r from-blue-600 to-emerald-500 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-xl hover:scale-105 transition-all duration-200 flex items-center"
              >
                Start Login
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section
        id="categories"
        className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50"
      >
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Browse Categories
            </h2>
            <p className="text-gray-600">
              Explore our diverse product categories
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <button
                onClick={() => setSelectedCategory("all")}
                className={`p-6 rounded-xl border transition-all duration-200 ${
                  selectedCategory === "all"
                    ? "bg-gradient-to-r from-blue-600 to-emerald-500 text-white border-transparent"
                    : "bg-white border-gray-200 hover:border-blue-300 hover:shadow-lg"
                }`}
              >
                <Package
                  className={`w-8 h-8 mb-4 ${
                    selectedCategory === "all" ? "text-white" : "text-blue-600"
                  }`}
                />
                <h3 className="text-lg font-semibold mb-2">All Products</h3>
                <p
                  className={`text-sm ${
                    selectedCategory === "all"
                      ? "text-blue-100"
                      : "text-gray-500"
                  }`}
                >
                  View all {products.length} products
                </p>
              </button>

              {categories.slice(0, 3).map((category) => (
                <button
                  key={category._id}
                  onClick={() => setSelectedCategory(category._id)}
                  className={`p-6 rounded-xl border transition-all duration-200 ${
                    selectedCategory === category._id
                      ? "bg-gradient-to-r from-blue-600 to-emerald-500 text-white border-transparent"
                      : "bg-white border-gray-200 hover:border-blue-300 hover:shadow-lg"
                  }`}
                >
                  <div className="w-12 h-12 rounded-lg bg-white/20 flex items-center justify-center mb-4">
                    <img
                      src={category.categoryImage}
                      alt={category.categoryName}
                      className="w-8 h-8 object-cover rounded"
                    />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">
                    {category.categoryName}
                  </h3>
                  <p
                    className={`text-sm ${
                      selectedCategory === category._id
                        ? "text-blue-100"
                        : "text-gray-500"
                    }`}
                  >
                    {category.categoryDescription}
                  </p>
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Featured Products */}
      <section id="products" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Featured Products
            </h2>
            <p className="text-gray-600">
              Handpicked selection of our best products
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.slice(0, 6).map((product) => {
                const category =
                  typeof product.category === "object"
                    ? product.category
                    : null;
                const discountedPrice = calculateDiscountedPrice(
                  product.price,
                  product.discount
                );

                return (
                  <div
                    key={product._id}
                    className="group bg-white rounded-xl border border-gray-200 hover:border-blue-300 hover:shadow-xl transition-all duration-300 overflow-hidden"
                  >
                    {/* Product Image */}
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={product.productImages[0]}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {product.discount > 0 && (
                        <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                          -{product.discount}%
                        </div>
                      )}
                      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100">
                          <Eye className="w-5 h-5 text-gray-700" />
                        </button>
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-500 flex items-center">
                          <Tag className="w-4 h-4 mr-1" />
                          {product.code}
                        </span>
                        {category && (
                          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                            {category.categoryName}
                          </span>
                        )}
                      </div>

                      <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                        {product.name}
                      </h3>

                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {product.description}
                      </p>

                      {/* Price */}
                      <div className="flex items-center justify-between">
                        <div>
                          {product.discount > 0 ? (
                            <div className="flex items-center space-x-2">
                              <span className="text-2xl font-bold text-gray-900">
                                ₹{discountedPrice.toLocaleString("en-IN")}
                              </span>
                              <span className="text-lg line-through text-gray-400">
                                ₹{product.price.toLocaleString("en-IN")}
                              </span>
                            </div>
                          ) : (
                            <span className="text-2xl font-bold text-gray-900">
                              ₹{product.price.toLocaleString("en-IN")}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center space-x-2">
                          <div
                            className={`px-2 py-1 rounded text-xs font-medium ${
                              product.stock > 20
                                ? "bg-green-100 text-green-800"
                                : product.stock > 5
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {product.stock} in stock
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="mt-6 flex justify-end">
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* View More Products */}
          {filteredProducts.length > 6 && (
            <div className="text-center mt-12">
              <Link
                to="/products"
                className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
              >
                View All {filteredProducts.length} Products
                <ChevronRight className="w-5 h-5 ml-2" />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-50 to-emerald-50">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">
                {loading ? "..." : products.length}+
              </div>
              <div className="text-gray-700">Products</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-emerald-600 mb-2">
                {loading ? "..." : categories.length}+
              </div>
              <div className="text-gray-700">Categories</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">
                {loading
                  ? "..."
                  : products.filter((p) => p.discount > 0).length}
                +
              </div>
              <div className="text-gray-700">Discounted Items</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-emerald-600 mb-2">
                24/7
              </div>
              <div className="text-gray-700">Customer Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Why Choose Our Platform
              </h2>

              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center">
                      <Check className="w-3 h-3 text-emerald-600" />
                    </div>
                    <p className="text-gray-700">{benefit.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <TrendingUp className="w-8 h-8 text-blue-600 mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">
                  Real-time Updates
                </h3>
                <p className="text-gray-600 text-sm">
                  Live inventory and price updates
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <Shield className="w-8 h-8 text-emerald-600 mb-4" />
                <h3 className="font-semibold text-gray-900 mb-2">
                  Secure Shopping
                </h3>
                <p className="text-gray-600 text-sm">
                  Safe and encrypted transactions
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section
        id="testimonials"
        className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50"
      >
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-gray-600">
              Join thousands of satisfied customers
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-emerald-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold text-gray-900">
                      {testimonial.name}
                    </h4>
                    <p className="text-gray-500 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-6 italic">
                  "{testimonial.content}"
                </p>
                <div className="flex">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="bg-gradient-to-r from-blue-50 to-emerald-50 rounded-3xl p-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Ready to Start Shopping?
            </h2>
            <p className="text-gray-600 mb-10 text-lg max-w-2xl mx-auto">
              Join our community of happy customers
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="group bg-gradient-to-r from-blue-600 to-emerald-500 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-xl hover:scale-105 transition-all duration-200 inline-flex items-center justify-center"
              >
                Create Free Account
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/products"
                className="group border border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-semibold hover:border-gray-400 hover:bg-white transition-all duration-200"
              >
                Browse Products
              </Link>
            </div>
            <p className="text-gray-500 text-sm mt-6">
              No credit card required • Full access • Cancel anytime
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-gray-100">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-6 md:mb-0">
              <img src={logo} alt="Logo" className="h-6 w-auto" />
              <span className="font-semibold text-gray-800">ProductFlow</span>
            </div>

            <div className="flex items-center space-x-6 text-sm text-gray-600">
              <a
                href="#products"
                className="hover:text-gray-900 transition-colors"
              >
                Products
              </a>
              <a
                href="#categories"
                className="hover:text-gray-900 transition-colors"
              >
                Categories
              </a>
              <a
                href="#testimonials"
                className="hover:text-gray-900 transition-colors"
              >
                Reviews
              </a>
              <a href="#" className="hover:text-gray-900 transition-colors">
                Contact
              </a>
            </div>

            <div className="mt-6 md:mt-0 text-gray-500 text-sm">
              © {new Date().getFullYear()} ProductFlow. All rights reserved.
            </div>
          </div>
        </div>
      </footer>

      {/* Add custom animation */}
      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default Home;
