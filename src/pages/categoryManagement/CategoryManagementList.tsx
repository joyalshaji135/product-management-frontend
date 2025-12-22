// src/pages/categoryManagement/CategoryManagementList.tsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiEye, FiEdit2, FiTrash2, FiPlus, FiSearch, FiDownload } from "react-icons/fi";
import { useDarkMode } from "@/contexts/DarkModeContext";
import { categoryService, Category, CategoryFilters } from "@/services/categoryService";
import Loading from "@/components/Loading";

const CategoryManagementList: React.FC = () => {
  const { darkMode } = useDarkMode();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<CategoryFilters>({
    page: 1,
    limit: 10,
    search: "",
    status: undefined,
    sortBy: "createdAt",
    sortOrder: "desc",
  });
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    totalRecords: 0,
    totalPages: 0,
  });
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // Fetch categories
  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await categoryService.getAllCategories(filters);
      setCategories(response.data.data);
      setPagination({
        page: response.data.page,
        limit: response.data.limit,
        totalRecords: response.data.totalRecords,
        totalPages: response.data.totalPages,
      });
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch categories");
      console.error("Error fetching categories:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [filters]);

  // Handle search
  const handleSearch = () => {
    setFilters(prev => ({
      ...prev,
      search: searchQuery,
      page: 1, // Reset to first page on new search
    }));
  };

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    if (e.target.value === "") {
      setFilters(prev => ({
        ...prev,
        search: "",
        page: 1,
      }));
    }
  };

  // Handle search on Enter key
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // Handle filter change
  const handleFilterChange = (key: keyof CategoryFilters, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
      page: 1, // Reset to first page on filter change
    }));
  };

  // Handle page change
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      setFilters(prev => ({ ...prev, page: newPage }));
    }
  };

  // Handle category selection
  const handleSelectCategory = (categoryId: string) => {
    setSelectedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  // Handle select all
  const handleSelectAll = () => {
    if (selectedCategories.length === categories.length) {
      setSelectedCategories([]);
    } else {
      setSelectedCategories(categories.map(category => category._id));
    }
  };

  // Handle delete category
  const handleDeleteCategory = async (categoryId: string) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await categoryService.deleteCategory(categoryId);
        fetchCategories(); // Refresh list
        setSelectedCategories(prev => prev.filter(id => id !== categoryId));
      } catch (err: any) {
        alert(err.response?.data?.message || "Failed to delete category");
      }
    }
  };

  // Handle status change
  const handleStatusChange = async (categoryId: string, currentStatus: 'active' | 'inactive') => {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    try {
      await categoryService.updateCategoryStatus(categoryId, newStatus);
      fetchCategories(); // Refresh list
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to update status");
    }
  };

  // Handle export
  const handleExport = () => {
    // Implement export functionality
    console.log("Exporting categories:", selectedCategories);
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className={`mb-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
          <h1 className="text-2xl font-bold mb-2">Category Management</h1>
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <Link to="/dashboard" className="hover:text-blue-600 dark:hover:text-blue-400">
              Dashboard
            </Link>
            <span className="mx-2">/</span>
            <Link to="/category-management-list" className="hover:text-blue-600 dark:hover:text-blue-400">
              Category Management
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-400 dark:text-gray-500">List</span>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className={`rounded-lg p-4 shadow ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Total Categories</p>
                <p className="text-2xl font-bold mt-1">{pagination.totalRecords}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                <span className="text-blue-600 dark:text-blue-400 text-lg">📁</span>
              </div>
            </div>
          </div>

          <div className={`rounded-lg p-4 shadow ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Active</p>
                <p className="text-2xl font-bold mt-1 text-green-600 dark:text-green-400">
                  {categories.filter(c => c.categoryStatus === 'active').length}
                </p>
              </div>
              <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                <span className="text-green-600 dark:text-green-400 text-lg">✓</span>
              </div>
            </div>
          </div>

          <div className={`rounded-lg p-4 shadow ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Inactive</p>
                <p className="text-2xl font-bold mt-1 text-red-600 dark:text-red-400">
                  {categories.filter(c => c.categoryStatus === 'inactive').length}
                </p>
              </div>
              <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900 flex items-center justify-center">
                <span className="text-red-600 dark:text-red-400 text-lg">✗</span>
              </div>
            </div>
          </div>

          <div className={`rounded-lg p-4 shadow ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Default</p>
                <p className="text-2xl font-bold mt-1 text-purple-600 dark:text-purple-400">
                  {categories.filter(c => c.isDefault).length}
                </p>
              </div>
              <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                <span className="text-purple-600 dark:text-purple-400 text-lg">⭐</span>
              </div>
            </div>
          </div>
        </div>

        {/* Toolbar */}
        <div className={`rounded-lg p-4 shadow mb-6 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className={`h-5 w-5 ${darkMode ? 'text-gray-400' : 'text-gray-400'}`} />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                onKeyPress={handleKeyPress}
                placeholder="Search categories..."
                className={`block w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                    : 'border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
              />
            </div>

            {/* Filters and Actions */}
            <div className="flex items-center gap-2">
              {/* Status Filter */}
              <select
                value={filters.status || ''}
                onChange={(e) => handleFilterChange('status', e.target.value || undefined)}
                className={`px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'border-gray-300 text-gray-900'
                }`}
              >
                <option value="">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>

              {/* Sort By */}
              <select
                value={filters.sortBy}
                onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                className={`px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'border-gray-300 text-gray-900'
                }`}
              >
                <option value="createdAt">Date Created</option>
                <option value="categoryName">Name</option>
                <option value="code">Code</option>
              </select>

              {/* Export Button */}
              {selectedCategories.length > 0 && (
                <button
                  onClick={handleExport}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <FiDownload />
                  Export ({selectedCategories.length})
                </button>
              )}

              {/* Add New Button */}
              <Link
                to="/category-management"
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <FiPlus />
                Add Category
              </Link>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-100 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <p className="text-red-600 dark:text-red-400">{error}</p>
          </div>
        )}

        {/* Categories Table */}
        <div className={`rounded-lg shadow overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    <input
                      type="checkbox"
                      checked={selectedCategories.length === categories.length && categories.length > 0}
                      onChange={handleSelectAll}
                      className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Category
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Code
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Description
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Created Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className={`divide-y divide-gray-200 dark:divide-gray-700 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                {categories.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <div className="w-16 h-16 mb-4 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                          <span className="text-2xl">📁</span>
                        </div>
                        <p className={`text-lg font-medium ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>
                          No categories found
                        </p>
                        <p className={`mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          {filters.search ? 'Try a different search term' : 'Get started by creating a new category'}
                        </p>
                        {!filters.search && (
                          <Link
                            to="/category-management"
                            className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                          >
                            <FiPlus />
                            Add Your First Category
                          </Link>
                        )}
                      </div>
                    </td>
                  </tr>
                ) : (
                  categories.map((category) => (
                    <tr key={category._id} className={`hover:${darkMode ? 'bg-gray-700' : 'bg-gray-50'} transition-colors`}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(category._id)}
                          onChange={() => handleSelectCategory(category._id)}
                          className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0">
                            <img
                              className="h-10 w-10 rounded-lg object-cover"
                              src={category.categoryImage}
                              alt={category.categoryName}
                            />
                          </div>
                          <div className="ml-4">
                            <div className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                              {category.categoryName}
                            </div>
                            {category.isDefault && (
                              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                                Default
                              </span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>
                          {category.code}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-900'} line-clamp-2 max-w-xs`}>
                          {category.categoryDescription}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => handleStatusChange(category._id, category.categoryStatus)}
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                            category.categoryStatus === 'active'
                              ? 'bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900 dark:text-green-200 dark:hover:bg-green-800'
                              : 'bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-900 dark:text-red-200 dark:hover:bg-red-800'
                          }`}
                        >
                          {category.categoryStatus === 'active' ? 'Active' : 'Inactive'}
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>
                          {new Date(category.createdDate).toLocaleDateString()}
                        </div>
                        <div className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                          {new Date(category.createdDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center gap-2">
                          <Link
                            to={`/category-management/view/${category._id}`}
                            className="p-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20"
                            title="View"
                          >
                            <FiEye size={18} />
                          </Link>
                          <Link
                            to={`/category-management/edit/${category._id}`}
                            className="p-2 text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300 rounded-lg hover:bg-green-50 dark:hover:bg-green-900/20"
                            title="Edit"
                          >
                            <FiEdit2 size={18} />
                          </Link>
                          <button
                            onClick={() => handleDeleteCategory(category._id)}
                            className="p-2 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20"
                            title="Delete"
                          >
                            <FiTrash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {categories.length > 0 && (
            <div className={`px-6 py-4 border-t ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'}`}>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                  Showing {((pagination.page - 1) * pagination.limit) + 1} to{' '}
                  {Math.min(pagination.page * pagination.limit, pagination.totalRecords)} of{' '}
                  {pagination.totalRecords} categories
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handlePageChange(pagination.page - 1)}
                    disabled={pagination.page === 1}
                    className={`px-3 py-1 rounded-lg ${
                      pagination.page === 1
                        ? 'opacity-50 cursor-not-allowed'
                        : 'hover:bg-gray-200 dark:hover:bg-gray-700'
                    } ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
                  >
                    Previous
                  </button>
                  {[...Array(Math.min(5, pagination.totalPages))].map((_, i) => {
                    const pageNumber = i + 1;
                    return (
                      <button
                        key={pageNumber}
                        onClick={() => handlePageChange(pageNumber)}
                        className={`w-8 h-8 rounded-lg ${
                          pagination.page === pageNumber
                            ? 'bg-blue-600 text-white'
                            : 'hover:bg-gray-200 dark:hover:bg-gray-700'
                        } ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
                      >
                        {pageNumber}
                      </button>
                    );
                  })}
                  {pagination.totalPages > 5 && (
                    <span className={`px-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>...</span>
                  )}
                  <button
                    onClick={() => handlePageChange(pagination.page + 1)}
                    disabled={pagination.page === pagination.totalPages}
                    className={`px-3 py-1 rounded-lg ${
                      pagination.page === pagination.totalPages
                        ? 'opacity-50 cursor-not-allowed'
                        : 'hover:bg-gray-200 dark:hover:bg-gray-700'
                    } ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryManagementList;