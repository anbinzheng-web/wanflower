/**
 * 认证相关工具函数
 */

export interface UserInfo {
  id: number;
  email: string;
  name?: string;
  role?: string;
  avatar?: string;
}

/**
 * 获取当前用户信息
 */
export function getCurrentUser(): UserInfo | null {
  try {
    const userInfo = localStorage.getItem('user_info');
    return userInfo ? JSON.parse(userInfo) : null;
  } catch (error) {
    console.error('获取用户信息失败:', error);
    return null;
  }
}

/**
 * 获取访问令牌
 */
export function getAccessToken(): string | null {
  return localStorage.getItem('access_token');
}

/**
 * 获取刷新令牌
 */
export function getRefreshToken(): string | null {
  return localStorage.getItem('refresh_token');
}

/**
 * 检查用户是否已登录
 */
export function isLoggedIn(): boolean {
  const token = getAccessToken();
  const user = getCurrentUser();
  return !!(token && user);
}

/**
 * 保存用户信息
 */
export function saveUserInfo(userInfo: UserInfo): void {
  localStorage.setItem('user_info', JSON.stringify(userInfo));
}

/**
 * 保存令牌
 */
export function saveTokens(accessToken: string, refreshToken?: string): void {
  localStorage.setItem('access_token', accessToken);
  if (refreshToken) {
    localStorage.setItem('refresh_token', refreshToken);
  }
}

/**
 * 清除所有认证信息
 */
export function clearAuth(): void {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  localStorage.removeItem('user_info');
  localStorage.removeItem('userStatus');
}

/**
 * 登出
 */
export function logout(): void {
  clearAuth();
  // 跳转到登录页
  window.location.href = '/login';
}

/**
 * 检查token是否即将过期（简单实现）
 */
export function isTokenExpiring(): boolean {
  const token = getAccessToken();
  if (!token) return true;
  
  try {
    // 简单的JWT解析（不验证签名）
    const payload = JSON.parse(atob(token.split('.')[1]));
    const now = Math.floor(Date.now() / 1000);
    // 如果token在5分钟内过期，认为即将过期
    return payload.exp - now < 300;
  } catch (error) {
    console.error('解析token失败:', error);
    return true;
  }
}

/**
 * 刷新token
 */
export async function refreshToken(): Promise<boolean> {
  const refreshTokenValue = getRefreshToken();
  if (!refreshTokenValue) {
    console.warn('没有刷新token，无法刷新访问token');
    return false;
  }

  try {
    // 这里需要导入API，但为了避免循环依赖，我们通过参数传入
    // 或者使用动态导入
    const { API } = await import('@/api');
    const response = await API.auth.authControllerRefresh();
    
    if (response.data && response.data.access_token) {
      saveTokens(response.data.access_token, response.data.refresh_token);
      console.log('Token刷新成功');
      return true;
    }
    return false;
  } catch (error) {
    console.error('Token刷新失败:', error);
    return false;
  }
}

/**
 * 检查token是否有效（简单实现）
 */
export function isTokenValid(): boolean {
  const token = getAccessToken();
  if (!token) return false;
  
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const now = Math.floor(Date.now() / 1000);
    return payload.exp > now;
  } catch (error) {
    console.error('解析token失败:', error);
    return false;
  }
}
