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
  UserControllerListAllData,
  UserControllerMeData,
  UserControllerSetRoleData,
} from "./data-contracts";
import { HttpClient, RequestParams } from "./http-client";

export class UsersApi<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  /**
   * No description
   *
   * @tags users
   * @name UserControllerMe
   * @request GET:/users/me
   * @response `200` `UserControllerMeData`
   */
  userControllerMe = (params: RequestParams = {}) =>
    this.http.request<UserControllerMeData, any>({
      path: `/users/me`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags users
   * @name UserControllerListAll
   * @request GET:/users
   * @response `200` `UserControllerListAllData`
   */
  userControllerListAll = (params: RequestParams = {}) =>
    this.http.request<UserControllerListAllData, any>({
      path: `/users`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags users
   * @name UserControllerSetRole
   * @request POST:/users/{id}/role
   * @response `201` `UserControllerSetRoleData`
   */
  userControllerSetRole = (id: number, params: RequestParams = {}) =>
    this.http.request<UserControllerSetRoleData, any>({
      path: `/users/${id}/role`,
      method: "POST",
      ...params,
    });
}
