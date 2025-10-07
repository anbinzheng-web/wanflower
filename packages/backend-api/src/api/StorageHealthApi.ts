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
  StorageHealthControllerGetStorageConfigData,
  StorageHealthControllerGetStorageStatusData,
  StorageHealthControllerTestStorageConnectionData,
} from "./data-contracts";
import { HttpClient, RequestParams } from "./http-client";

export class StorageHealthApi<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  /**
   * No description
   *
   * @tags storage-health
   * @name StorageHealthControllerGetStorageStatus
   * @summary 获取存储服务状态
   * @request GET:/api/storage-health/status
   * @response `200` `StorageHealthControllerGetStorageStatusData` 存储服务状态信息
   */
  storageHealthControllerGetStorageStatus = (params: RequestParams = {}) =>
    this.http.request<StorageHealthControllerGetStorageStatusData, any>({
      path: `/api/storage-health/status`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags storage-health
   * @name StorageHealthControllerGetStorageConfig
   * @summary 获取存储配置信息
   * @request GET:/api/storage-health/config
   * @response `200` `StorageHealthControllerGetStorageConfigData` 存储配置信息
   */
  storageHealthControllerGetStorageConfig = (params: RequestParams = {}) =>
    this.http.request<StorageHealthControllerGetStorageConfigData, any>({
      path: `/api/storage-health/config`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags storage-health
   * @name StorageHealthControllerTestStorageConnection
   * @summary 测试存储服务连接
   * @request GET:/api/storage-health/test
   * @response `200` `StorageHealthControllerTestStorageConnectionData` 测试结果
   */
  storageHealthControllerTestStorageConnection = (params: RequestParams = {}) =>
    this.http.request<StorageHealthControllerTestStorageConnectionData, any>({
      path: `/api/storage-health/test`,
      method: "GET",
      ...params,
    });
}
