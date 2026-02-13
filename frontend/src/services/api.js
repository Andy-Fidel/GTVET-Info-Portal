import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
})

// Add request interceptor for auth token
apiClient.interceptors.request.use(
  config => {
    const token = localStorage.getItem('auth_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => Promise.reject(error)
)

// Add response interceptor for auth errors
apiClient.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token')
      // Redirect to login if not already there
      if (!window.location.pathname.startsWith('/login')) {
        window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  }
)

// Auth API
export const authAPI = {
  login: (credentials) => apiClient.post('/login', credentials),
  logout: () => apiClient.post('/logout'),
  forgotPassword: (email) => apiClient.post('/forgot-password', { email }),
  resetPassword: (data) => apiClient.post('/reset-password', data)
}

// Institutions API
export const institutionsAPI = {
  getAll: (params = {}) => apiClient.get('/institutions', { params }),
  getById: (id) => apiClient.get(`/institutions/${id}`),
  search: (query) => apiClient.get('/institutions', { params: { search: query } }),
  create: (formData) => apiClient.post('/institutions', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  update: (id, formData) => apiClient.post(`/institutions/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
}

// Programs API
export const programsAPI = {
  getAll: (params = {}) => apiClient.get('/programs', { params }),
  getById: (id) => apiClient.get(`/programs/${id}`),
  getByInstitution: (institutionId) => apiClient.get(`/institutions/${institutionId}/programs`),
  create: (data) => apiClient.post('/programs', data),
  update: (id, data) => apiClient.put(`/programs/${id}`, data)
}

// Announcements API
export const announcementsAPI = {
  getAll: (params = {}) => apiClient.get('/announcements', { params }),
  getById: (id) => apiClient.get(`/announcements/${id}`),
  create: (data) => apiClient.post('/announcements', data),
  update: (id, data) => apiClient.post(`/announcements/${id}`, data),
  delete: (id) => apiClient.delete(`/announcements/${id}`)
}

// Contact API
export const contactAPI = {
  sendMessage: (data) => apiClient.post('/contact', data),
  getMessages: () => apiClient.get('/messages'),
  getUnreadCount: () => apiClient.get('/messages/unread-count'),
  getMessageById: (id) => apiClient.get(`/messages/${id}`),
  updateMessageStatus: (id, isRead) => apiClient.patch(`/messages/${id}/status`, { is_read: isRead }),
  deleteMessage: (id) => apiClient.delete(`/messages/${id}`)
}

// Dashboard API
export const dashboardAPI = {
  getStats: () => apiClient.get('/dashboard/stats')
}

// Users API
export const usersAPI = {
  getMe: () => apiClient.get('/me'),
  getAll: () => apiClient.get('/users'),
  getById: (id) => apiClient.get(`/users/${id}`),
  create: (formData) => apiClient.post('/users', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  update: (id, formData) => apiClient.post(`/users/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  delete: (id) => apiClient.delete(`/users/${id}`)
}

export default apiClient
