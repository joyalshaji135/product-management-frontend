// src/services/publicService.ts
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

export interface Product {
  _id: string;
  name: string;
  code: string;
  description: string;
  stock: number;
  price: number;
  discount: number;
  productImages: string[];
  category: Category | string;
  productStatus: 'active' | 'inactive';
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

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  statusCode: number;
  data: T;
}

export const publicService = {
  // Get all categories (public endpoint)
  getAllCategories: async (): Promise<Category[]> => {
    const response = await api.get<ApiResponse<Category[]>>('/public/categories', {
      headers: {
        'x-api-key': 'devXApiKey',
        'x-app-version': '1.0.0'
      }
    });
    return response.data.data;
  },

  // Get all products (public endpoint)
  getAllProducts: async (): Promise<Product[]> => {
    const response = await api.get<ApiResponse<Product[]>>('/public/products', {
      headers: {
        'x-api-key': 'devXApiKey',
        'x-app-version': '1.0.0'
      }
    });
    return response.data.data;
  },

  // Get products by category
  getProductsByCategory: async (categoryId: string): Promise<Product[]> => {
    const response = await api.get<ApiResponse<Product[]>>(`/public/products/category/${categoryId}`, {
      headers: {
        'x-api-key': 'devXApiKey',
        'x-app-version': '1.0.0'
      }
    });
    return response.data.data;
  },

  // Get single product by ID (public)
  getProductById: async (id: string): Promise<Product> => {
    const response = await api.get<ApiResponse<Product>>(`/public/products/${id}`, {
      headers: {
        'x-api-key': 'devXApiKey',
        'x-app-version': '1.0.0'
      }
    });
    return response.data.data;
  },

  // Search products
  searchProducts: async (query: string): Promise<Product[]> => {
    const response = await api.get<ApiResponse<Product[]>>(`/public/products/search?q=${query}`, {
      headers: {
        'x-api-key': 'devXApiKey',
        'x-app-version': '1.0.0'
      }
    });
    return response.data.data;
  }
};