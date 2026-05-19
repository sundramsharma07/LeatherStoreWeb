import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api',
  headers: {
    'Accept': 'application/json',
  },
})

// Recursive helper to replace localhost URLs in API responses
const replaceLocalhostUrls = (data, backendRoot) => {
  if (!data) return data
  if (typeof data === 'string') {
    let url = data
    if (url.includes('localhost:8000') || url.includes('127.0.0.1:8000')) {
      url = url.replace(/^http:\/\/(localhost|127\.0\.0\.1):8000/, backendRoot)
    }
    // Upgrade http to https in production to prevent Mixed Content warnings
    if (window.location.protocol === 'https:' && url.startsWith('http://')) {
      url = url.replace(/^http:\/\//, 'https://')
    }
    return url
  }
  if (Array.isArray(data)) {
    return data.map(item => replaceLocalhostUrls(item, backendRoot))
  }
  if (typeof data === 'object') {
    const updated = {}
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        updated[key] = replaceLocalhostUrls(data[key], backendRoot)
      }
    }
    return updated
  }
  return data
}

// Automatically attach JWT token to all requests if present
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('customer_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, (error) => {
  return Promise.reject(error)
})

// Automatically sanitize image URLs from responses to map to the correct backend host
api.interceptors.response.use((response) => {
  const backendBase = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api'
  // Remove trailing slash and /api suffix to get backend root host
  const backendRoot = backendBase.replace(/\/api\/?$/, '')

  if (response.data) {
    response.data = replaceLocalhostUrls(response.data, backendRoot)
  }
  return response
}, (error) => {
  return Promise.reject(error)
})

export const getApiError = (error) => {
  return error.response?.data?.message || error.message || 'Something went wrong.'
}

export default api
