/**
 * 工具函数导出索引
 * 记录项目中已有的工具函数和 hooks
 */

// 认证相关
export * from './auth';
export { default as checkLogin } from './checkLogin';

// 存储相关
export { default as useStorage } from './useStorage';

// 主题相关
export { default as changeTheme } from './changeTheme';

// 工具函数
export * from './clipboard';
export * from './getUrlParams';
export * from './is';
export * from './lazyload';
export * from './setupMock';
export * from './useChartTheme';
export * from './useLocale';
export * from './useStorage';

// 权限相关
export { default as auth } from './authentication';
export type { UserPermission, AuthParams } from './authentication';
