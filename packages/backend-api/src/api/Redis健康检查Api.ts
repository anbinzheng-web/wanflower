/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

import {
  RedisHealthControllerCheckConnectionData,
  RedisHealthControllerCheckMemoryUsageData,
  RedisHealthControllerGetHealthSummaryData,
  RedisHealthControllerGetServerInfoData,
  RedisHealthControllerPerformanceTestData,
} from "./data-contracts";
import { HttpClient, RequestParams } from "./http-client";

export class Redis健康检查Api<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  /**
   * No description
   *
   * @tags Redis健康检查
   * @name RedisHealthControllerCheckConnection
   * @summary 检查Redis连接状态
   * @request GET:/api/redis/health/connection
   * @response `200` `RedisHealthControllerCheckConnectionData` 连接状态检查成功
   */
  redisHealthControllerCheckConnection = (params: RequestParams = {}) =>
    this.http.request<RedisHealthControllerCheckConnectionData, any>({
      path: `/api/redis/health/connection`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags Redis健康检查
   * @name RedisHealthControllerGetServerInfo
   * @summary 获取Redis服务器信息
   * @request GET:/api/redis/health/server-info
   * @response `200` `RedisHealthControllerGetServerInfoData` 服务器信息获取成功
   */
  redisHealthControllerGetServerInfo = (params: RequestParams = {}) =>
    this.http.request<RedisHealthControllerGetServerInfoData, any>({
      path: `/api/redis/health/server-info`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags Redis健康检查
   * @name RedisHealthControllerCheckMemoryUsage
   * @summary 检查Redis内存使用情况
   * @request GET:/api/redis/health/memory
   * @response `200` `RedisHealthControllerCheckMemoryUsageData` 内存使用情况获取成功
   */
  redisHealthControllerCheckMemoryUsage = (params: RequestParams = {}) =>
    this.http.request<RedisHealthControllerCheckMemoryUsageData, any>({
      path: `/api/redis/health/memory`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags Redis健康检查
   * @name RedisHealthControllerPerformanceTest
   * @summary 执行Redis性能测试
   * @request POST:/api/redis/health/performance-test
   * @response `200` `RedisHealthControllerPerformanceTestData` 性能测试完成
   */
  redisHealthControllerPerformanceTest = (params: RequestParams = {}) =>
    this.http.request<RedisHealthControllerPerformanceTestData, any>({
      path: `/api/redis/health/performance-test`,
      method: "POST",
      ...params,
    });
  /**
   * No description
   *
   * @tags Redis健康检查
   * @name RedisHealthControllerGetHealthSummary
   * @summary 获取Redis健康状态摘要
   * @request GET:/api/redis/health/summary
   * @response `200` `RedisHealthControllerGetHealthSummaryData` 健康状态摘要获取成功
   */
  redisHealthControllerGetHealthSummary = (params: RequestParams = {}) =>
    this.http.request<RedisHealthControllerGetHealthSummaryData, any>({
      path: `/api/redis/health/summary`,
      method: "GET",
      ...params,
    });
}
