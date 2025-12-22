import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  FiPackage, FiDollarSign,
  FiPercent, FiImage, FiLayers, FiGrid,
  FiCheck, FiX, FiEdit2, FiTrash2,
  FiArrowLeft, FiCalendar, FiClock, FiUser,
  FiChevronLeft, FiChevronRight, FiZoomIn
} from 'react-icons/fi';
import { useDarkMode } from '@/contexts/DarkModeContext';
import { productService, Product, Category } from '@/services/productServices';
import Loading from '@/components/Loading';

const ProductManagementView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { darkMode } = useDarkMode();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isActive, setIsActive] = useState(true);
  const [imageLoading, setImageLoading] = useState(true);
  const [showImageModal, setShowImageModal] = useState(false);
  const [modalImageIndex, setModalImageIndex] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;

      try {
        setLoading(true);
        setError(null);
        const data = await productService.getProductById(id);
        setProduct(data);
        setIsActive(data.productStatus === 'active');
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to fetch product details');
        console.error('Error fetching product:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleStatusToggle = async () => {
    if (!product) return;

    try {
      const newStatus = isActive ? 'inactive' : 'active';
      await productService.updateProductStatus(product._id, newStatus);
      setIsActive(!isActive);
      setProduct(prev => prev ? { ...prev, productStatus: newStatus } : null);
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to update product status');
    }
  };

  const handleDelete = async () => {
    if (!product) return;

    if (window.confirm('Are you sure you want to delete this product? This action cannot be undone.')) {
      try {
        await productService.deleteProduct(product._id);
        alert('Product deleted successfully');
        navigate('/product-management-list');
      } catch (err: any) {
        alert(err.response?.data?.message || 'Failed to delete product');
      }
    }
  };

  const calculateDiscountedPrice = (price: number, discount: number) => {
    return price - (price * discount / 100);
  };

  const nextImage = () => {
    if (!product) return;
    setActiveImageIndex(prev => 
      prev === product.productImages.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    if (!product) return;
    setActiveImageIndex(prev => 
      prev === 0 ? product.productImages.length - 1 : prev - 1
    );
  };

  const openImageModal = (index: number) => {
    setModalImageIndex(index);
    setShowImageModal(true);
  };

  const closeImageModal = () => {
    setShowImageModal(false);
  };

  const nextModalImage = () => {
    if (!product) return;
    setModalImageIndex(prev => 
      prev === product.productImages.length - 1 ? 0 : prev + 1
    );
  };

  const prevModalImage = () => {
    if (!product) return;
    setModalImageIndex(prev => 
      prev === 0 ? product.productImages.length - 1 : prev - 1
    );
  };

  const getCategoryInfo = () => {
    if (!product?.category) return null;
    
    if (typeof product.category === 'string') {
      return {
        categoryName: 'N/A',
        categoryImage: 'https://via.placeholder.com/100?text=N/A',
        categoryDescription: 'Category not found',
        categoryStatus: 'inactive'
      };
    }
    
    const category = product.category as Category;
    return {
      categoryName: category.categoryName || 'Uncategorized',
      categoryImage: category.categoryImage || 'https://via.placeholder.com/100?text=Category',
      categoryDescription: category.categoryDescription || 'No description',
      categoryStatus: category.categoryStatus || 'inactive'
    };
  };

  // Helper function to safely get createdBy value
  const getCreatedByValue = () => {
    if (!product?.createdBy) return 'System';
    
    if (typeof product.createdBy === 'string') {
      return product.createdBy;
    }
    
    if (typeof product.createdBy === 'object' && product.createdBy !== null) {
      return (product.createdBy as any).email || (product.createdBy as any).name || 'Unknown User';
    }
    
    return 'System';
  };

  const categoryInfo = getCategoryInfo();

  if (loading) {
    return <Loading message="Loading product details..." />;
  }

  if (error) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
        <div className="text-center max-w-md mx-auto p-6">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className={`text-2xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Error Loading Product</h2>
          <p className={`mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{error}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
            <Link
              to="/product-management-list"
              className="inline-flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <FiArrowLeft />
              Back to Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
        <div className="text-center max-w-md mx-auto p-6">
          <div className="text-gray-500 text-6xl mb-4">📦</div>
          <h2 className={`text-2xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-gray-900'}`}>Product Not Found</h2>
          <p className={`mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>The product you're looking for doesn't exist or has been deleted.</p>
          <Link
            to="/product-management-list"
            className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <FiArrowLeft />
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const discountedPrice = calculateDiscountedPrice(product.price, product.discount);
  const savings = product.price - discountedPrice;

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className={`mb-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold mb-2">Product Details</h1>
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <Link to="/dashboard" className="hover:text-blue-600 dark:hover:text-blue-400">
                  Dashboard
                </Link>
                <span className="mx-2">/</span>
                <Link to="/product-management-list" className="hover:text-blue-600 dark:hover:text-blue-400">
                  Product Management
                </Link>
                <span className="mx-2">/</span>
                <span className="text-gray-400 dark:text-gray-500">View</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Link
                to="/product-management-list"
                className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <FiArrowLeft />
                Back
              </Link>
              <Link
                to={`/product-management/edit/${product._id}`}
                className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <FiEdit2 />
                Edit Product
              </Link>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Product Images */}
          <div className="lg:col-span-2 space-y-6">
            {/* Product Images */}
            <div className={`rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center">
                  <FiImage className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" />
                  <h3 className="text-lg font-medium">Product Images</h3>
                  <span className="ml-2 text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full">
                    {product.productImages.length} images
                  </span>
                </div>
              </div>
              <div className="p-4">
                {/* Main Image */}
                <div className="relative mb-6">
                  <div className="relative aspect-square rounded-lg overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 group">
                    {product.productImages.length > 0 ? (
                      <>
                        <img
                          src={product.productImages[activeImageIndex]}
                          alt={`${product.name} - Image ${activeImageIndex + 1}`}
                          className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                          onLoad={() => setImageLoading(false)}
                          onError={(e) => {
                            e.currentTarget.src = 'https://via.placeholder.com/600x600?text=Image+Not+Available';
                            setImageLoading(false);
                          }}
                        />
                        {imageLoading && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                          </div>
                        )}
                        <button
                          onClick={() => openImageModal(activeImageIndex)}
                          className="absolute top-4 right-4 p-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white dark:hover:bg-gray-700 transition-all opacity-0 group-hover:opacity-100"
                          title="Zoom"
                        >
                          <FiZoomIn className="h-5 w-5" />
                        </button>
                      </>
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center p-8">
                        <FiPackage className="h-24 w-24 text-gray-300 dark:text-gray-600 mb-4" />
                        <p className="text-gray-500 dark:text-gray-400 text-center">
                          No images available
                        </p>
                      </div>
                    )}
                    
                    {/* Navigation Arrows */}
                    {product.productImages.length > 1 && (
                      <>
                        <button
                          onClick={prevImage}
                          className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white dark:hover:bg-gray-700 transition-all"
                          disabled={product.productImages.length <= 1}
                        >
                          <FiChevronLeft className="h-5 w-5" />
                        </button>
                        <button
                          onClick={nextImage}
                          className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white dark:hover:bg-gray-700 transition-all"
                          disabled={product.productImages.length <= 1}
                        >
                          <FiChevronRight className="h-5 w-5" />
                        </button>
                      </>
                    )}
                  </div>
                  
                  {/* Image Counter */}
                  {product.productImages.length > 1 && (
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 bg-black/60 text-white rounded-full text-sm">
                      {activeImageIndex + 1} / {product.productImages.length}
                    </div>
                  )}
                </div>

                {/* Thumbnails */}
                {product.productImages.length > 1 && (
                  <div className="mt-6">
                    <h4 className={`text-sm font-medium mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      All Images
                    </h4>
                    <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-2">
                      {product.productImages.map((image, index) => (
                        <button
                          key={index}
                          onClick={() => setActiveImageIndex(index)}
                          className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all transform hover:scale-105 ${
                            activeImageIndex === index
                              ? 'border-blue-500 dark:border-blue-400 ring-2 ring-blue-500/20 dark:ring-blue-400/20 shadow-lg'
                              : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                          }`}
                        >
                          <img
                            src={image}
                            alt={`Thumbnail ${index + 1}`}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.src = 'https://via.placeholder.com/100x100?text=Error';
                            }}
                          />
                          {activeImageIndex === index && (
                            <div className="absolute inset-0 bg-blue-500/10 dark:bg-blue-400/10"></div>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            <div className={`rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center">
                  <FiPackage className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" />
                  <h3 className="text-lg font-medium">Product Description</h3>
                </div>
              </div>
              <div className="p-6">
                <div className={`prose prose-sm max-w-none ${darkMode ? 'prose-invert' : ''}`}>
                  <p className={`leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {product.description || 'No description available'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Product Details */}
          <div className="space-y-6">
            {/* Product Summary Card */}
            <div className={`rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <FiPackage className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" />
                    <h3 className="text-lg font-medium">Product Summary</h3>
                  </div>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 shadow-sm'
                      : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 shadow-sm'
                  }`}>
                    {isActive ? (
                      <>
                        <FiCheck className="mr-1.5 h-4 w-4" /> Active
                      </>
                    ) : (
                      <>
                        <FiX className="mr-1.5 h-4 w-4" /> Inactive
                      </>
                    )}
                  </span>
                </div>
              </div>
              <div className="p-6 space-y-6">
                <div>
                  <h4 className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Product Name</h4>
                  <p className={`text-xl font-bold mt-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>{product.name}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
                    <h4 className={`text-xs font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Product Code</h4>
                    <p className={`text-lg font-semibold mt-1 ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>
                      {product.code || 'N/A'}
                    </p>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
                    <h4 className={`text-xs font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Default</h4>
                    <p className={`text-lg font-semibold mt-1 ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>
                      {product.isDefault ? 'Yes' : 'No'}
                    </p>
                  </div>
                </div>

                {/* Category */}
                <div>
                  <h4 className={`text-sm font-medium mb-3 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Category</h4>
                  <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <div className="relative h-12 w-12 rounded-lg overflow-hidden mr-3 ring-2 ring-white dark:ring-gray-800 shadow">
                      <img
                        src={categoryInfo?.categoryImage}
                        alt={categoryInfo?.categoryName}
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = 'https://via.placeholder.com/48?text=C';
                        }}
                      />
                    </div>
                    <div>
                      <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {categoryInfo?.categoryName}
                      </p>
                      <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-600'}`}>
                        {categoryInfo?.categoryStatus === 'active' ? 'Active' : 'Inactive'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700 space-y-3">
                  <button
                    onClick={handleStatusToggle}
                    className={`w-full inline-flex items-center justify-center px-4 py-3 rounded-lg text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                      isActive
                        ? 'bg-red-50 text-red-700 hover:bg-red-100 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/30 border border-red-200 dark:border-red-800'
                        : 'bg-green-600 text-white hover:bg-green-700 dark:hover:bg-green-700 border border-green-600'
                    }`}
                  >
                    {isActive ? 'Deactivate Product' : 'Activate Product'}
                  </button>
                  <button
                    onClick={handleDelete}
                    className="w-full inline-flex items-center justify-center px-4 py-3 border border-red-600 text-red-600 dark:border-red-500 dark:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"
                  >
                    <FiTrash2 className="mr-2" />
                    Delete Product
                  </button>
                </div>
              </div>
            </div>

            {/* Pricing Card */}
            <div className={`rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center">
                  <FiDollarSign className="h-5 w-5 text-green-600 dark:text-green-400 mr-2" />
                  <h3 className="text-lg font-medium">Pricing & Stock</h3>
                </div>
              </div>
              <div className="p-6 space-y-6">
                {/* Price */}
                <div>
                  <h4 className={`text-sm font-medium mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Price</h4>
                  <div className="space-y-2">
                    {product.discount > 0 && (
                      <div className="flex items-center">
                        <span className={`text-sm line-through ${darkMode ? 'text-gray-500' : 'text-gray-600'}`}>
                          ₹{product.price.toLocaleString('en-IN')}
                        </span>
                        <span className="ml-2 inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                          <FiPercent className="mr-1 h-3 w-3" />
                          {product.discount}% OFF
                        </span>
                      </div>
                    )}
                    <div className="flex items-baseline">
                      <span className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        ₹{discountedPrice.toLocaleString('en-IN')}
                      </span>
                    </div>
                    {product.discount > 0 && (
                      <p className={`text-sm ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
                        You save ₹{savings.toLocaleString('en-IN')}
                      </p>
                    )}
                  </div>
                </div>

                {/* Stock */}
                <div>
                  <h4 className={`text-sm font-medium mb-3 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Stock Level</h4>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {product.stock} units
                      </span>
                      <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                        product.stock <= 10 
                          ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                          : product.stock <= 50
                          ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                          : 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                      }`}>
                        {product.stock <= 10 ? 'Low Stock' : product.stock <= 50 ? 'Medium Stock' : 'In Stock'}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-2">
                      <div
                        className={`h-2.5 rounded-full transition-all duration-500 ${
                          product.stock <= 10 
                            ? 'bg-red-500' 
                            : product.stock <= 50 
                            ? 'bg-yellow-500' 
                            : 'bg-green-500'
                        }`}
                        style={{ width: `${Math.min((product.stock / 100) * 100, 100)}%` }}
                      ></div>
                    </div>
                    <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-600'}`}>
                      {product.stock <= 10 
                        ? '⚠️ Order more stock immediately' 
                        : product.stock <= 50 
                        ? '⚠️ Consider restocking soon' 
                        : '✓ Sufficient stock available'}
                    </p>
                  </div>
                </div>

                {/* Inventory Value */}
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <h4 className={`text-sm font-medium mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Inventory Value</h4>
                  <p className={`text-2xl font-bold text-blue-600 dark:text-blue-400`}>
                    ₹{(product.stock * discountedPrice).toLocaleString('en-IN')}
                  </p>
                  <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-600'}`}>
                    Based on current discounted price
                  </p>
                </div>
              </div>
            </div>

            {/* System Information Card */}
            <div className={`rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center">
                  <FiCalendar className="h-5 w-5 text-purple-600 dark:text-purple-400 mr-2" />
                  <h3 className="text-lg font-medium">System Information</h3>
                </div>
              </div>
              <div className="p-6 space-y-4">
                <InfoRow
                  icon={<FiCalendar />}
                  label="Created Date"
                  value={new Date(product.createdDate).toLocaleDateString('en-IN')}
                  darkMode={darkMode}
                />
                <InfoRow
                  icon={<FiClock />}
                  label="Created Time"
                  value={new Date(product.createdDate).toLocaleTimeString('en-IN', { 
                    hour: '2-digit', 
                    minute: '2-digit',
                    hour12: true 
                  })}
                  darkMode={darkMode}
                />
                <InfoRow
                  icon={<FiUser />}
                  label="Created By"
                  value={getCreatedByValue()}
                  darkMode={darkMode}
                />
                <InfoRow
                  icon={<FiLayers />}
                  label="Default Product"
                  value={product.isDefault ? 'Yes' : 'No'}
                  valueClassName={product.isDefault ? 'text-green-600 dark:text-green-400' : ''}
                  darkMode={darkMode}
                />
                <InfoRow
                  icon={<FiGrid />}
                  label="Last Updated"
                  value={new Date(product.updatedAt).toLocaleDateString('en-IN')}
                  darkMode={darkMode}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      {showImageModal && product.productImages.length > 0 && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm">
          <div className="relative max-w-4xl max-h-[90vh] w-full mx-4">
            <button
              onClick={closeImageModal}
              className="absolute top-4 right-4 z-10 p-2 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-sm"
            >
              <FiX className="h-6 w-6 text-white" />
            </button>
            
            <button
              onClick={prevModalImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-sm"
            >
              <FiChevronLeft className="h-6 w-6 text-white" />
            </button>
            
            <button
              onClick={nextModalImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-3 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-sm"
            >
              <FiChevronRight className="h-6 w-6 text-white" />
            </button>
            
            <img
              src={product.productImages[modalImageIndex]}
              alt={`${product.name} - Image ${modalImageIndex + 1}`}
              className="w-full h-full object-contain rounded-lg"
              onError={(e) => {
                e.currentTarget.src = 'https://via.placeholder.com/800x600?text=Image+Not+Available';
              }}
            />
            
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/60 text-white rounded-full text-sm">
              {modalImageIndex + 1} / {product.productImages.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// InfoRow Component - FIXED VERSION
const InfoRow = ({ 
  icon, 
  label, 
  value, 
  valueClassName = '',
  darkMode 
}: { 
  icon: React.ReactNode; 
  label: string; 
  value: string | number | React.ReactNode; 
  valueClassName?: string;
  darkMode: boolean 
}) => (
  <div className="flex items-center justify-between py-2">
    <div className="flex items-center">
      <span className={`mr-3 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
        {icon}
      </span>
      <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
        {label}
      </span>
    </div>
    <span className={`text-sm font-medium truncate max-w-[200px] ${valueClassName || (darkMode ? 'text-gray-300' : 'text-gray-900')}`}>
      {typeof value === 'string' || typeof value === 'number' ? String(value) : value}
    </span>
  </div>
);

export default ProductManagementView;