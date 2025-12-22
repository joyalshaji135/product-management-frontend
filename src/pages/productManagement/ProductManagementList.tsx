// src/pages/productManagement/ProductManagementList.tsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiEye, FiEdit2, FiTrash2, FiPlus, FiSearch, FiDownload, FiChevronUp, FiChevronDown } from "react-icons/fi";
import { useDarkMode } from "@/contexts/DarkModeContext";
import { productService, Product, ProductFilters } from "@/services/productServices";
import Loading from "@/components/Loading";

const ProductManagementList: React.FC = () => {
  const { darkMode } = useDarkMode();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<ProductFilters>({
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
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Product | null;
    direction: 'asc' | 'desc';
  }>({ key: null, direction: 'desc' });

  // Fetch products
  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await productService.getAllProducts(filters);
      setProducts(response.data.data);
      setPagination({
        page: response.data.page,
        limit: response.data.limit,
        totalRecords: response.data.totalRecords,
        totalPages: response.data.totalPages,
      });
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to fetch products");
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [filters]);

  // Handle search
  const handleSearch = () => {
    setFilters(prev => ({
      ...prev,
      search: searchQuery,
      page: 1,
    }));
  };

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Handle search on Enter key
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // Handle filter change
  const handleFilterChange = (key: keyof ProductFilters, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
      page: 1,
    }));
  };

  // Handle sort
  const handleSort = (key: keyof Product) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    
    setSortConfig({ key, direction });
    
    // Update filters for API sorting
    setFilters(prev => ({
      ...prev,
      sortBy: key === 'createdDate' ? 'createdAt' : key, // Map createdDate to createdAt for API
      sortOrder: direction,
      page: 1,
    }));
  };

  // Get sort icon
  const getSortIcon = (key: keyof Product) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === 'asc' ? <FiChevronUp className="ml-1" /> : <FiChevronDown className="ml-1" />;
  };

  // Handle page change
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      setFilters(prev => ({ ...prev, page: newPage }));
    }
  };

  // Handle product selection
  const handleSelectProduct = (productId: string) => {
    setSelectedProducts(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  // Handle select all
  const handleSelectAll = () => {
    if (selectedProducts.length === products.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(products.map(product => product._id));
    }
  };

  // Handle delete product
  const handleDeleteProduct = async (productId: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await productService.deleteProduct(productId);
        fetchProducts(); // Refresh list
        setSelectedProducts(prev => prev.filter(id => id !== productId));
      } catch (err: any) {
        alert(err.response?.data?.message || "Failed to delete product");
      }
    }
  };

  // Handle status change
  const handleStatusChange = async (productId: string, currentStatus: 'active' | 'inactive') => {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
    try {
      await productService.updateProductStatus(productId, newStatus);
      fetchProducts(); // Refresh list
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to update status");
    }
  };

  // Handle export
  const handleExport = () => {
    console.log("Exporting products:", selectedProducts);
    // Implement export functionality
  };

  // Calculate discounted price
  const calculateDiscountedPrice = (price: number, discount: number) => {
    return price - (price * discount / 100);
  };

  // Generate pagination numbers
  const generatePaginationNumbers = () => {
    const totalPages = pagination.totalPages;
    const currentPage = pagination.page;
    const delta = 2;
    const range = [];
    const rangeWithDots = [];
    let l;

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= currentPage - delta && i <= currentPage + delta)) {
        range.push(i);
      }
    }

    for (let i of range) {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l !== 1) {
          rangeWithDots.push('...');
        }
      }
      rangeWithDots.push(i);
      l = i;
    }

    return rangeWithDots;
  };

  if (loading && products.length === 0) {
    return <Loading />;
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className={`mb-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
          <h1 className="text-2xl font-bold mb-2">Product Management</h1>
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <Link to="/dashboard" className="hover:text-blue-600 dark:hover:text-blue-400">
              Dashboard
            </Link>
            <span className="mx-2">/</span>
            <Link to="/product-management-list" className="hover:text-blue-600 dark:hover:text-blue-400">
              Product Management
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
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Total Products</p>
                <p className="text-2xl font-bold mt-1">{pagination.totalRecords}</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                <span className="text-blue-600 dark:text-blue-400 text-lg">📦</span>
              </div>
            </div>
          </div>

          <div className={`rounded-lg p-4 shadow ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Total Stock</p>
                <p className="text-2xl font-bold mt-1 text-green-600 dark:text-green-400">
                  {products.reduce((sum, product) => sum + product.stock, 0)}
                </p>
              </div>
              <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                <span className="text-green-600 dark:text-green-400 text-lg">📊</span>
              </div>
            </div>
          </div>

          <div className={`rounded-lg p-4 shadow ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Active Products</p>
                <p className="text-2xl font-bold mt-1 text-green-600 dark:text-green-400">
                  {products.filter(p => p.productStatus === 'active').length}
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
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Total Value</p>
                <p className="text-2xl font-bold mt-1 text-purple-600 dark:text-purple-400">
                  ₹{products.reduce((sum, product) => sum + (product.price * product.stock), 0).toLocaleString('en-IN')}
                </p>
              </div>
              <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                <span className="text-purple-600 dark:text-purple-400 text-lg">💰</span>
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
                placeholder="Search products by name, code, or description..."
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

              {/* Sort Order */}
              <select
                value={filters.sortOrder}
                onChange={(e) => handleFilterChange('sortOrder', e.target.value as 'asc' | 'desc')}
                className={`px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  darkMode 
                    ? 'bg-gray-700 border-gray-600 text-white' 
                    : 'border-gray-300 text-gray-900'
                }`}
              >
                <option value="desc">Newest First</option>
                <option value="asc">Oldest First</option>
              </select>

              {/* Export Button */}
              {selectedProducts.length > 0 && (
                <button
                  onClick={handleExport}
                  className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  <FiDownload />
                  Export ({selectedProducts.length})
                </button>
              )}

              {/* Add New Button */}
              <Link
                to="/product-management"
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <FiPlus />
                Add Product
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

        {/* Products Table */}
        <div className={`rounded-lg shadow overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className={`${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    <input
                      type="checkbox"
                      checked={products.length > 0 && selectedProducts.length === products.length}
                      onChange={handleSelectAll}
                      className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                  </th>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
                    onClick={() => handleSort('name')}
                  >
                    <div className="flex items-center">
                      Product
                      {getSortIcon('name')}
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Category
                  </th>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
                    onClick={() => handleSort('price')}
                  >
                    <div className="flex items-center">
                      Price
                      {getSortIcon('price')}
                    </div>
                  </th>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
                    onClick={() => handleSort('stock')}
                  >
                    <div className="flex items-center">
                      Stock
                      {getSortIcon('stock')}
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Status
                  </th>
                  <th 
                    scope="col" 
                    className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
                    onClick={() => handleSort('createdDate')}
                  >
                    <div className="flex items-center">
                      Created Date
                      {getSortIcon('createdDate')}
                    </div>
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className={`divide-y divide-gray-200 dark:divide-gray-700 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                {loading ? (
                  <tr>
                    <td colSpan={8} className="px-6 py-8 text-center">
                      <div className="flex justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                      </div>
                    </td>
                  </tr>
                ) : products.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-6 py-12 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <div className="w-16 h-16 mb-4 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                          <span className="text-2xl">📦</span>
                        </div>
                        <p className={`text-lg font-medium ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>
                          No products found
                        </p>
                        <p className={`mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          {filters.search ? 'Try a different search term' : 'Get started by adding your first product'}
                        </p>
                        {!filters.search && (
                          <Link
                            to="/product-management"
                            className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                          >
                            <FiPlus />
                            Add Your First Product
                          </Link>
                        )}
                      </div>
                    </td>
                  </tr>
                ) : (
                  products.map((product) => {
                    // Handle category object/string
                    const category = typeof product.category === 'string' 
                      ? { categoryName: 'N/A', categoryImage: '', categoryStatus: 'active' } 
                      : product.category;
                    
                    return (
                    <tr key={product._id} className={`hover:${darkMode ? 'bg-gray-700/50' : 'bg-gray-50'} transition-colors`}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="checkbox"
                          checked={selectedProducts.includes(product._id)}
                          onChange={() => handleSelectProduct(product._id)}
                          className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="h-12 w-12 flex-shrink-0">
                            {product.productImages && product.productImages.length > 0 ? (
                              <img
                                className="h-12 w-12 rounded-lg object-cover"
                                src={product.productImages[0]}
                                alt={product.name}
                                onError={(e) => {
                                  e.currentTarget.src = 'https://via.placeholder.com/48';
                                  e.currentTarget.onerror = null;
                                }}
                              />
                            ) : (
                              <div className="h-12 w-12 rounded-lg bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                                <span className="text-gray-500 dark:text-gray-400">📦</span>
                              </div>
                            )}
                          </div>
                          <div className="ml-4">
                            <div className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                              {product.name}
                            </div>
                            <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                              {product.code}
                            </div>
                            {product.isDefault && (
                              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 mt-1">
                                Default
                              </span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {category?.categoryImage ? (
                            <div className="h-8 w-8 flex-shrink-0">
                              <img
                                className="h-8 w-8 rounded-full object-cover"
                                src={category.categoryImage}
                                alt={category.categoryName}
                                onError={(e) => {
                                  e.currentTarget.src = 'https://via.placeholder.com/32';
                                  e.currentTarget.onerror = null;
                                }}
                              />
                            </div>
                          ) : (
                            <div className="h-8 w-8 flex-shrink-0 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                              <span className="text-xs text-gray-500 dark:text-gray-400">C</span>
                            </div>
                          )}
                          <div className="ml-2">
                            <div className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                              {category?.categoryName || 'N/A'}
                            </div>
                            <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                              {category?.categoryStatus === 'active' ? 'Active' : 'Inactive'}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                          ₹{calculateDiscountedPrice(product.price, product.discount).toLocaleString('en-IN')}
                        </div>
                        {product.discount > 0 && (
                          <>
                            <div className={`text-sm line-through ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                              ₹{product.price.toLocaleString('en-IN')}
                            </div>
                            <div className={`text-xs font-medium text-green-600 dark:text-green-400`}>
                              Save {product.discount}%
                            </div>
                          </>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                          {product.stock} units
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-1">
                          <div 
                            className={`h-2 rounded-full ${
                              product.stock <= 10 
                                ? 'bg-red-500' 
                                : product.stock <= 50 
                                ? 'bg-yellow-500' 
                                : 'bg-green-500'
                            }`}
                            style={{ width: `${Math.min((product.stock / 100) * 100, 100)}%` }}
                          ></div>
                        </div>
                        <div className={`text-xs mt-1 ${
                          product.stock <= 10 
                            ? 'text-red-600 dark:text-red-400' 
                            : product.stock <= 50 
                            ? 'text-yellow-600 dark:text-yellow-400' 
                            : 'text-green-600 dark:text-green-400'
                        }`}>
                          {product.stock <= 10 ? 'Low Stock' : product.stock <= 50 ? 'Medium Stock' : 'In Stock'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => handleStatusChange(product._id, product.productStatus)}
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                            product.productStatus === 'active'
                              ? 'bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900 dark:text-green-200 dark:hover:bg-green-800'
                              : 'bg-red-100 text-red-800 hover:bg-red-200 dark:bg-red-900 dark:text-red-200 dark:hover:bg-red-800'
                          }`}
                        >
                          {product.productStatus === 'active' ? 'Active' : 'Inactive'}
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-900'}`}>
                          {new Date(product.createdDate).toLocaleDateString('en-IN')}
                        </div>
                        <div className={`text-xs ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                          {new Date(product.createdDate).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center gap-2">
                          <Link
                            to={`/product-management/view/${product._id}`}
                            className="p-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
                            title="View"
                          >
                            <FiEye size={18} />
                          </Link>
                          <Link
                            to={`/product-management/edit/${product._id}`}
                            className="p-2 text-green-600 hover:text-green-800 dark:text-green-400 dark:hover:text-green-300 rounded-lg hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors"
                            title="Edit"
                          >
                            <FiEdit2 size={18} />
                          </Link>
                          <button
                            onClick={() => handleDeleteProduct(product._id)}
                            className="p-2 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                            title="Delete"
                          >
                            <FiTrash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                    )}
                  ))
                }
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {products.length > 0 && (
            <div className={`px-6 py-4 border-t ${darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-gray-50'}`}>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-700'}`}>
                  Showing {((pagination.page - 1) * pagination.limit) + 1} to{' '}
                  {Math.min(pagination.page * pagination.limit, pagination.totalRecords)} of{' '}
                  {pagination.totalRecords} products
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handlePageChange(pagination.page - 1)}
                    disabled={pagination.page === 1}
                    className={`px-3 py-1 rounded-lg transition-colors ${
                      pagination.page === 1
                        ? 'opacity-50 cursor-not-allowed bg-gray-100 dark:bg-gray-700'
                        : 'hover:bg-gray-200 dark:hover:bg-gray-700 bg-white dark:bg-gray-800'
                    } ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
                  >
                    Previous
                  </button>
                  
                  {generatePaginationNumbers().map((pageNum, index) => (
                    pageNum === '...' ? (
                      <span key={`dots-${index}`} className={`px-2 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        ...
                      </span>
                    ) : (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(Number(pageNum))}
                        className={`w-8 h-8 rounded-lg transition-colors ${
                          pagination.page === pageNum
                            ? 'bg-blue-600 text-white'
                            : 'hover:bg-gray-200 dark:hover:bg-gray-700 bg-white dark:bg-gray-800'
                        } ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}
                      >
                        {pageNum}
                      </button>
                    )
                  ))}
                  
                  <button
                    onClick={() => handlePageChange(pagination.page + 1)}
                    disabled={pagination.page === pagination.totalPages}
                    className={`px-3 py-1 rounded-lg transition-colors ${
                      pagination.page === pagination.totalPages
                        ? 'opacity-50 cursor-not-allowed bg-gray-100 dark:bg-gray-700'
                        : 'hover:bg-gray-200 dark:hover:bg-gray-700 bg-white dark:bg-gray-800'
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

export default ProductManagementList;