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
  PaymentControllerDeletePaymentData,
  PaymentControllerGetPaymentDetailData,
  PaymentControllerGetPaymentListData,
  PaymentControllerGetPaymentListParams,
  PaymentControllerGetPaymentStatsData,
} from "./data-contracts";
import { HttpClient, RequestParams } from "./http-client";

export class PaymentsApi<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  /**
   * No description
   *
   * @tags payments
   * @name PaymentControllerGetPaymentList
   * @summary 获取支付记录列表（仅管理员/员工）
   * @request GET:/api/payments
   * @secure
   * @response `200` `PaymentControllerGetPaymentListData`
   */
  paymentControllerGetPaymentList = (
    query: PaymentControllerGetPaymentListParams,
    params: RequestParams = {},
  ) =>
    this.http.request<PaymentControllerGetPaymentListData, any>({
      path: `/api/payments`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags payments
   * @name PaymentControllerGetPaymentStats
   * @summary 获取支付统计信息（仅管理员/员工）
   * @request GET:/api/payments/stats
   * @secure
   * @response `200` `PaymentControllerGetPaymentStatsData`
   */
  paymentControllerGetPaymentStats = (params: RequestParams = {}) =>
    this.http.request<PaymentControllerGetPaymentStatsData, any>({
      path: `/api/payments/stats`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags payments
   * @name PaymentControllerGetPaymentDetail
   * @summary 获取支付详情（仅管理员/员工）
   * @request GET:/api/payments/{id}
   * @secure
   * @response `200` `PaymentControllerGetPaymentDetailData`
   */
  paymentControllerGetPaymentDetail = (
    id: number,
    params: RequestParams = {},
  ) =>
    this.http.request<PaymentControllerGetPaymentDetailData, any>({
      path: `/api/payments/${id}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags payments
   * @name PaymentControllerDeletePayment
   * @summary 删除支付记录（仅管理员）
   * @request DELETE:/api/payments/{id}
   * @secure
   * @response `200` `PaymentControllerDeletePaymentData`
   */
  paymentControllerDeletePayment = (id: number, params: RequestParams = {}) =>
    this.http.request<PaymentControllerDeletePaymentData, any>({
      path: `/api/payments/${id}`,
      method: "DELETE",
      secure: true,
      format: "json",
      ...params,
    });
}
