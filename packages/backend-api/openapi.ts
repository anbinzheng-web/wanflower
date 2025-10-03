import { writeFileSync } from 'fs';
import * as path from 'path';
import { generateApi } from 'swagger-typescript-api';

/**
 * OpenAPI TypeScript API 生成脚本
 * 从后端服务的 OpenAPI 规范生成 TypeScript API 客户端代码
 */

// 生成 API 客户端代码
generateApi({
  // 输出目录：生成的 TypeScript 文件将保存在此目录
  output: path.resolve(process.cwd(), './src/api'),
  
  // OpenAPI 规范源：从后端服务获取 OpenAPI JSON 规范
  url: 'http://127.0.0.1:3000/openapi.json',
  
  // HTTP 客户端类型：使用 axios 作为 HTTP 客户端
  // 可选值：'axios' | 'fetch'
  httpClientType: 'axios',
  
  // 模块化生成：为每个 API 标签创建单独的模块文件
  modular: true,
  
  // 路由类型生成：生成路由类型定义（已注释，可根据需要启用）
  // generateRouteTypes: true,
  
  // 模块名优先标签：使用 OpenAPI 标签作为模块名的基础
  moduleNameFirstTag: true,
  
  // 提取请求参数：从 OpenAPI 规范中提取请求参数类型
  extractRequestParams: true,
  
  // 提取请求体：从 OpenAPI 规范中提取请求体类型
  extractRequestBody: true,
  
  // 提取响应错误：从 OpenAPI 规范中提取错误响应类型
  extractResponseError: true,
  
  // 提取响应体：从 OpenAPI 规范中提取响应体类型
  extractResponseBody: true,
  
  // 提取枚举：从 OpenAPI 规范中提取枚举类型
  extractEnums: true,
  
  // 解包响应数据：自动解包响应数据，直接返回业务数据而不是包装对象
  unwrapResponseData: true,
  
  // 清理输出：在生成新文件前清理输出目录
  cleanOutput: true,
  
  // 单一 HTTP 客户端：所有 API 调用使用同一个 HTTP 客户端实例
  singleHttpClient: true,
  
  // 生成响应类型：生成完整的响应类型定义
  generateResponses: true,
  
  // 钩子函数：在创建路由时修改路由数据
  hooks: {
    /**
     * 创建路由时的钩子函数
     * @param routeData 路由数据对象
     * @returns 修改后的路由数据
     */
    onCreateRoute(routeData: any) {
      // 为命名空间添加 'API' 后缀，便于区分
      routeData.namespace = `${routeData.namespace}API`;
      return routeData;
    },
  },
} as any).then(({ files }: { files: Array<{ fileName: string }> }) => {
  // 生成统一导出文件的内容
  const content = files.reduce((acc: string, file: { fileName: string }) => {
    return `${acc}
export * from './${file.fileName}'`;
  }, '');
  
  // 写入统一导出文件，方便其他模块导入
  writeFileSync('./src/api/index.ts', content);
  
  console.log('✅ API 客户端代码生成完成！');
  console.log(`📁 输出目录: ${path.resolve(process.cwd(), './src/api')}`);
  console.log(`📄 生成文件数量: ${files.length}`);
}).catch((error: Error) => {
  console.error('❌ API 客户端代码生成失败:');
  
  // 检查是否是连接错误
  if (error.message.includes('ECONNREFUSED') || error.message.includes('fetch failed')) {
    console.error('🔌 无法连接到后端服务，请确保后端服务已启动：');
    console.error('   - 检查后端服务是否在 http://127.0.0.1:3000 运行');
    console.error('   - 确认 OpenAPI 端点 http://127.0.0.1:3000/openapi.json 可访问');
    console.error('   - 尝试手动访问该 URL 验证服务状态');
  } else {
    console.error('📝 错误详情:', error.message);
  }
  
  console.error('\n💡 解决方案:');
  console.error('   1. 启动后端服务: cd /Users/yan/Projects/wanflower-server && pnpm run start:dev');
  console.error('   2. 确认服务运行在端口 3000');
  console.error('   3. 重新运行此脚本: pnpm run openapi');
  
  process.exit(1);
});
