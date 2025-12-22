// src/services/productService.ts
import api from './api';

export interface Category {
  _id: string;
  categoryName: string;
  code: string;
  categoryDescription: string;
  categoryImage: string;
  categoryStatus: 'active' | 'inactive';
  isDeleted: boolean;
  createdBy: {
    _id: string;
    email: string;
    role: string;
  };
  isDefault: boolean;
  createdDate: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface CategoryDropdown {
  _id: string;
  categoryName: string;
  code: string;
  categoryDescription: string;
  categoryImage: string;
}

export interface Product {
  _id: string;
  name: string;
  code: string;
  description: string;
  stock: number;
  price: number;
  discount: number;
  productImages: string[];
  category: string | Category;
  productStatus: 'active' | 'inactive';
  isDeleted: boolean;
  createdBy: string;
  isDefault: boolean;
  createdDate: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface CreateProductRequest {
  name: string;
  description: string;
  stock: number;
  price: number;
  discount: number;
  productImages: File[];
  category: string;
}

export interface PaginatedResponse {
  success: boolean;
  page: number;
  limit: number;
  totalRecords: number;
  totalPages: number;
  data: Product[];
}

export interface ApiResponse {
  success: boolean;
  message: string;
  statusCode: number;
  data: PaginatedResponse;
}

export interface CategoriesDropdownResponse {
  success: boolean;
  message: string;
  statusCode: number;
  data: CategoryDropdown[];
}

export interface ProductFilters {
  page?: number;
  limit?: number;
  search?: string;
  status?: 'active' | 'inactive';
  category?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  minPrice?: number;
  maxPrice?: number;
  minStock?: number;
  maxStock?: number;
}

export const productService = {
  // Get all products with pagination
  getAllProducts: async (filters: ProductFilters = {}): Promise<ApiResponse> => {
    const params = new URLSearchParams();
    
    if (filters.page) params.append('page', filters.page.toString());
    if (filters.limit) params.append('limit', filters.limit.toString());
    if (filters.search) params.append('search', filters.search);
    if (filters.status) params.append('status', filters.status);
    if (filters.category) params.append('category', filters.category);
    if (filters.sortBy) params.append('sortBy', filters.sortBy);
    if (filters.sortOrder) params.append('sortOrder', filters.sortOrder);
    if (filters.minPrice) params.append('minPrice', filters.minPrice.toString());
    if (filters.maxPrice) params.append('maxPrice', filters.maxPrice.toString());
    if (filters.minStock) params.append('minStock', filters.minStock.toString());
    if (filters.maxStock) params.append('maxStock', filters.maxStock.toString());

    const response = await api.get<ApiResponse>(`/product/all?${params.toString()}`);
    return response.data;
  },

  // Get single product by ID
  getProductById: async (id: string): Promise<Product> => {
    const response = await api.get<{ success: boolean; data: Product }>(`/product/${id}`);
    return response.data.data;
  },

  // Create new product
  createProduct: async (productData: FormData): Promise<Product> => {
    const response = await api.post<{ success: boolean; data: Product }>('/product/create', productData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data.data;
  },

  // Update product
  updateProduct: async (id: string, productData: FormData): Promise<Product> => {
    const response = await api.put<{ success: boolean; data: Product }>(`/product/${id}`, productData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data.data;
  },

  // Delete product (soft delete)
  deleteProduct: async (id: string): Promise<{ success: boolean; message: string }> => {
    const response = await api.delete<{ success: boolean; message: string }>(`/product/${id}`);
    return response.data;
  },

  // Update product status
  updateProductStatus: async (id: string, status: 'active' | 'inactive'): Promise<Product> => {
    const response = await api.patch<{ success: boolean; data: Product }>(
      `/product/${id}/status`,
      { status }
    );
    return response.data.data;
  },

  // Get categories for dropdown
  getCategoriesForDropdown: async (): Promise<CategoryDropdown[]> => {
    const response = await api.get<CategoriesDropdownResponse>('/common/categories-dd');
    return response.data.data;
  },
};