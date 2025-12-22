import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  FiArrowLeft, FiEdit2, FiTrash2, FiCheckCircle, 
  FiXCircle, FiStar, FiCalendar, FiUser, 
  FiCode, FiImage, FiFileText, FiClock
} from 'react-icons/fi';
import { useDarkMode } from '@/contexts/DarkModeContext';
import { categoryService, Category } from '@/services/categoryService';
import Loading from '@/components/Loading';

const CategoryManagementView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { darkMode } = useDarkMode();
  const navigate = useNavigate();
  
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isActive, setIsActive] = useState(true);

  // Fetch category data
  useEffect(() => {
    const fetchCategory = async () => {
      if (!id) return;

      try {
        setLoading(true);
        setError(null);
        const data = await categoryService.getCategoryById(id);
        setCategory(data);
        setIsActive(data.categoryStatus === 'active');
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to fetch category');
        console.error('Error fetching category:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, [id]);

  // Handle status toggle
  const handleStatusToggle = async () => {
    if (!category) return;

    try {
      const newStatus = isActive ? 'inactive' : 'active';
      await categoryService.updateCategoryStatus(category._id, newStatus);
      setIsActive(!isActive);
      setCategory(prev => prev ? { ...prev, categoryStatus: newStatus } : null);
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to update status');
    }
  };

  // Handle delete category
  const handleDelete = async () => {
    if (!category) return;

    if (window.confirm('Are you sure you want to delete this category? This action cannot be undone.')) {
      try {
        await categoryService.deleteCategory(category._id);
        navigate('/category-management-list');
      } catch (err: any) {
        alert(err.response?.data?.message || 'Failed to delete category');
      }
    }
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Format time
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return <Loading message="Loading category details..." />;
  }

  if (error) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="text-center">
          <div className="text-4xl mb-4">❌</div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Error</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-4">{error}</p>
          <Link
            to="/category-management-list"
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <FiArrowLeft />
            Back to Categories
          </Link>
        </div>
      </div>
    );
  }

  if (!category) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <div className="text-center">
          <div className="text-4xl mb-4">📁</div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Category Not Found</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-4">The requested category could not be found.</p>
          <Link
            to="/category-management-list"
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <FiArrowLeft />
            Back to Categories
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <div className="container mx-auto px-4 py-6">
        {/* Header with Breadcrumb */}
        <div className="mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
            <div>
              <h1 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                Category Details
              </h1>
              <nav className="flex items-center text-sm">
                <Link
                  to="/dashboard"
                  className={`hover:text-blue-600 dark:hover:text-blue-400 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}
                >
                  Dashboard
                </Link>
                <span className="mx-2">/</span>
                <Link
                  to="/category-management-list"
                  className={`hover:text-blue-600 dark:hover:text-blue-400 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}
                >
                  Categories
                </Link>
                <span className="mx-2">/</span>
                <span className={`${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>
                  {category.categoryName}
                </span>
              </nav>
            </div>

            <div className="flex items-center gap-2">
              <Link
                to="/category-management-list"
                className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <FiArrowLeft />
                Back
              </Link>
              <Link
                to={`/category-management/edit/${category._id}`}
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <FiEdit2 />
                Edit
              </Link>
            </div>
          </div>
        </div>

        {/* Category Header Card */}
        <div className={`rounded-lg shadow mb-6 overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="p-6">
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              {/* Category Image */}
              <div className="flex-shrink-0">
                <div className="relative">
                  <img
                    src={category.categoryImage}
                    alt={category.categoryName}
                    className="w-32 h-32 md:w-40 md:h-40 rounded-lg object-cover shadow-lg"
                  />
                  {category.isDefault && (
                    <div className="absolute -top-2 -right-2">
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded-full text-sm font-medium">
                        <FiStar size={14} />
                        Default
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Category Info */}
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                  <div>
                    <h2 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {category.categoryName}
                    </h2>
                    <div className="flex items-center gap-3">
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${
                        category.categoryStatus === 'active'
                          ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                          : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                      }`}>
                        {category.categoryStatus === 'active' ? (
                          <>
                            <FiCheckCircle size={14} />
                            Active
                          </>
                        ) : (
                          <>
                            <FiXCircle size={14} />
                            Inactive
                          </>
                        )}
                      </span>
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${
                        darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-800'
                      }`}>
                        <FiCode size={14} />
                        {category.code}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleStatusToggle}
                      className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                        isActive
                          ? 'bg-red-600 text-white hover:bg-red-700'
                          : 'bg-green-600 text-white hover:bg-green-700'
                      }`}
                    >
                      {isActive ? (
                        <>
                          <FiXCircle />
                          Deactivate
                        </>
                      ) : (
                        <>
                          <FiCheckCircle />
                          Activate
                        </>
                      )}
                    </button>
                    <button
                      onClick={handleDelete}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                      <FiTrash2 />
                      Delete
                    </button>
                  </div>
                </div>

                {/* Description */}
                <div className={`mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  <p className="text-lg">{category.categoryDescription}</p>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className={`flex items-center gap-3 p-3 rounded-lg ${
                    darkMode ? 'bg-gray-700' : 'bg-gray-50'
                  }`}>
                    <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                      <FiUser className="text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Created By</p>
                      <p className="font-medium">{category.createdBy.email}</p>
                    </div>
                  </div>

                  <div className={`flex items-center gap-3 p-3 rounded-lg ${
                    darkMode ? 'bg-gray-700' : 'bg-gray-50'
                  }`}>
                    <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                      <FiCalendar className="text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Created Date</p>
                      <p className="font-medium">{formatDate(category.createdDate)}</p>
                    </div>
                  </div>

                  <div className={`flex items-center gap-3 p-3 rounded-lg ${
                    darkMode ? 'bg-gray-700' : 'bg-gray-50'
                  }`}>
                    <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                      <FiClock className="text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Last Updated</p>
                      <p className="font-medium">{formatDate(category.updatedAt)}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Basic Information */}
          <div className={`rounded-lg shadow ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className={`px-6 py-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <h3 className={`text-lg font-semibold flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                <FiFileText className="text-blue-600 dark:text-blue-400" />
                Basic Information
              </h3>
            </div>
            <div className="p-6 space-y-4">
              <InfoRow 
                label="Category Name" 
                value={category.categoryName}
                darkMode={darkMode}
              />
              <InfoRow 
                label="Category Code" 
                value={category.code}
                darkMode={darkMode}
              />
              <InfoRow 
                label="Status" 
                value={
                  <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                    category.categoryStatus === 'active'
                      ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200'
                      : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
                  }`}>
                    {category.categoryStatus === 'active' ? 'Active' : 'Inactive'}
                  </span>
                }
                darkMode={darkMode}
              />
              <InfoRow 
                label="Default Category" 
                value={
                  category.isDefault ? (
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded-full text-xs font-medium">
                      <FiStar size={12} />
                      Yes
                    </span>
                  ) : 'No'
                }
                darkMode={darkMode}
              />
            </div>
          </div>

          {/* Image Information */}
          <div className={`rounded-lg shadow ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className={`px-6 py-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <h3 className={`text-lg font-semibold flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                <FiImage className="text-purple-600 dark:text-purple-400" />
                Image Details
              </h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="aspect-square rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                  <img
                    src={category.categoryImage}
                    alt={category.categoryName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <a
                  href={category.categoryImage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    darkMode 
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <FiImage />
                  View Full Image
                </a>
              </div>
            </div>
          </div>

          {/* System Information */}
          <div className={`rounded-lg shadow ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className={`px-6 py-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
              <h3 className={`text-lg font-semibold flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                <FiCalendar className="text-green-600 dark:text-green-400" />
                System Information
              </h3>
            </div>
            <div className="p-6 space-y-4">
              <InfoRow 
                label="Created Date" 
                value={formatDate(category.createdDate)}
                darkMode={darkMode}
              />
              <InfoRow 
                label="Created Time" 
                value={formatTime(category.createdDate)}
                darkMode={darkMode}
              />
              <InfoRow 
                label="Last Updated" 
                value={formatDate(category.updatedAt)}
                darkMode={darkMode}
              />
              <InfoRow 
                label="Created By" 
                value={
                  <div>
                    <p className="font-medium">{category.createdBy.email}</p>
                    <p className="text-sm opacity-75">Role: {category.createdBy.role}</p>
                  </div>
                }
                darkMode={darkMode}
              />
              <InfoRow 
                label="Database ID" 
                value={<code className="text-xs">{category._id}</code>}
                darkMode={darkMode}
              />
            </div>
          </div>
        </div>

        {/* Description Section */}
        <div className={`mt-6 rounded-lg shadow ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div className={`px-6 py-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <h3 className={`text-lg font-semibold flex items-center gap-2 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              <FiFileText className="text-blue-600 dark:text-blue-400" />
              Category Description
            </h3>
          </div>
          <div className="p-6">
            <div className={`prose max-w-none ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              <p className="text-lg leading-relaxed">{category.categoryDescription}</p>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-end">
          <Link
            to="/category-management-list"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-center"
          >
            <FiArrowLeft />
            Back to List
          </Link>
          <Link
            to={`/category-management/edit/${category._id}`}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-center"
          >
            <FiEdit2 />
            Edit Category
          </Link>
          <button
            onClick={handleDelete}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <FiTrash2 />
            Delete Category
          </button>
        </div>
      </div>
    </div>
  );
};

// InfoRow Component
const InfoRow: React.FC<{
  label: string;
  value: React.ReactNode;
  darkMode: boolean;
}> = ({ label, value, darkMode }) => (
  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
    <span className={`text-sm font-medium w-40 flex-shrink-0 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
      {label}
    </span>
    <div className={`flex-1 ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>
      {value}
    </div>
  </div>
);

export default CategoryManagementView;