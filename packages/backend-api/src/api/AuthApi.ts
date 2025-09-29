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
  AuthControllerLoginData,
  AuthControllerRegisterData,
  CreateUserDto,
  LoginDto,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class AuthApi<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  /**
   * No description
   *
   * @tags auth
   * @name AuthControllerRegister
   * @request POST:/auth/register
   * @response `201` `AuthControllerRegisterData`
   */
  authControllerRegister = (data: CreateUserDto, params: RequestParams = {}) =>
    this.http.request<AuthControllerRegisterData, any>({
      path: `/auth/register`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags auth
   * @name AuthControllerLogin
   * @request POST:/auth/login
   * @response `201` `AuthControllerLoginData`
   */
  authControllerLogin = (data: LoginDto, params: RequestParams = {}) =>
    this.http.request<AuthControllerLoginData, any>({
      path: `/auth/login`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
}
