const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

// Log warning if environment variable is not set
if (!import.meta.env.VITE_API_BASE_URL) {
  console.warn('VITE_API_BASE_URL is not set. Using default:', API_BASE_URL);
}

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

interface BlogPost {
  id: string;
  subHeading: string;
  heading: string;
  description: string;
  coverImage: string;
  isPublished: boolean;
  createdAt?: string;
  updatedAt?: string;
}

interface Reservation {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  guests: number;
  date: string;
  time: string;
  message?: string;
  isArchived: boolean;
  createdAt: string;
  updatedAt: string;
}

interface ReservationAvailability {
  date: string;
  isBookingOpen: boolean;
  bookedTimes: string[];
  reservations: Array<{
    id: string;
    fullName: string;
    email: string;
    phone: string;
    guests: number;
    date: string;
    message?: string;
    time: string;
  }>;
}

interface ReservationSettings {
  id: string;
  isBookingOpen: boolean;
}

interface TodayReservations {
  date: string;
  reservations: Reservation[];
}

interface ArchiveResult {
  archivedCount: number;
  beforeDate: string;
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

interface CreateBlogDto {
  subHeading: string;
  heading: string;
  description: string;
  coverImage: string;
  isPublished: boolean;
}

interface UpdateBlogDto {
  subHeading?: string;
  heading?: string;
  description?: string;
  coverImage?: string;
  isPublished?: boolean;
}

interface CreateReservationDto {
  fullName: string;
  email: string;
  phone: string;
  guests: number;
  date: string;
  time: string;
  message?: string;
}

interface UpdateReservationSettingsDto {
  isBookingOpen: boolean;
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
    
    console.log(`🌐 API Request: ${options.method || 'GET'} ${url}`);
    
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });

      console.log(`📡 API Response: ${response.status} ${response.statusText}`);

      if (!response.ok) {
        // Try to get error details from response body
        let errorMessage = `API Error: ${response.status} ${response.statusText}`;
        try {
          const errorData = await response.json();
          console.error('❌ Error details:', errorData);
          errorMessage = errorData.message || errorMessage;
        } catch (e) {
          // If response is not JSON, try to get text
          const errorText = await response.text();
          console.error('❌ Error response:', errorText);
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();
      console.log('✅ API Success:', data);
      return data;
    } catch (error) {
      console.error('💥 API Request failed:', error);
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

  // Blog APIs
  async getBlogs(): Promise<ApiResponse<BlogPost[]>> {
    return this.request<BlogPost[]>('/blogs');
  }

  async getBlogById(blogId: string): Promise<ApiResponse<BlogPost>> {
    return this.request<BlogPost>(`/blogs/${blogId}`);
  }

  async createBlog(data: CreateBlogDto): Promise<ApiResponse<BlogPost>> {
    return this.request<BlogPost>('/blogs', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateBlog(
    blogId: string,
    data: UpdateBlogDto
  ): Promise<ApiResponse<BlogPost>> {
    return this.request<BlogPost>(`/blogs/${blogId}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  async deleteBlog(blogId: string): Promise<ApiResponse<{ id: string }>> {
    return this.request<{ id: string }>(`/blogs/${blogId}`, {
      method: 'DELETE',
    });
  }

  // Reservation APIs
  async createReservation(data: CreateReservationDto): Promise<ApiResponse<Reservation>> {
    return this.request<Reservation>('/reservations', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async getReservationAvailability(date: string): Promise<ApiResponse<ReservationAvailability>> {
    return this.request<ReservationAvailability>(
      `/reservations/availability?date=${date}`
    );
  }

  async getReservationSettings(): Promise<ApiResponse<ReservationSettings>> {
    return this.request<ReservationSettings>('/reservations/settings');
  }

  // Admin Reservation APIs
  async getTodayReservations(): Promise<ApiResponse<TodayReservations>> {
    return this.request<TodayReservations>('/reservations/admin/today');
  }

  async updateReservationSettings(
    data: UpdateReservationSettingsDto
  ): Promise<ApiResponse<ReservationSettings>> {
    return this.request<ReservationSettings>('/reservations/admin/booking', {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  async archivePreviousReservations(): Promise<ApiResponse<ArchiveResult>> {
    return this.request<ArchiveResult>('/reservations/admin/archive-previous', {
      method: 'POST',
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
  BlogPost,
  Reservation,
  ReservationAvailability,
  ReservationSettings,
  TodayReservations,
  ArchiveResult,
  CreateCategoryDto,
  UpdateCategoryDto,
  CreateItemDto,
  UpdateItemDto,
  CreateBlogDto,
  UpdateBlogDto,
  CreateReservationDto,
  UpdateReservationSettingsDto,
};

// Also export as default for easier importing
export default apiService;