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
  AdminBatchCartOperationDto,
  AdminCartControllerBatchOperationCartItemsData,
  AdminCartControllerClearAllCartsData,
  AdminCartControllerDeleteCartByUserIdData,
  AdminCartControllerGetAllCartsData,
  AdminCartControllerGetAllCartsParams,
  AdminCartControllerGetCartByUserIdData,
  AdminCartControllerGetCartStatisticsData,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class AdminCartApi<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  /**
   * No description
   *
   * @tags admin-cart
   * @name AdminCartControllerGetAllCarts
   * @summary 获取所有购物车列表（管理员）
   * @request GET:/api/admin/cart
   * @secure
   * @response `200` `AdminCartControllerGetAllCartsData`
   */
  adminCartControllerGetAllCarts = (
    query: AdminCartControllerGetAllCartsParams,
    params: RequestParams = {},
  ) =>
    this.http.request<AdminCartControllerGetAllCartsData, any>({
      path: `/api/admin/cart`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags admin-cart
   * @name AdminCartControllerGetCartStatistics
   * @summary 获取购物车统计信息（管理员）
   * @request GET:/api/admin/cart/statistics
   * @secure
   * @response `200` `AdminCartControllerGetCartStatisticsData`
   */
  adminCartControllerGetCartStatistics = (params: RequestParams = {}) =>
    this.http.request<AdminCartControllerGetCartStatisticsData, any>({
      path: `/api/admin/cart/statistics`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags admin-cart
   * @name AdminCartControllerGetCartByUserId
   * @summary 获取指定用户的购物车（管理员）
   * @request GET:/api/admin/cart/user/{userId}
   * @secure
   * @response `200` `AdminCartControllerGetCartByUserIdData`
   */
  adminCartControllerGetCartByUserId = (
    userId: number,
    params: RequestParams = {},
  ) =>
    this.http.request<AdminCartControllerGetCartByUserIdData, any>({
      path: `/api/admin/cart/user/${userId}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags admin-cart
   * @name AdminCartControllerDeleteCartByUserId
   * @summary 删除指定用户的购物车（管理员）
   * @request DELETE:/api/admin/cart/user/{userId}
   * @secure
   * @response `200` `AdminCartControllerDeleteCartByUserIdData`
   */
  adminCartControllerDeleteCartByUserId = (
    userId: number,
    params: RequestParams = {},
  ) =>
    this.http.request<AdminCartControllerDeleteCartByUserIdData, any>({
      path: `/api/admin/cart/user/${userId}`,
      method: "DELETE",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags admin-cart
   * @name AdminCartControllerBatchOperationCartItems
   * @summary 批量操作购物车项（管理员）
   * @request POST:/api/admin/cart/batch-operation
   * @secure
   * @response `200` `AdminCartControllerBatchOperationCartItemsData`
   */
  adminCartControllerBatchOperationCartItems = (
    data: AdminBatchCartOperationDto,
    params: RequestParams = {},
  ) =>
    this.http.request<AdminCartControllerBatchOperationCartItemsData, any>({
      path: `/api/admin/cart/batch-operation`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags admin-cart
   * @name AdminCartControllerClearAllCarts
   * @summary 清空所有购物车（管理员）
   * @request DELETE:/api/admin/cart/clear-all
   * @secure
   * @response `200` `AdminCartControllerClearAllCartsData`
   */
  adminCartControllerClearAllCarts = (params: RequestParams = {}) =>
    this.http.request<AdminCartControllerClearAllCartsData, any>({
      path: `/api/admin/cart/clear-all`,
      method: "DELETE",
      secure: true,
      format: "json",
      ...params,
    });
}
