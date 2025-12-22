import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  FiPackage, FiTag, FiDollarSign, FiShoppingCart,
  FiPercent, FiImage, FiLayers, FiGrid,
  FiCheck, FiX, FiSave, FiTrash2,
  FiArrowLeft, FiUpload, FiXCircle, FiAlertCircle
} from 'react-icons/fi';
import { useDarkMode } from '@/contexts/DarkModeContext';
import { productService, Product, CategoryDropdown } from '@/services/productServices';
import Loading from '@/components/Loading';
import { toast } from 'react-toastify';

interface FormData {
  name: string;
  code: string;
  description: string;
  stock: number;
  price: number;
  discount: number;
  category: string;
  productStatus: 'active' | 'inactive';
}

interface ImagePreview {
  file: File;
  preview: string;
}

const ProductManagementEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { darkMode } = useDarkMode();
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<FormData>({
    name: '',
    code: '',
    description: '',
    stock: 0,
    price: 0,
    discount: 0,
    category: '',
    productStatus: 'active'
  });
  
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [imagesToDelete, setImagesToDelete] = useState<string[]>([]);
  const [newImages, setNewImages] = useState<ImagePreview[]>([]);
  const [categories, setCategories] = useState<CategoryDropdown[]>([]);
  const [imageUploadError, setImageUploadError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;

      try {
        setLoading(true);
        setError(null);
        
        // Fetch product data
        const product = await productService.getProductById(id);
        
        // Fetch categories for dropdown
        const categoriesData = await productService.getCategoriesForDropdown();
        setCategories(categoriesData);

        // Set form data
        setFormData({
          name: product.name || '',
          code: product.code || '',
          description: product.description || '',
          stock: product.stock || 0,
          price: product.price || 0,
          discount: product.discount || 0,
          category: typeof product.category === 'string' ? product.category : product.category?._id || '',
          productStatus: product.productStatus || 'active'
        });

        // Set existing images
        if (product.productImages && Array.isArray(product.productImages)) {
          setExistingImages(product.productImages);
        }

      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to fetch product data');
        console.error('Error fetching product:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? (value === '' ? 0 : parseFloat(value)) : value
    }));
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const validImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
    const maxSize = 5 * 1024 * 1024; // 5MB
    const maxImages = 10 - existingImages.length + imagesToDelete.length;

    const newFiles: ImagePreview[] = [];
    const errors: string[] = [];

    Array.from(files).slice(0, maxImages).forEach(file => {
      if (!validImageTypes.includes(file.type)) {
        errors.push(`${file.name}: Invalid file type. Only JPEG, PNG, WebP, GIF are allowed.`);
        return;
      }

      if (file.size > maxSize) {
        errors.push(`${file.name}: File size exceeds 5MB limit.`);
        return;
      }

      const preview = URL.createObjectURL(file);
      newFiles.push({ file, preview });
    });

    if (errors.length > 0) {
      setImageUploadError(errors.join('\n'));
    } else {
      setImageUploadError(null);
    }

    setNewImages(prev => [...prev, ...newFiles]);
    e.target.value = ''; // Reset file input
  };

  const removeExistingImage = (imageUrl: string) => {
    setExistingImages(prev => prev.filter(img => img !== imageUrl));
    setImagesToDelete(prev => [...prev, imageUrl]);
  };

  const removeNewImage = (index: number) => {
    const imageToRemove = newImages[index];
    URL.revokeObjectURL(imageToRemove.preview);
    setNewImages(prev => prev.filter((_, i) => i !== index));
  };

  const validateForm = (): boolean => {
    const errors: string[] = [];

    if (!formData.name.trim()) errors.push('Product name is required');
    if (!formData.category) errors.push('Category is required');
    if (formData.price <= 0) errors.push('Price must be greater than 0');
    if (formData.stock < 0) errors.push('Stock cannot be negative');
    if (formData.discount < 0 || formData.discount > 100) errors.push('Discount must be between 0 and 100');
    
    if (existingImages.length - imagesToDelete.length + newImages.length === 0) {
      errors.push('At least one product image is required');
    }

    if (errors.length > 0) {
      toast.error(errors.join('\n'));
      return false;
    }

    return true;
  };

  const calculateDiscountedPrice = () => {
    return formData.price - (formData.price * formData.discount / 100);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      setSaving(true);

      // Create FormData object
      const formDataToSend = new FormData();
      
      // Append all product data as JSON string first (for non-file data)
      const productData = {
        name: formData.name,
        code: formData.code,
        description: formData.description,
        stock: formData.stock,
        price: formData.price,
        discount: formData.discount,
        category: formData.category,
        productStatus: formData.productStatus,
        imagesToDelete: imagesToDelete
      };
      
      formDataToSend.append('productData', JSON.stringify(productData));
      
      // Append new images
      newImages.forEach((image, index) => {
        formDataToSend.append('productImages', image.file);
      });

      // Log the data being sent (for debugging)
      console.log('Sending product data:', productData);
      console.log('New images:', newImages.length);
      console.log('Images to delete:', imagesToDelete.length);

      // Update product
      const response = await productService.updateProduct(id!, formDataToSend);
      console.log('Update response:', response);
      
      toast.success('Product updated successfully!');
      navigate(`/product-management/view/${id}`);
      
    } catch (err: any) {
      console.error('Full error details:', err);
      console.error('Error response:', err.response);
      
      let errorMessage = 'Failed to update product';
      
      if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      } else if (err.response?.data?.errors) {
        // Handle validation errors
        const errors = err.response.data.errors;
        errorMessage = Object.values(errors).flat().join(', ');
      } else if (err.response?.status === 400) {
        errorMessage = 'Invalid data submitted. Please check all fields.';
      } else if (err.response?.status === 401) {
        errorMessage = 'Unauthorized. Please login again.';
      } else if (err.response?.status === 404) {
        errorMessage = 'Product not found.';
      }
      
      toast.error(errorMessage);
      console.error('Error updating product:', err);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    if (window.confirm('Are you sure you want to cancel? All unsaved changes will be lost.')) {
      navigate(`/product-management/view/${id}`);
    }
  };

  // Alternative submit method if the first one doesn't work
  const handleSubmitAlternative = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      setSaving(true);

      const formDataToSend = new FormData();
      
      // Append each field individually
      formDataToSend.append('name', formData.name);
      formDataToSend.append('code', formData.code);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('stock', formData.stock.toString());
      formDataToSend.append('price', formData.price.toString());
      formDataToSend.append('discount', formData.discount.toString());
      formDataToSend.append('category', formData.category);
      formDataToSend.append('productStatus', formData.productStatus);
      
      // Append images to delete as separate entries
      imagesToDelete.forEach(imageUrl => {
        formDataToSend.append('imagesToDelete', imageUrl);
      });

      // Append new images
      newImages.forEach(image => {
        formDataToSend.append('productImages', image.file);
      });

      // Log FormData entries
      console.log('FormData entries:');
      for (const pair of (formDataToSend as any).entries()) {
        console.log(pair[0], pair[1]);
      }

      // Update product
      const response = await productService.updateProduct(id!, formDataToSend);
      console.log('Update response:', response);
      
      toast.success('Product updated successfully!');
      navigate(`/product-management/view/${id}`);
      
    } catch (err: any) {
      console.error('Full error details:', err);
      
      let errorMessage = 'Failed to update product';
      
      if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      } else if (err.response?.data?.errors) {
        const errors = err.response.data.errors;
        errorMessage = Object.values(errors).flat().join(', ');
      }
      
      toast.error(errorMessage);
    } finally {
      setSaving(false);
    }
  };

  // Clean up object URLs
  useEffect(() => {
    return () => {
      newImages.forEach(image => {
        URL.revokeObjectURL(image.preview);
      });
    };
  }, [newImages]);

  if (loading) {
    return <Loading message="Loading product data..." />;
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

  const totalImages = existingImages.length - imagesToDelete.length + newImages.length;
  const discountedPrice = calculateDiscountedPrice();
  const savings = formData.price - discountedPrice;

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className={`mb-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold mb-2">Edit Product</h1>
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <Link to="/dashboard" className="hover:text-blue-600 dark:hover:text-blue-400">
                  Dashboard
                </Link>
                <span className="mx-2">/</span>
                <Link to="/product-management-list" className="hover:text-blue-600 dark:hover:text-blue-400">
                  Product Management
                </Link>
                <span className="mx-2">/</span>
                <Link to={`/product-management/view/${id}`} className="hover:text-blue-600 dark:hover:text-blue-400">
                  View
                </Link>
                <span className="mx-2">/</span>
                <span className="text-gray-400 dark:text-gray-500">Edit</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Link
                to={`/product-management/view/${id}`}
                className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <FiArrowLeft />
                Cancel
              </Link>
              <button
                onClick={handleSubmit}
                disabled={saving}
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FiSave />
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Product Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Basic Information Card */}
              <div className={`rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center">
                    <FiPackage className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" />
                    <h3 className="text-lg font-medium">Basic Information</h3>
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  {/* Product Name */}
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Product Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        darkMode 
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                          : 'border-gray-300 text-gray-900 placeholder-gray-500'
                      }`}
                      placeholder="Enter product name"
                      required
                    />
                  </div>

                  {/* Product Code */}
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Product Code
                    </label>
                    <input
                      type="text"
                      name="code"
                      value={formData.code}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        darkMode 
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                          : 'border-gray-300 text-gray-900 placeholder-gray-500'
                      }`}
                      placeholder="Enter product code (optional)"
                    />
                  </div>

                  {/* Category */}
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Category *
                    </label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        darkMode 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'border-gray-300 text-gray-900'
                      }`}
                      required
                    >
                      <option value="">Select a category</option>
                      {categories.map(category => (
                        <option key={category._id} value={category._id}>
                          {category.categoryName}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Description */}
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows={4}
                      className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        darkMode 
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                          : 'border-gray-300 text-gray-900 placeholder-gray-500'
                      }`}
                      placeholder="Enter product description"
                    />
                  </div>
                </div>
              </div>

              {/* Pricing & Stock Card */}
              <div className={`rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center">
                    <FiDollarSign className="h-5 w-5 text-green-600 dark:text-green-400 mr-2" />
                    <h3 className="text-lg font-medium">Pricing & Stock</h3>
                  </div>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Price */}
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Price (₹) *
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span className="text-gray-500">₹</span>
                        </div>
                        <input
                          type="number"
                          name="price"
                          value={formData.price}
                          onChange={handleInputChange}
                          min="0"
                          step="0.01"
                          className={`w-full pl-8 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            darkMode 
                              ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                              : 'border-gray-300 text-gray-900 placeholder-gray-500'
                          }`}
                          placeholder="0.00"
                          required
                        />
                      </div>
                    </div>

                    {/* Discount */}
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Discount (%)
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FiPercent className="text-gray-500" />
                        </div>
                        <input
                          type="number"
                          name="discount"
                          value={formData.discount}
                          onChange={handleInputChange}
                          min="0"
                          max="100"
                          step="0.1"
                          className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                            darkMode 
                              ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                              : 'border-gray-300 text-gray-900 placeholder-gray-500'
                          }`}
                          placeholder="0"
                        />
                      </div>
                    </div>

                    {/* Stock */}
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Stock Quantity *
                      </label>
                      <input
                        type="number"
                        name="stock"
                        value={formData.stock}
                        onChange={handleInputChange}
                        min="0"
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          darkMode 
                            ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                            : 'border-gray-300 text-gray-900 placeholder-gray-500'
                        }`}
                        placeholder="0"
                        required
                      />
                    </div>

                    {/* Status */}
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Status
                      </label>
                      <select
                        name="productStatus"
                        value={formData.productStatus}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          darkMode 
                            ? 'bg-gray-700 border-gray-600 text-white' 
                            : 'border-gray-300 text-gray-900'
                        }`}
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                      </select>
                    </div>
                  </div>

                  {/* Price Summary */}
                  {formData.price > 0 && (
                    <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                      <h4 className={`text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Price Summary
                      </h4>
                      <div className="space-y-1">
                        <div className="flex justify-between">
                          <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            Original Price:
                          </span>
                          <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>
                            ₹{formData.price.toLocaleString('en-IN')}
                          </span>
                        </div>
                        {formData.discount > 0 && (
                          <>
                            <div className="flex justify-between">
                              <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                Discount ({formData.discount}%):
                              </span>
                              <span className={`text-sm font-medium text-red-600 dark:text-red-400`}>
                                -₹{savings.toLocaleString('en-IN')}
                              </span>
                            </div>
                            <div className="flex justify-between pt-2 border-t border-gray-200 dark:border-gray-600">
                              <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>
                                Final Price:
                              </span>
                              <span className={`text-lg font-bold text-green-600 dark:text-green-400`}>
                                ₹{discountedPrice.toLocaleString('en-IN')}
                              </span>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Product Images Card */}
              <div className={`rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <FiImage className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" />
                      <h3 className="text-lg font-medium">Product Images</h3>
                    </div>
                    <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {totalImages} / 10 images
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  {/* Upload Area */}
                  <div className="mb-6">
                    <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Upload New Images
                    </label>
                    <div className={`border-2 border-dashed rounded-lg p-8 text-center ${
                      darkMode 
                        ? 'border-gray-600 bg-gray-700/50 hover:border-gray-500' 
                        : 'border-gray-300 bg-gray-50 hover:border-gray-400'
                    } transition-colors`}>
                      <input
                        type="file"
                        id="image-upload"
                        multiple
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        disabled={totalImages >= 10}
                      />
                      <label htmlFor="image-upload" className="cursor-pointer">
                        <div className="flex flex-col items-center">
                          <FiUpload className="h-12 w-12 text-gray-400 dark:text-gray-500 mb-4" />
                          <p className={`text-sm mb-2 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            Drag & drop images here or click to browse
                          </p>
                          <p className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                            Supports JPEG, PNG, WebP, GIF • Max 5MB per image • Max 10 images total
                          </p>
                          {totalImages >= 10 && (
                            <p className="text-xs text-red-600 dark:text-red-400 mt-2">
                              Maximum 10 images reached
                            </p>
                          )}
                        </div>
                      </label>
                    </div>
                    
                    {imageUploadError && (
                      <div className="mt-3 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                        <div className="flex items-start">
                          <FiAlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 mr-2 mt-0.5 flex-shrink-0" />
                          <p className="text-sm text-red-600 dark:text-red-400 whitespace-pre-line">
                            {imageUploadError}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Existing Images */}
                  {existingImages.length > 0 && (
                    <div className="mb-6">
                      <h4 className={`text-sm font-medium mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Existing Images
                      </h4>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {existingImages.map((image, index) => (
                          <div key={index} className="relative group">
                            <div className={`aspect-square rounded-lg overflow-hidden border ${
                              imagesToDelete.includes(image)
                                ? 'border-red-500 dark:border-red-400'
                                : 'border-gray-200 dark:border-gray-700'
                            }`}>
                              <img
                                src={image}
                                alt={`Product image ${index + 1}`}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <button
                              type="button"
                              onClick={() => removeExistingImage(image)}
                              className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                            >
                              <FiXCircle size={16} />
                            </button>
                            {imagesToDelete.includes(image) && (
                              <div className="absolute inset-0 bg-red-500/20 rounded-lg flex items-center justify-center">
                                <span className="text-white font-medium">To be deleted</span>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* New Images */}
                  {newImages.length > 0 && (
                    <div>
                      <h4 className={`text-sm font-medium mb-3 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        New Images
                      </h4>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {newImages.map((image, index) => (
                          <div key={index} className="relative group">
                            <div className="aspect-square rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                              <img
                                src={image.preview}
                                alt={`New image ${index + 1}`}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <button
                              type="button"
                              onClick={() => removeNewImage(index)}
                              className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                            >
                              <FiXCircle size={16} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* No Images Warning */}
                  {totalImages === 0 && (
                    <div className="text-center py-8">
                      <FiImage className="h-12 w-12 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        No product images. Please upload at least one image.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column - Preview & Actions */}
            <div className="space-y-6">
              {/* Preview Card */}
              <div className={`rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center">
                    <FiPackage className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" />
                    <h3 className="text-lg font-medium">Product Preview</h3>
                  </div>
                </div>
                <div className="p-6">
                  {/* Product Image */}
                  <div className="mb-4">
                    {existingImages.length > 0 && !imagesToDelete.includes(existingImages[0]) ? (
                      <div className="aspect-square rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700">
                        <img
                          src={existingImages[0]}
                          alt={formData.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : newImages.length > 0 ? (
                      <div className="aspect-square rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700">
                        <img
                          src={newImages[0].preview}
                          alt={formData.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="aspect-square rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                        <FiPackage className="h-16 w-16 text-gray-400 dark:text-gray-600" />
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="space-y-3">
                    <div>
                      <h4 className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        Product Name
                      </h4>
                      <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                        {formData.name || 'No name'}
                      </p>
                    </div>

                    <div>
                      <h4 className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        Price
                      </h4>
                      <div className="flex items-baseline">
                        <span className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                          ₹{discountedPrice.toLocaleString('en-IN')}
                        </span>
                        {formData.discount > 0 && (
                          <span className={`text-sm line-through ml-2 ${darkMode ? 'text-gray-500' : 'text-gray-600'}`}>
                            ₹{formData.price.toLocaleString('en-IN')}
                          </span>
                        )}
                      </div>
                    </div>

                    <div>
                      <h4 className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        Stock
                      </h4>
                      <p className={`font-medium ${
                        formData.stock <= 10 
                          ? 'text-red-600 dark:text-red-400'
                          : formData.stock <= 50
                          ? 'text-yellow-600 dark:text-yellow-400'
                          : 'text-green-600 dark:text-green-400'
                      }`}>
                        {formData.stock} units
                      </p>
                    </div>

                    <div>
                      <h4 className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        Status
                      </h4>
                      <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
                        formData.productStatus === 'active'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                          : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                      }`}>
                        {formData.productStatus === 'active' ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions Card */}
              <div className={`rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center">
                    <FiSave className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" />
                    <h3 className="text-lg font-medium">Actions</h3>
                  </div>
                </div>
                <div className="p-6 space-y-3">
                  <button
                    type="submit"
                    disabled={saving}
                    className="w-full inline-flex items-center justify-center px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <FiSave className="mr-2" />
                    {saving ? 'Saving Changes...' : 'Save Changes'}
                  </button>

                  <button
                    type="button"
                    onClick={handleCancel}
                    className="w-full inline-flex items-center justify-center px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <FiX className="mr-2" />
                    Cancel
                  </button>

                  <Link
                    to={`/product-management/view/${id}`}
                    className="block w-full text-center px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    View Product
                  </Link>
                </div>
              </div>

              {/* Form Status Card */}
              <div className={`rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center">
                    <FiAlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mr-2" />
                    <h3 className="text-lg font-medium">Form Status</h3>
                  </div>
                </div>
                <div className="p-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Required Fields
                    </span>
                    <span className={`text-sm font-medium ${
                      formData.name && formData.category && formData.price > 0
                        ? 'text-green-600 dark:text-green-400'
                        : 'text-red-600 dark:text-red-400'
                    }`}>
                      {formData.name && formData.category && formData.price > 0 ? 'Complete' : 'Incomplete'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Images
                    </span>
                    <span className={`text-sm font-medium ${
                      totalImages > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                    }`}>
                      {totalImages} / 10
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Stock Level
                    </span>
                    <span className={`text-sm font-medium ${
                      formData.stock > 50 
                        ? 'text-green-600 dark:text-green-400'
                        : formData.stock > 10
                        ? 'text-yellow-600 dark:text-yellow-400'
                        : 'text-red-600 dark:text-red-400'
                    }`}>
                      {formData.stock <= 10 ? 'Low' : formData.stock <= 50 ? 'Medium' : 'Good'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductManagementEdit;