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
  ConfirmPaymentDto,
  CreateOrderDto,
  OrderControllerCancelOrderData,
  OrderControllerConfirmOfflinePaymentData,
  OrderControllerCreateOrderData,
  OrderControllerDeleteOrderData,
  OrderControllerGetOrderByIdData,
  OrderControllerGetOrdersData,
  OrderControllerGetOrdersParams,
  OrderControllerGetOrderStatsData,
  OrderControllerUpdateOrderData,
  UpdateOrderDto,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class OrdersApi<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  /**
   * No description
   *
   * @tags orders
   * @name OrderControllerCreateOrder
   * @summary 创建订单
   * @request POST:/api/orders
   * @secure
   * @response `200` `OrderControllerCreateOrderData`
   */
  orderControllerCreateOrder = (
    data: CreateOrderDto,
    params: RequestParams = {},
  ) =>
    this.http.request<OrderControllerCreateOrderData, any>({
      path: `/api/orders`,
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
   * @tags orders
   * @name OrderControllerGetOrders
   * @summary 获取订单列表
   * @request GET:/api/orders
   * @secure
   * @response `200` `OrderControllerGetOrdersData`
   */
  orderControllerGetOrders = (
    query: OrderControllerGetOrdersParams,
    params: RequestParams = {},
  ) =>
    this.http.request<OrderControllerGetOrdersData, any>({
      path: `/api/orders`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags orders
   * @name OrderControllerGetOrderStats
   * @summary 获取订单统计
   * @request GET:/api/orders/stats
   * @secure
   * @response `200` `OrderControllerGetOrderStatsData`
   */
  orderControllerGetOrderStats = (params: RequestParams = {}) =>
    this.http.request<OrderControllerGetOrderStatsData, any>({
      path: `/api/orders/stats`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags orders
   * @name OrderControllerGetOrderById
   * @summary 获取订单详情
   * @request GET:/api/orders/{id}
   * @secure
   * @response `200` `OrderControllerGetOrderByIdData`
   */
  orderControllerGetOrderById = (id: number, params: RequestParams = {}) =>
    this.http.request<OrderControllerGetOrderByIdData, any>({
      path: `/api/orders/${id}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags orders
   * @name OrderControllerUpdateOrder
   * @summary 更新订单
   * @request PUT:/api/orders/{id}
   * @secure
   * @response `200` `OrderControllerUpdateOrderData`
   */
  orderControllerUpdateOrder = (
    id: number,
    data: UpdateOrderDto,
    params: RequestParams = {},
  ) =>
    this.http.request<OrderControllerUpdateOrderData, any>({
      path: `/api/orders/${id}`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags orders
   * @name OrderControllerDeleteOrder
   * @summary 删除订单（仅管理员）
   * @request DELETE:/api/orders/{id}
   * @secure
   * @response `200` `OrderControllerDeleteOrderData`
   */
  orderControllerDeleteOrder = (id: number, params: RequestParams = {}) =>
    this.http.request<OrderControllerDeleteOrderData, any>({
      path: `/api/orders/${id}`,
      method: "DELETE",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags orders
   * @name OrderControllerCancelOrder
   * @summary 取消订单
   * @request PUT:/api/orders/{id}/cancel
   * @secure
   * @response `200` `OrderControllerCancelOrderData`
   */
  orderControllerCancelOrder = (id: number, params: RequestParams = {}) =>
    this.http.request<OrderControllerCancelOrderData, any>({
      path: `/api/orders/${id}/cancel`,
      method: "PUT",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags orders
   * @name OrderControllerConfirmOfflinePayment
   * @summary 确认线下支付（仅管理员/员工）
   * @request PUT:/api/orders/{id}/confirm-payment
   * @secure
   * @response `200` `OrderControllerConfirmOfflinePaymentData`
   */
  orderControllerConfirmOfflinePayment = (
    id: number,
    data: ConfirmPaymentDto,
    params: RequestParams = {},
  ) =>
    this.http.request<OrderControllerConfirmOfflinePaymentData, any>({
      path: `/api/orders/${id}/confirm-payment`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
}
