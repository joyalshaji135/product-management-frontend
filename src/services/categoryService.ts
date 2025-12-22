import api from "./api";

export interface Category {
  _id: string;
  categoryName: string;
  code: string;
  categoryDescription: string;
  categoryImage: string;
  categoryStatus: "active" | "inactive";
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

export interface PaginatedResponse {
  success: boolean;
  page: number;
  limit: number;
  totalRecords: number;
  totalPages: number;
  data: Category[];
}

export interface ApiResponse {
  success: boolean;
  message: string;
  statusCode: number;
  data: PaginatedResponse;
}

export interface CategoryFilters {
  page?: number;
  limit?: number;
  search?: string;
  status?: "active" | "inactive";
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export const categoryService = {
  // Get all categories with pagination
  getAllCategories: async (
    filters: CategoryFilters = {}
  ): Promise<ApiResponse> => {
    const params = new URLSearchParams();

    if (filters.page) params.append("page", filters.page.toString());
    if (filters.limit) params.append("limit", filters.limit.toString());
    if (filters.search) params.append("search", filters.search);
    if (filters.status) params.append("status", filters.status);
    if (filters.sortBy) params.append("sortBy", filters.sortBy);
    if (filters.sortOrder) params.append("sortOrder", filters.sortOrder);

    const response = await api.get<ApiResponse>(
      `/category/all?${params.toString()}`
    );
    return response.data;
  },

  // Get single category by ID
  getCategoryById: async (id: string): Promise<Category> => {
    const response = await api.get<{ success: boolean; data: Category }>(
      `/category/${id}`
    );
    return response.data.data;
  },

  // Create new category
  createCategory: async (categoryData: FormData): Promise<Category> => {
    const response = await api.post<{ success: boolean; data: Category }>(
      "/category/create",
      categoryData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data.data;
  },

  // Update category
  updateCategory: async (
    id: string,
    categoryData: FormData
  ): Promise<Category> => {
    const response = await api.put<{ success: boolean; data: Category }>(
      `/category/${id}`,
      categoryData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data.data;
  },

  // Delete category (soft delete)
  deleteCategory: async (
    id: string
  ): Promise<{ success: boolean; message: string }> => {
    const response = await api.delete<{ success: boolean; message: string }>(
      `/category/${id}`
    );
    return response.data;
  },

  // Update category status
  updateCategoryStatus: async (
    id: string,
    status: "active" | "inactive"
  ): Promise<Category> => {
    const response = await api.patch<{ success: boolean; data: Category }>(
      `/category/${id}/status`,
      { status }
    );
    return response.data.data;
  },
};
