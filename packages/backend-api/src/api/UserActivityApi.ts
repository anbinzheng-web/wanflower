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
  UserActivityControllerGetActiveUsersTrendData,
  UserActivityControllerGetActiveUsersTrendParams,
  UserActivityControllerGetActivityDistributionData,
  UserActivityControllerGetActivityStatsData,
  UserActivityControllerGetInactiveUsersData,
  UserActivityControllerGetInactiveUsersParams,
  UserActivityControllerGetMonthlyActiveUsersData,
  UserActivityControllerGetTodayActiveUsersData,
  UserActivityControllerGetWeeklyActiveUsersData,
} from "./data-contracts";
import { HttpClient, RequestParams } from "./http-client";

export class UserActivityApi<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  /**
   * No description
   *
   * @tags user-activity
   * @name UserActivityControllerGetActivityStats
   * @summary 获取用户活跃度统计概览
   * @request GET:/api/user-activity/stats
   * @response `200` `UserActivityControllerGetActivityStatsData` 获取成功
   */
  userActivityControllerGetActivityStats = (params: RequestParams = {}) =>
    this.http.request<UserActivityControllerGetActivityStatsData, any>({
      path: `/api/user-activity/stats`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags user-activity
   * @name UserActivityControllerGetTodayActiveUsers
   * @summary 获取今日活跃用户数
   * @request GET:/api/user-activity/today
   * @response `200` `UserActivityControllerGetTodayActiveUsersData` 获取成功
   */
  userActivityControllerGetTodayActiveUsers = (params: RequestParams = {}) =>
    this.http.request<UserActivityControllerGetTodayActiveUsersData, any>({
      path: `/api/user-activity/today`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags user-activity
   * @name UserActivityControllerGetWeeklyActiveUsers
   * @summary 获取本周活跃用户数
   * @request GET:/api/user-activity/weekly
   * @response `200` `UserActivityControllerGetWeeklyActiveUsersData` 获取成功
   */
  userActivityControllerGetWeeklyActiveUsers = (params: RequestParams = {}) =>
    this.http.request<UserActivityControllerGetWeeklyActiveUsersData, any>({
      path: `/api/user-activity/weekly`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags user-activity
   * @name UserActivityControllerGetMonthlyActiveUsers
   * @summary 获取本月活跃用户数
   * @request GET:/api/user-activity/monthly
   * @response `200` `UserActivityControllerGetMonthlyActiveUsersData` 获取成功
   */
  userActivityControllerGetMonthlyActiveUsers = (params: RequestParams = {}) =>
    this.http.request<UserActivityControllerGetMonthlyActiveUsersData, any>({
      path: `/api/user-activity/monthly`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags user-activity
   * @name UserActivityControllerGetActiveUsersTrend
   * @summary 获取活跃用户趋势
   * @request GET:/api/user-activity/trend
   * @response `200` `UserActivityControllerGetActiveUsersTrendData` 获取成功
   */
  userActivityControllerGetActiveUsersTrend = (
    query: UserActivityControllerGetActiveUsersTrendParams,
    params: RequestParams = {},
  ) =>
    this.http.request<UserActivityControllerGetActiveUsersTrendData, any>({
      path: `/api/user-activity/trend`,
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags user-activity
   * @name UserActivityControllerGetInactiveUsers
   * @summary 获取不活跃用户列表
   * @request GET:/api/user-activity/inactive
   * @response `200` `UserActivityControllerGetInactiveUsersData` 获取成功
   */
  userActivityControllerGetInactiveUsers = (
    query: UserActivityControllerGetInactiveUsersParams,
    params: RequestParams = {},
  ) =>
    this.http.request<UserActivityControllerGetInactiveUsersData, any>({
      path: `/api/user-activity/inactive`,
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags user-activity
   * @name UserActivityControllerGetActivityDistribution
   * @summary 获取用户活跃度分布
   * @request GET:/api/user-activity/distribution
   * @response `200` `UserActivityControllerGetActivityDistributionData` 获取成功
   */
  userActivityControllerGetActivityDistribution = (
    params: RequestParams = {},
  ) =>
    this.http.request<UserActivityControllerGetActivityDistributionData, any>({
      path: `/api/user-activity/distribution`,
      method: "GET",
      ...params,
    });
}
