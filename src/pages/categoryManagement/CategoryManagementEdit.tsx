import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  FiArrowLeft, FiSave, FiUpload, FiImage, 
  FiFileText, FiCheckCircle, FiXCircle,
  FiEye, FiEyeOff, FiTrash2
} from 'react-icons/fi';
import { useDarkMode } from '@/contexts/DarkModeContext';
import { categoryService } from '@/services/categoryService';
import Loading from '@/components/Loading';

const CategoryManagementEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { darkMode } = useDarkMode();
  const navigate = useNavigate();
  
  // Form state
  const [formData, setFormData] = useState({
    categoryName: '',
    code: '',
    categoryDescription: '',
    categoryImage: null as File | null,
    existingImage: '',
    categoryStatus: 'active' as 'active' | 'inactive',
    isDefault: false,
  });

  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPreview, setShowPreview] = useState(false);

  // Fetch category data
  useEffect(() => {
    const fetchCategory = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const data = await categoryService.getCategoryById(id);
        
        setFormData({
          categoryName: data.categoryName,
          code: data.code,
          categoryDescription: data.categoryDescription,
          categoryImage: null,
          existingImage: data.categoryImage,
          categoryStatus: data.categoryStatus,
          isDefault: data.isDefault,
        });
        
        setPreviewImage(data.categoryImage);
      } catch (err: any) {
        setErrors({ submit: err.response?.data?.message || 'Failed to fetch category' });
        console.error('Error fetching category:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, [id]);

  // Handle form input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' 
        ? (e.target as HTMLInputElement).checked 
        : value
    }));

    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // Handle image upload
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        setErrors(prev => ({
          ...prev,
          categoryImage: 'Please upload a valid image file (JPEG, PNG, GIF, WebP)'
        }));
        return;
      }

      // Validate file size (max 5MB)
      const maxSize = 5 * 1024 * 1024; // 5MB in bytes
      if (file.size > maxSize) {
        setErrors(prev => ({
          ...prev,
          categoryImage: 'Image size should be less than 5MB'
        }));
        return;
      }

      setFormData(prev => ({ 
        ...prev, 
        categoryImage: file,
        existingImage: '' // Clear existing image when new one is uploaded
      }));
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);

      // Clear image error
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.categoryImage;
        return newErrors;
      });
    }
  };

  // Remove selected image
  const handleRemoveImage = () => {
    setFormData(prev => ({ 
      ...prev, 
      categoryImage: null,
      existingImage: '' 
    }));
    setPreviewImage(null);
  };

  // Restore original image
  const handleRestoreImage = () => {
    setFormData(prev => ({ 
      ...prev, 
      categoryImage: null 
    }));
    setPreviewImage(formData.existingImage);
  };

  // Validate form
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.categoryName.trim()) {
      newErrors.categoryName = 'Category name is required';
    } else if (formData.categoryName.length < 3) {
      newErrors.categoryName = 'Category name must be at least 3 characters';
    } else if (formData.categoryName.length > 100) {
      newErrors.categoryName = 'Category name must be less than 100 characters';
    }

    if (!formData.code.trim()) {
      newErrors.code = 'Category code is required';
    } else if (!/^[A-Z0-9]+$/.test(formData.code)) {
      newErrors.code = 'Code must contain only uppercase letters and numbers';
    } else if (formData.code.length < 3) {
      newErrors.code = 'Code must be at least 3 characters';
    }

    if (!formData.categoryDescription.trim()) {
      newErrors.categoryDescription = 'Description is required';
    } else if (formData.categoryDescription.length < 10) {
      newErrors.categoryDescription = 'Description must be at least 10 characters';
    } else if (formData.categoryDescription.length > 500) {
      newErrors.categoryDescription = 'Description must be less than 500 characters';
    }

    // Image is optional for edit (can keep existing)
    if (formData.categoryImage) {
      const maxSize = 5 * 1024 * 1024;
      
      if (formData.categoryImage.size > maxSize) {
        newErrors.categoryImage = 'Image size should be less than 5MB';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm() || !id) {
      return;
    }

    try {
      setSaving(true);

      // Create FormData for file upload
      const formDataToSend = new FormData();
      formDataToSend.append('categoryName', formData.categoryName);
      formDataToSend.append('code', formData.code);
      formDataToSend.append('categoryDescription', formData.categoryDescription);
      formDataToSend.append('categoryStatus', formData.categoryStatus);
      formDataToSend.append('isDefault', formData.isDefault.toString());
      
      if (formData.categoryImage) {
        formDataToSend.append('categoryImage', formData.categoryImage);
      }

      // API call to update category
      await categoryService.updateCategory(id, formDataToSend);
      
      // Success - navigate to view page
      navigate(`/category-management/view/${id}`, {
        state: { message: 'Category updated successfully!' }
      });

    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Failed to update category';
      
      // Handle specific error cases
      if (errorMessage.includes('code') && errorMessage.includes('unique')) {
        setErrors(prev => ({
          ...prev,
          code: 'This category code already exists. Please use a different code.'
        }));
      } else {
        setErrors(prev => ({
          ...prev,
          submit: errorMessage
        }));
      }
      
      console.error('Error updating category:', err);
    } finally {
      setSaving(false);
    }
  };

  // Handle delete category
  const handleDelete = async () => {
    if (!id || !window.confirm('Are you sure you want to delete this category? This action cannot be undone.')) {
      return;
    }

    try {
      await categoryService.deleteCategory(id);
      navigate('/category-management-list', {
        state: { message: 'Category deleted successfully!' }
      });
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to delete category');
    }
  };

  // Reset form to original values
  const handleReset = async () => {
    if (!id) return;

    try {
      setLoading(true);
      const data = await categoryService.getCategoryById(id);
      
      setFormData({
        categoryName: data.categoryName,
        code: data.code,
        categoryDescription: data.categoryDescription,
        categoryImage: null,
        existingImage: data.categoryImage,
        categoryStatus: data.categoryStatus,
        isDefault: data.isDefault,
      });
      
      setPreviewImage(data.categoryImage);
      setErrors({});
    } catch (err: any) {
      setErrors({ submit: 'Failed to reset form' });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading message="Loading category data..." />;
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
            <div>
              <h1 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                Edit Category
              </h1>
              <nav className="flex items-center text-sm">
                <LinkItem 
                  to="/dashboard" 
                  label="Dashboard" 
                  darkMode={darkMode} 
                />
                <span className="mx-2">/</span>
                <LinkItem 
                  to="/category-management-list" 
                  label="Categories" 
                  darkMode={darkMode} 
                />
                <span className="mx-2">/</span>
                <LinkItem 
                  to={`/category-management/view/${id}`} 
                  label="View" 
                  darkMode={darkMode} 
                />
                <span className="mx-2">/</span>
                <span className={`${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>
                  Edit
                </span>
              </nav>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => navigate(`/category-management/view/${id}`)}
                className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <FiArrowLeft />
                Back to View
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                <FiTrash2 />
                Delete
              </button>
            </div>
          </div>
        </div>

        {/* Main Form */}
        <div className="max-w-4xl mx-auto">
          {/* Error Alert */}
          {errors.submit && (
            <div className="mb-6 p-4 bg-red-100 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <div className="flex items-center">
                <FiXCircle className="text-red-600 dark:text-red-400 mr-3" />
                <p className="text-red-600 dark:text-red-400">{errors.submit}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Basic Information */}
              <div className="lg:col-span-2 space-y-6">
                {/* Category Card */}
                <SectionCard 
                  title="Category Information" 
                  icon={<FiFileText className="text-blue-600 dark:text-blue-400" />}
                  darkMode={darkMode}
                >
                  <div className="space-y-4">
                    <FormGroup
                      label="Category Name"
                      name="categoryName"
                      type="text"
                      value={formData.categoryName}
                      onChange={handleInputChange}
                      error={errors.categoryName}
                      placeholder="Enter category name"
                      required
                      darkMode={darkMode}
                    />

                    <FormGroup
                      label="Category Code"
                      name="code"
                      type="text"
                      value={formData.code}
                      onChange={handleInputChange}
                      error={errors.code}
                      placeholder="Enter category code"
                      required
                      info="Use only uppercase letters and numbers. Must be unique."
                      darkMode={darkMode}
                    />

                    <FormGroup
                      label="Category Description"
                      name="categoryDescription"
                      type="textarea"
                      value={formData.categoryDescription}
                      onChange={handleInputChange}
                      error={errors.categoryDescription}
                      placeholder="Describe the category in detail"
                      required
                      rows={4}
                      darkMode={darkMode}
                    />
                  </div>
                </SectionCard>

                {/* Settings Card */}
                <SectionCard 
                  title="Category Settings" 
                  icon={<FiCheckCircle className="text-green-600 dark:text-green-400" />}
                  darkMode={darkMode}
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <label className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          Category Status
                        </label>
                        <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          Set the category as active or inactive
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, categoryStatus: 'active' }))}
                          className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                            formData.categoryStatus === 'active'
                              ? 'bg-green-600 text-white'
                              : darkMode 
                                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          <FiCheckCircle />
                          Active
                        </button>
                        <button
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, categoryStatus: 'inactive' }))}
                          className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                            formData.categoryStatus === 'inactive'
                              ? 'bg-red-600 text-white'
                              : darkMode 
                                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          <FiXCircle />
                          Inactive
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="isDefault"
                        name="isDefault"
                        checked={formData.isDefault}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label 
                        htmlFor="isDefault"
                        className={`ml-2 block text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
                      >
                        Set as Default Category
                      </label>
                      <span className={`ml-2 text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        (Only one category can be default)
                      </span>
                    </div>
                  </div>
                </SectionCard>
              </div>

              {/* Right Column - Image Upload & Preview */}
              <div className="space-y-6">
                {/* Image Upload Card */}
                <SectionCard 
                  title="Category Image" 
                  icon={<FiImage className="text-purple-600 dark:text-purple-400" />}
                  darkMode={darkMode}
                >
                  <div className="space-y-4">
                    {/* Current Image */}
                    {formData.existingImage && !formData.categoryImage && (
                      <div>
                        <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          Current Image
                        </label>
                        <div className="relative">
                          <img
                            src={formData.existingImage}
                            alt="Current"
                            className="w-full h-48 object-cover rounded-lg mb-2"
                          />
                          <button
                            type="button"
                            onClick={() => document.getElementById('categoryImage')?.click()}
                            className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center text-white"
                          >
                            <FiUpload className="mr-2" />
                            Replace Image
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Upload New Image */}
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        {formData.existingImage ? 'Upload New Image' : 'Upload Image'}
                        {!formData.existingImage && <span className="text-red-500 ml-1">*</span>}
                      </label>
                      
                      {/* File Upload Area */}
                      <div
                        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer ${
                          errors.categoryImage
                            ? 'border-red-300 bg-red-50 dark:border-red-700 dark:bg-red-900/10'
                            : darkMode
                              ? 'border-gray-600 hover:border-gray-500 hover:bg-gray-800'
                              : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
                        }`}
                        onClick={() => document.getElementById('categoryImage')?.click()}
                      >
                        <input
                          type="file"
                          id="categoryImage"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="hidden"
                        />
                        
                        {previewImage && formData.categoryImage ? (
                          <div className="relative">
                            <img
                              src={previewImage}
                              alt="New Preview"
                              className="w-full h-48 object-cover rounded-lg mb-4"
                            />
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleRemoveImage();
                              }}
                              className="absolute top-2 right-2 p-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors"
                            >
                              <FiXCircle />
                            </button>
                          </div>
                        ) : (
                          <>
                            <FiUpload className={`mx-auto h-12 w-12 mb-3 ${
                              darkMode ? 'text-gray-400' : 'text-gray-400'
                            }`} />
                            <p className={`mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                              <span className="font-medium">Click to upload</span> or drag and drop
                            </p>
                            <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                              PNG, JPG, GIF up to 5MB
                            </p>
                            {formData.existingImage && (
                              <p className={`text-xs mt-2 ${darkMode ? 'text-gray-500' : 'text-gray-600'}`}>
                                Leave empty to keep current image
                              </p>
                            )}
                          </>
                        )}
                      </div>
                      
                      {errors.categoryImage && (
                        <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                          {errors.categoryImage}
                        </p>
                      )}
                    </div>

                    {/* Image Actions */}
                    {formData.existingImage && (
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={handleRestoreImage}
                          className={`flex-1 px-3 py-2 text-sm rounded-lg transition-colors ${
                            darkMode 
                              ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          Restore Original
                        </button>
                        <button
                          type="button"
                          onClick={() => document.getElementById('categoryImage')?.click()}
                          className={`flex-1 px-3 py-2 text-sm rounded-lg transition-colors ${
                            darkMode 
                              ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          Upload New
                        </button>
                      </div>
                    )}

                    {/* Preview Toggle */}
                    <button
                      type="button"
                      onClick={() => setShowPreview(!showPreview)}
                      className={`inline-flex items-center gap-2 w-full justify-center px-4 py-2 rounded-lg transition-colors ${
                        darkMode 
                          ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {showPreview ? (
                        <>
                          <FiEyeOff />
                          Hide Preview
                        </>
                      ) : (
                        <>
                          <FiEye />
                          Show Preview
                        </>
                      )}
                    </button>
                  </div>
                </SectionCard>

                {/* Preview Card */}
                {showPreview && (
                  <SectionCard 
                    title="Category Preview" 
                    icon={<FiEye className="text-blue-600 dark:text-blue-400" />}
                    darkMode={darkMode}
                  >
                    <div className="space-y-3">
                      {(previewImage || formData.existingImage) && (
                        <img
                          src={previewImage || formData.existingImage}
                          alt="Preview"
                          className="w-full h-40 object-cover rounded-lg"
                        />
                      )}
                      <div>
                        <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          Category Name
                        </p>
                        <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                          {formData.categoryName || 'Category Name'}
                        </p>
                      </div>
                      <div>
                        <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          Code
                        </p>
                        <p className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          {formData.code || 'CAT00000'}
                        </p>
                      </div>
                      <div>
                        <p className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          Status
                        </p>
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                          formData.categoryStatus === 'active'
                            ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                            : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                        }`}>
                          {formData.categoryStatus === 'active' ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                      {formData.isDefault && (
                        <div>
                          <span className="inline-flex items-center gap-1 px-2 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded-full text-xs font-medium">
                            <FiCheckCircle size={12} />
                            Default Category
                          </span>
                        </div>
                      )}
                    </div>
                  </SectionCard>
                )}
              </div>
            </div>

            {/* Form Actions */}
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <div className="flex flex-col sm:flex-row gap-3 justify-end">
                <button
                  type="button"
                  onClick={() => navigate(`/category-management/view/${id}`)}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Reset Changes
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {saving ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Saving...
                    </>
                  ) : (
                    <>
                      <FiSave />
                      Update Category
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// Helper Components (Same as CategoryManagementAdd)

const LinkItem: React.FC<{ 
  to: string; 
  label: string; 
  darkMode: boolean 
}> = ({ to, label, darkMode }) => (
  <a
    href={to}
    className={`hover:text-blue-600 dark:hover:text-blue-400 ${
      darkMode ? 'text-gray-400' : 'text-gray-600'
    }`}
  >
    {label}
  </a>
);

const SectionCard: React.FC<{
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  darkMode: boolean;
}> = ({ title, icon, children, darkMode }) => (
  <div className={`rounded-lg shadow ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
    <div className={`px-6 py-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
      <h3 className={`text-lg font-semibold flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
        {icon}
        {title}
      </h3>
    </div>
    <div className="p-6">
      {children}
    </div>
  </div>
);

interface FormGroupProps {
  label: string;
  name: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<any>) => void;
  error?: string;
  placeholder?: string;
  required?: boolean;
  info?: string;
  rows?: number;
  darkMode: boolean;
}

const FormGroup: React.FC<FormGroupProps> = ({
  label,
  name,
  type,
  value,
  onChange,
  error,
  placeholder,
  required,
  info,
  rows,
  darkMode,
}) => (
  <div>
    <label 
      htmlFor={name}
      className={`block text-sm font-medium mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
    >
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    
    {type === 'textarea' ? (
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        rows={rows || 3}
        placeholder={placeholder}
        className={`block w-full rounded-lg border shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
          error
            ? 'border-red-300 dark:border-red-700'
            : darkMode
              ? 'border-gray-600 bg-gray-700 text-white'
              : 'border-gray-300'
        } px-3 py-2`}
      />
    ) : (
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`block w-full rounded-lg border shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
          error
            ? 'border-red-300 dark:border-red-700'
            : darkMode
              ? 'border-gray-600 bg-gray-700 text-white'
              : 'border-gray-300'
        } px-3 py-2`}
      />
    )}
    
    {info && (
      <p className={`mt-1 text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
        {info}
      </p>
    )}
    
    {error && (
      <p className="mt-1 text-sm text-red-600 dark:text-red-400">
        {error}
      </p>
    )}
  </div>
);

export default CategoryManagementEdit;