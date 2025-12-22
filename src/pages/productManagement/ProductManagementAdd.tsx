import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FiUpload, FiX, FiPackage } from "react-icons/fi";
import { useDarkMode } from "@/contexts/DarkModeContext";
import { productService, CategoryDropdown } from "@/services/productServices";

function ProductManagementAdd() {
  const { darkMode } = useDarkMode();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    stock: 50,
    price: 0,
    discount: 0,
    category: "",
    productStatus: "active" as "active" | "inactive",
  });

  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [categories, setCategories] = useState<CategoryDropdown[]>([]);
  const [loading, setLoading] = useState(false);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Fetch categories on component mount
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setCategoriesLoading(true);
      const categoriesData = await productService.getCategoriesForDropdown();
      setCategories(categoriesData);
    } catch (err: any) {
      setError("Failed to load categories");
      console.error("Error fetching categories:", err);
    } finally {
      setCategoriesLoading(false);
    }
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === "number") {
      setFormData(prev => ({
        ...prev,
        [name]: value === "" ? 0 : parseFloat(value)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }

    // Clear error for this field
    if (formErrors[name]) {
      setFormErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newImages: File[] = [];
    const newPreviews: string[] = [];

    Array.from(files).forEach(file => {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setError(`File ${file.name} is not an image`);
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError(`File ${file.name} is too large (max 5MB)`);
        return;
      }

      newImages.push(file);
      const preview = URL.createObjectURL(file);
      newPreviews.push(preview);
    });

    // Limit to 5 images
    if (images.length + newImages.length > 5) {
      setError("Maximum 5 images allowed");
      return;
    }

    setImages(prev => [...prev, ...newImages]);
    setImagePreviews(prev => [...prev, ...newPreviews]);
    setError(null);
  };

  // Remove image
  const removeImage = (index: number) => {
    const newImages = [...images];
    const newPreviews = [...imagePreviews];
    
    // Revoke object URL to prevent memory leak
    URL.revokeObjectURL(newPreviews[index]);
    
    newImages.splice(index, 1);
    newPreviews.splice(index, 1);
    
    setImages(newImages);
    setImagePreviews(newPreviews);
  };

  // Validate form
  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!formData.name.trim()) {
      errors.name = "Product name is required";
    }

    if (!formData.description.trim()) {
      errors.description = "Description is required";
    }

    if (formData.stock < 0) {
      errors.stock = "Stock cannot be negative";
    }

    if (formData.price <= 0) {
      errors.price = "Price must be greater than 0";
    }

    if (formData.discount < 0 || formData.discount > 100) {
      errors.discount = "Discount must be between 0 and 100";
    }

    if (!formData.category) {
      errors.category = "Category is required";
    }

    if (images.length === 0) {
      errors.images = "At least one product image is required";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("stock", formData.stock.toString());
      formDataToSend.append("price", formData.price.toString());
      formDataToSend.append("discount", formData.discount.toString());
      formDataToSend.append("category", formData.category);
      formDataToSend.append("productStatus", formData.productStatus);

      // Append all images
      images.forEach((image) => {
        formDataToSend.append("productImages", image);
      });

      // Create product
      const createdProduct = await productService.createProduct(formDataToSend);
      
      setSuccess(`Product "${createdProduct.name}" created successfully!`);
      
      // Reset form after successful submission
      setTimeout(() => {
        navigate("/product-management-list");
      }, 2000);

    } catch (err: any) {
      const errorMessage = err.response?.data?.message || "Failed to create product";
      setError(errorMessage);
      console.error("Error creating product:", err);
    } finally {
      setLoading(false);
    }
  };

  // Handle cancel
  const handleCancel = () => {
    if (window.confirm("Are you sure you want to cancel? All unsaved changes will be lost.")) {
      navigate("/product-management-list");
    }
  };

  // Clean up image previews on unmount
  useEffect(() => {
    return () => {
      imagePreviews.forEach(preview => URL.revokeObjectURL(preview));
    };
  }, [imagePreviews]);

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className={`mb-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold mb-2">Add New Product</h1>
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <span>Dashboard</span>
                <span className="mx-2">/</span>
                <span>Product Management</span>
                <span className="mx-2">/</span>
                <span className="text-gray-400 dark:text-gray-500">Add Product</span>
              </div>
            </div>
            <button
              onClick={() => navigate("/product-management-list")}
              className={`px-4 py-2 rounded-lg ${darkMode ? 'bg-gray-700 hover:bg-gray-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'}`}
            >
              Back to List
            </button>
          </div>
        </div>

        {/* Error and Success Messages */}
        {error && (
          <div className="mb-6 p-4 bg-red-100 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <p className="text-red-600 dark:text-red-400">{error}</p>
          </div>
        )}

        {success && (
          <div className="mb-6 p-4 bg-green-100 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
            <p className="text-green-600 dark:text-green-400">{success}</p>
          </div>
        )}

        {/* Main Form */}
        <form onSubmit={handleSubmit}>
          <div className={`rounded-lg shadow ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            {/* Basic Information Section */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className={`text-lg font-semibold mb-6 flex items-center ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                <span className="w-2 h-6 bg-blue-500 rounded-full mr-3"></span>
                Basic Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Product Name */}
                <div>
                  <label className={`block text-sm font-medium mb-1.5 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Product Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter product name"
                    className={`w-full px-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      formErrors.name 
                        ? 'border-red-500 focus:ring-red-500' 
                        : 'border-gray-300 dark:border-gray-600 focus:border-transparent'
                    } ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'}`}
                  />
                  {formErrors.name && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>
                  )}
                </div>

                {/* Category */}
                <div>
                  <label className={`block text-sm font-medium mb-1.5 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Category <span className="text-red-500">*</span>
                  </label>
                  {categoriesLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
                      <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Loading categories...</span>
                    </div>
                  ) : (
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        formErrors.category 
                          ? 'border-red-500 focus:ring-red-500' 
                          : 'border-gray-300 dark:border-gray-600 focus:border-transparent'
                      } ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'}`}
                    >
                      <option value="">Select Category</option>
                      {categories.map(category => (
                        <option key={category._id} value={category._id}>
                          {category.categoryName} ({category.code})
                        </option>
                      ))}
                    </select>
                  )}
                  {formErrors.category && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.category}</p>
                  )}
                </div>

                {/* Description */}
                <div className="md:col-span-2">
                  <label className={`block text-sm font-medium mb-1.5 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Enter product description"
                    rows={3}
                    className={`w-full px-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      formErrors.description 
                        ? 'border-red-500 focus:ring-red-500' 
                        : 'border-gray-300 dark:border-gray-600 focus:border-transparent'
                    } ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'}`}
                  />
                  {formErrors.description && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.description}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Pricing & Stock Section */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className={`text-lg font-semibold mb-6 flex items-center ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                <span className="w-2 h-6 bg-green-500 rounded-full mr-3"></span>
                Pricing & Stock
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {/* Stock */}
                <div>
                  <label className={`block text-sm font-medium mb-1.5 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Stock Quantity
                  </label>
                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleInputChange}
                    min="0"
                    className={`w-full px-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      formErrors.stock 
                        ? 'border-red-500 focus:ring-red-500' 
                        : 'border-gray-300 dark:border-gray-600 focus:border-transparent'
                    } ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'}`}
                  />
                  {formErrors.stock && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.stock}</p>
                  )}
                </div>

                {/* Price */}
                <div>
                  <label className={`block text-sm font-medium mb-1.5 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Price (₹) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    min="0"
                    step="0.01"
                    placeholder="0.00"
                    className={`w-full px-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      formErrors.price 
                        ? 'border-red-500 focus:ring-red-500' 
                        : 'border-gray-300 dark:border-gray-600 focus:border-transparent'
                    } ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'}`}
                  />
                  {formErrors.price && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.price}</p>
                  )}
                </div>

                {/* Discount */}
                <div>
                  <label className={`block text-sm font-medium mb-1.5 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Discount (%)
                  </label>
                  <input
                    type="number"
                    name="discount"
                    value={formData.discount}
                    onChange={handleInputChange}
                    min="0"
                    max="100"
                    placeholder="0"
                    className={`w-full px-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      formErrors.discount 
                        ? 'border-red-500 focus:ring-red-500' 
                        : 'border-gray-300 dark:border-gray-600 focus:border-transparent'
                    } ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'}`}
                  />
                  {formErrors.discount && (
                    <p className="text-red-500 text-sm mt-1">{formErrors.discount}</p>
                  )}
                </div>

                {/* Status */}
                <div>
                  <label className={`block text-sm font-medium mb-1.5 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Status
                  </label>
                  <select
                    name="productStatus"
                    value={formData.productStatus}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300 dark:border-gray-600 focus:border-transparent ${
                      darkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'
                    }`}
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Product Images Section */}
            <div className="p-6">
              <h3 className={`text-lg font-semibold mb-6 flex items-center ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                <span className="w-2 h-6 bg-purple-500 rounded-full mr-3"></span>
                Product Images <span className="text-red-500">*</span>
                <span className={`text-sm font-normal ml-3 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  (Max 5 images, 5MB each)
                </span>
              </h3>

              {formErrors.images && (
                <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                  <p className="text-red-500 dark:text-red-400">{formErrors.images}</p>
                </div>
              )}

              {/* Image Upload Area */}
              <div className="mb-6">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  accept="image/*"
                  multiple
                  className="hidden"
                />
                
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                    darkMode 
                      ? 'border-gray-600 hover:border-gray-500 bg-gray-800/50 hover:bg-gray-800' 
                      : 'border-gray-300 hover:border-gray-400 bg-gray-50 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex flex-col items-center justify-center">
                    <FiUpload className={`h-12 w-12 mb-3 ${darkMode ? 'text-gray-400' : 'text-gray-400'}`} />
                    <p className={`text-lg font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Click to upload images
                    </p>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      PNG, JPG, GIF up to 5MB
                    </p>
                    <button
                      type="button"
                      className={`mt-4 px-4 py-2 rounded-lg flex items-center gap-2 ${
                        darkMode 
                          ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                          : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        fileInputRef.current?.click();
                      }}
                    >
                      <FiUpload />
                      Browse Files
                    </button>
                  </div>
                </div>
              </div>

              {/* Image Previews */}
              {imagePreviews.length > 0 && (
                <div>
                  <h4 className={`text-sm font-medium mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Selected Images ({images.length}/5)
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {imagePreviews.map((preview, index) => (
                      <div key={index} className="relative group">
                        <div className="aspect-square rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                          <img
                            src={preview}
                            alt={`Product preview ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <FiX size={16} />
                        </button>
                        <div className="mt-2 text-xs text-center text-gray-500 dark:text-gray-400">
                          {images[index]?.name}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Form Actions */}
          <div className="mt-6 flex justify-end space-x-4">
            <button
              type="button"
              onClick={handleCancel}
              disabled={loading}
              className={`px-6 py-3 rounded-lg font-medium ${
                darkMode 
                  ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || categoriesLoading}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Creating Product...
                </>
              ) : (
                <>
                  <FiPackage />
                  Create Product
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProductManagementAdd;