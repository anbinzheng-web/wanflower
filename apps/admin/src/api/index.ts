import { HttpClient, BlogApi, ProductApi, AuthApi, UsersApi, OrdersApi, CartApi, AdminCartApi, AddressApi, PaymentsApi, MediaApi } from 'backend-api'
import { getAccessToken, refreshToken, logout } from '@/utils/auth'

// console.log('VITE_BASE_URL', import.meta.env.VITE_BASE_URL)

export const httpClient = new HttpClient({
  // 无需配置baseURL，由vite.config.ts 中的proxy代理转发了
  // baseURL: import.meta.env.VITE_BASE_URL || 'http://localhost:3000/api',
  // paramsSerializer(params) {
  //   return qs.stringify(params, { arrayFormat: 'comma' })
  // },
  // 配置请求默认选项
  withCredentials: true, // 发送 cookie
})

httpClient.instance.interceptors.request.use(async (config) => {
  // 添加认证token
  const token = getAccessToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, (error) => {
  // 被墙了
  // if (error?.message?.includes('ERR_CONNECTION_RESET')) {
  //   reGetGatewayConfig()
  // }
  return Promise.reject(error)
})

// 请求队列，用于防止重复刷新token
let isRefreshing = false
let failedQueue: Array<{
  resolve: (value?: any) => void
  reject: (reason?: any) => void
}> = []

// 处理队列中的请求
function processQueue(error: any, token: string | null = null) {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error)
    } else {
      resolve(token)
    }
  })
  
  failedQueue = []
}

httpClient.instance.interceptors.response.use(
  async (response) => {
    // 检查响应体中的错误码
    if (response.data && response.data.code === 401 && response.data.message === 'Unauthorized') {
      // 这是一个认证错误，需要刷新token
      const originalRequest = response.config
      
      if (isRefreshing) {
        // 如果正在刷新token，将请求加入队列
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        }).then(token => {
          originalRequest.headers.Authorization = `Bearer ${token}`
          return httpClient.instance(originalRequest)
        }).catch(err => {
          return Promise.reject(err)
        })
      }

      if (!(originalRequest as any)._retry) {
        (originalRequest as any)._retry = true
        isRefreshing = true

        try {
          const success = await refreshToken()
          if (success) {
            const newToken = getAccessToken()
            processQueue(null, newToken)
            originalRequest.headers.Authorization = `Bearer ${newToken}`
            return httpClient.instance(originalRequest)
          } else {
            // 刷新失败，清除认证信息并跳转到登录页
            processQueue(response, null)
            logout()
            return Promise.reject(response)
          }
        } catch (refreshError) {
          processQueue(refreshError, null)
          logout()
          return Promise.reject(refreshError)
        } finally {
          isRefreshing = false
        }
      }
    }

    return response
  },
  async (error) => {
    // 处理网络错误等其他错误
    return Promise.reject(error)
  }
)

export const API = {
  blog: new BlogApi(httpClient),
  product: new ProductApi(httpClient),
  auth: new AuthApi(httpClient),
  users: new UsersApi(httpClient),
  order: new OrdersApi(httpClient),
  cart: new CartApi(httpClient),
  adminCart: new AdminCartApi(httpClient),
  address: new AddressApi(httpClient),
  payment: new PaymentsApi(httpClient),
  media: new MediaApi(httpClient),
}