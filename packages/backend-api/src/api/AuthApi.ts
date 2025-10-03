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
  AuthControllerLogoutData,
  AuthControllerRefreshData,
  AuthControllerRegisterData,
  AuthControllerSendVerificationCodeData,
  AuthControllerVerifyEmailData,
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
   * @summary 用户注册
   * @request POST:/api/auth/register
   * @response `201` `AuthControllerRegisterData` 注册成功
   * @response `400` `void` 注册失败
   */
  authControllerRegister = (data: CreateUserDto, params: RequestParams = {}) =>
    this.http.request<AuthControllerRegisterData, void>({
      path: `/api/auth/register`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags auth
   * @name AuthControllerVerifyEmail
   * @summary 验证邮箱
   * @request POST:/api/auth/verify-email
   * @response `200` `AuthControllerVerifyEmailData` 验证成功
   * @response `400` `void` 验证失败
   */
  authControllerVerifyEmail = (params: RequestParams = {}) =>
    this.http.request<AuthControllerVerifyEmailData, void>({
      path: `/api/auth/verify-email`,
      method: "POST",
      ...params,
    });
  /**
   * No description
   *
   * @tags auth
   * @name AuthControllerLogin
   * @summary 用户登录
   * @request POST:/api/auth/login
   * @response `200` `AuthControllerLoginData` 登录成功
   * @response `401` `void` 登录失败
   */
  authControllerLogin = (data: LoginDto, params: RequestParams = {}) =>
    this.http.request<AuthControllerLoginData, void>({
      path: `/api/auth/login`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags auth
   * @name AuthControllerRefresh
   * @summary 刷新Access Token
   * @request POST:/api/auth/refresh
   * @response `200` `AuthControllerRefreshData` 刷新成功
   * @response `401` `void` 刷新失败
   */
  authControllerRefresh = (params: RequestParams = {}) =>
    this.http.request<AuthControllerRefreshData, void>({
      path: `/api/auth/refresh`,
      method: "POST",
      ...params,
    });
  /**
   * No description
   *
   * @tags auth
   * @name AuthControllerLogout
   * @summary 用户登出
   * @request POST:/api/auth/logout
   * @response `200` `AuthControllerLogoutData` 登出成功
   */
  authControllerLogout = (params: RequestParams = {}) =>
    this.http.request<AuthControllerLogoutData, any>({
      path: `/api/auth/logout`,
      method: "POST",
      ...params,
    });
  /**
   * No description
   *
   * @tags auth
   * @name AuthControllerSendVerificationCode
   * @summary 发送验证码
   * @request POST:/api/auth/send-verification-code
   * @response `200` `AuthControllerSendVerificationCodeData` 发送成功
   * @response `400` `void` 发送失败
   */
  authControllerSendVerificationCode = (params: RequestParams = {}) =>
    this.http.request<AuthControllerSendVerificationCodeData, void>({
      path: `/api/auth/send-verification-code`,
      method: "POST",
      ...params,
    });
}
