// src/utils/authUtils.ts

const API_BASE_URL = 'http://localhost:3000/api/v1';

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  const token = localStorage.getItem('accessToken');
  return !!token;
};

// Get authentication token
export const getAuthToken = (): string | null => {
  return localStorage.getItem('accessToken');
};

// Get user data
export const getUserData = () => {
  return {
    id: localStorage.getItem('userId'),
    username: localStorage.getItem('username'),
    role: localStorage.getItem('role'),
  };
};

// Logout function
export const logout = (): void => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('userId');
  localStorage.removeItem('username');
  localStorage.removeItem('role');
};

// API call with authentication
export const authenticatedFetch = async (
  endpoint: string,
  options: RequestInit = {}
): Promise<Response> => {
  const token = getAuthToken();
  
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  return fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });
};

// Delete user function
export const deleteUser = async (userId: string) => {
  try {
    const response = await authenticatedFetch(`/users/${userId}`, {
      method: 'DELETE',
    });

    const data = await response.json();

    if (response.ok && data.status === 'success') {
      return { success: true, data: data.data };
    } else {
      return { success: false, error: data.message || 'Failed to delete user' };
    }
  } catch (error) {
    console.error('Delete user error:', error);
    return { success: false, error: 'Unable to connect to server' };
  }
};

// Register user function (if needed for creating new admin users)
export const registerUser = async (
  fullName: string,
  username: string,
  password: string
) => {
  try {
    const response = await authenticatedFetch('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ fullName, username, password }),
    });

    const data = await response.json();

    if (response.ok && data.status === 'success') {
      return { success: true, data: data.data };
    } else {
      return { success: false, error: data.message || 'Registration failed' };
    }
  } catch (error) {
    console.error('Registration error:', error);
    return { success: false, error: 'Unable to connect to server' };
  }
};