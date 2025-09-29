import { HttpClient, BlogApi, ProductApi } from 'backend-api'

console.log('VITE_BASE_URL', import.meta.env.VITE_BASE_URL)

export const httpClient = new HttpClient({
  baseURL: import.meta.env.VITE_BASE_URL,
  // paramsSerializer(params) {
  //   return qs.stringify(params, { arrayFormat: 'comma' })
  // },
})

httpClient.instance.interceptors.request.use(async (config) => {
  return config
}, (error) => {
  // 被墙了
  // if (error?.message?.includes('ERR_CONNECTION_RESET')) {
  //   reGetGatewayConfig()
  // }
  return Promise.reject(error)
})

httpClient.instance.interceptors.response.use(async (response) => {
  const code = response.data.code
  // await handleResponse(response)
  return response
})

export const API = {
  blog: new BlogApi(httpClient),
  product: new ProductApi(httpClient),
}