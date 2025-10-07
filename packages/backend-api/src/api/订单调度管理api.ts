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
  OrderSchedulerControllerCheckTimeoutOrdersData,
  OrderSchedulerControllerGetOrderPaymentStatusData,
} from "./data-contracts";
import { HttpClient, RequestParams } from "./http-client";

export class 订单调度管理api<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  /**
   * No description
   *
   * @tags 订单调度管理
   * @name OrderSchedulerControllerCheckTimeoutOrders
   * @summary 手动触发超时订单检查
   * @request POST:/api/orders/scheduler/check-timeout
   * @response `200` `OrderSchedulerControllerCheckTimeoutOrdersData` 检查完成
   */
  orderSchedulerControllerCheckTimeoutOrders = (params: RequestParams = {}) =>
    this.http.request<OrderSchedulerControllerCheckTimeoutOrdersData, any>({
      path: `/api/orders/scheduler/check-timeout`,
      method: "POST",
      ...params,
    });
  /**
   * No description
   *
   * @tags 订单调度管理
   * @name OrderSchedulerControllerGetOrderPaymentStatus
   * @summary 获取订单支付状态信息
   * @request GET:/api/orders/scheduler/payment-status/{id}
   * @response `200` `OrderSchedulerControllerGetOrderPaymentStatusData` 支付状态信息
   */
  orderSchedulerControllerGetOrderPaymentStatus = (
    id: string,
    params: RequestParams = {},
  ) =>
    this.http.request<OrderSchedulerControllerGetOrderPaymentStatusData, any>({
      path: `/api/orders/scheduler/payment-status/${id}`,
      method: "GET",
      ...params,
    });
}
