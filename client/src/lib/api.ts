import axios from './axios';

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
}

class ApiClient {
  constructor() {
    // baseURL is already configured in the axios instance
  }

  private async request<T>(
    endpoint: string,
    options: any = {}
  ): Promise<ApiResponse<T>> {
    const config = {
      url: endpoint,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      method: options.method || 'GET',
      data: options.data,
      ...options,
    };

    try {
      const response = await axios(config);
      const serverResponse = response.data;
      
      // If server response is already the data (not wrapped), use it directly
      if (Array.isArray(serverResponse) || (serverResponse && !serverResponse.data && !serverResponse.message)) {
        return {
          success: response.status >= 200 && response.status < 300,
          message: 'Success',
          data: serverResponse as T
        };
      }
      
      // Transform server response format to client expected format
      return {
        success: response.status >= 200 && response.status < 300,
        message: serverResponse.message || 'Success',
        data: serverResponse.data || serverResponse
      };
    } catch (error: any) {
      console.error('API request failed:', error);
      
      // Handle axios error response
      if (error.response?.data) {
        throw new Error(error.response.data.message || 'An error occurred');
      }
      
      throw error;
    }
  }

  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  async post<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      data: data,
    });
  }

  async put<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      data: data,
    });
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }
}

export const apiClient = new ApiClient();

// Auth API functions
export const authAPI = {
  login: (email: string, password: string) =>
    apiClient.post('/auth/login', { email, password }),

  signup: (name: string, email: string, password: string) =>
    apiClient.post('/auth/signup', { name, email, password }),

  logout: () => apiClient.post('/auth/logout'),

  authenticate: () => apiClient.get('/auth'),

  forgotPassword: (email: string) =>
    apiClient.post('/auth/forgot-password', { email }),

  resetPassword: (token: string, newPassword: string) =>
    apiClient.post(`/auth/reset-password?token=${token}`, { newPassword }),

  verifySignup: (token: string) =>
    apiClient.get(`/auth/verify-signup?token=${token}`),

  sendMagicLink: (email: string) =>
    apiClient.post('/auth/send-magic-link', { email }),
};

// Services API functions
export const servicesAPI = {
  getServices: () => 
    apiClient.get('/services'),

  getService: (serviceId: string) => 
    apiClient.get(`/services/${serviceId}`),

  createService: (serviceData: any) => 
    apiClient.post('/services', serviceData),

  updateService: (serviceId: string, serviceData: any) => 
    apiClient.put(`/services/${serviceId}`, serviceData),

  deleteService: (serviceId: string) => 
    apiClient.delete(`/services/${serviceId}`),

  getOverview: () => 
    apiClient.get('/services/overview/stats'),

  getRecentLogs: (limit?: number) => 
    apiClient.get(`/services/logs/recent${limit ? `?limit=${limit}` : ''}`),

  getServiceLogs: (serviceId: string, limit?: number) => 
    apiClient.get(`/services/${serviceId}/logs${limit ? `?limit=${limit}` : ''}`),
};