// API Base URL - Update this to your actual API URL
const API_BASE_URL = 'http://localhost:3000/api/v1';

interface ApiResponse<T> {
  status: string;
  statusCode: number;
  message: string;
  data: T;
}

interface Category {
  id: string;
  name: string;
  image: string;
  description?: string;
  isActive: boolean;
  sortOrder: number;
  items?: MenuItem[];
}

interface MenuItem {
  id: string;
  categoryId: string;
  name: string;
  subtitle?: string;
  description: string;
  price: string;
  images: string[];
  features?: string[];
  isAvailable: boolean;
  sortOrder: number;
}

interface CreateCategoryDto {
  name: string;
  image: string;
  description?: string;
}

interface UpdateCategoryDto {
  name?: string;
  image?: string;
  description?: string;
}

interface CreateItemDto {
  categoryId: string;
  name: string;
  subtitle?: string;
  description: string;
  price: string;
  images: string[];
  features?: string[];
}

interface UpdateItemDto {
  name?: string;
  subtitle?: string;
  description?: string;
  price?: string;
  images?: string[];
  features?: string[];
  isAvailable?: boolean;
}

class ApiService {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`;
    
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API Request failed:', error);
      throw error;
    }
  }

  // Category APIs
  async getCategories(includeItems = true): Promise<ApiResponse<Category[]>> {
    return this.request<Category[]>(
      `/menu/categories?includeItems=${includeItems}`
    );
  }

  async getCategoryById(categoryId: string): Promise<ApiResponse<Category>> {
    return this.request<Category>(`/menu/categories/${categoryId}`);
  }

  async createCategory(data: CreateCategoryDto): Promise<ApiResponse<Category>> {
    return this.request<Category>('/menu/categories', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateCategory(
    categoryId: string,
    data: UpdateCategoryDto
  ): Promise<ApiResponse<Category>> {
    return this.request<Category>(`/menu/categories/${categoryId}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  async deleteCategory(categoryId: string): Promise<ApiResponse<{ id: string }>> {
    return this.request<{ id: string }>(`/menu/categories/${categoryId}`, {
      method: 'DELETE',
    });
  }

  // Item APIs
  async getItemsByCategory(categoryId: string): Promise<ApiResponse<MenuItem[]>> {
    return this.request<MenuItem[]>(`/menu/categories/${categoryId}/items`);
  }

  async getItemById(itemId: string): Promise<ApiResponse<MenuItem>> {
    return this.request<MenuItem>(`/menu/items/${itemId}`);
  }

  async createItem(data: CreateItemDto): Promise<ApiResponse<MenuItem>> {
    return this.request<MenuItem>('/menu/categories/items', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateItem(
    itemId: string,
    data: UpdateItemDto
  ): Promise<ApiResponse<MenuItem>> {
    return this.request<MenuItem>(`/menu/items/${itemId}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  async deleteItem(itemId: string): Promise<ApiResponse<{ id: string }>> {
    return this.request<{ id: string }>(`/menu/items/${itemId}`, {
      method: 'DELETE',
    });
  }
}

// Helper function to convert file to base64
export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      resolve(result);
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsDataURL(file);
  });
};

// Export singleton instance
export const apiService = new ApiService(API_BASE_URL);

// Export types
export type {
  ApiResponse,
  Category,
  MenuItem,
  CreateCategoryDto,
  UpdateCategoryDto,
  CreateItemDto,
  UpdateItemDto,
};

// Also export as default for easier importing
export default apiService;