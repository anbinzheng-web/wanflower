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
  CreateUserDto,
  ResetUserPasswordDto,
  UpdateUserDto,
  UpdateUserRoleDto,
  UpdateUserStatusDto,
  UserControllerListAllData,
  UserControllerMeData,
  UserControllerSetRoleData,
  UserManagementControllerCreateUserData,
  UserManagementControllerDeleteUserData,
  UserManagementControllerGetUserByEmailData,
  UserManagementControllerGetUserByIdData,
  UserManagementControllerGetUsersData,
  UserManagementControllerGetUsersParams,
  UserManagementControllerResetUserPasswordData,
  UserManagementControllerUpdateUserData,
  UserManagementControllerUpdateUserRoleData,
  UserManagementControllerUpdateUserStatusData,
  UserManagementControllerVerifyUserEmailData,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

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
   * @request GET:/api/users/me
   * @response `200` `UserControllerMeData`
   */
  userControllerMe = (params: RequestParams = {}) =>
    this.http.request<UserControllerMeData, any>({
      path: `/api/users/me`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags users
   * @name UserControllerListAll
   * @request GET:/api/users
   * @response `200` `UserControllerListAllData`
   */
  userControllerListAll = (params: RequestParams = {}) =>
    this.http.request<UserControllerListAllData, any>({
      path: `/api/users`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags users
   * @name UserControllerSetRole
   * @request POST:/api/users/{id}/role
   * @response `201` `UserControllerSetRoleData`
   */
  userControllerSetRole = (id: number, params: RequestParams = {}) =>
    this.http.request<UserControllerSetRoleData, any>({
      path: `/api/users/${id}/role`,
      method: "POST",
      ...params,
    });
  /**
   * @description 支持分页、筛选、搜索功能
   *
   * @tags users
   * @name UserManagementControllerGetUsers
   * @summary 获取用户列表
   * @request GET:/api/admin/users
   * @secure
   * @response `200` `UserManagementControllerGetUsersData`
   * @response `401` `void` 未授权
   * @response `403` `void` 权限不足
   */
  userManagementControllerGetUsers = (
    query: UserManagementControllerGetUsersParams,
    params: RequestParams = {},
  ) =>
    this.http.request<UserManagementControllerGetUsersData, void>({
      path: `/api/admin/users`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description 仅管理员可创建用户
   *
   * @tags users
   * @name UserManagementControllerCreateUser
   * @summary 创建用户
   * @request POST:/api/admin/users
   * @secure
   * @response `200` `UserManagementControllerCreateUserData`
   * @response `400` `void` 请求参数错误
   * @response `401` `void` 未授权
   * @response `403` `void` 权限不足
   */
  userManagementControllerCreateUser = (
    data: CreateUserDto,
    params: RequestParams = {},
  ) =>
    this.http.request<UserManagementControllerCreateUserData, void>({
      path: `/api/admin/users`,
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
   * @tags users
   * @name UserManagementControllerGetUserById
   * @summary 获取用户详情
   * @request GET:/api/admin/users/{id}
   * @secure
   * @response `200` `UserManagementControllerGetUserByIdData`
   * @response `401` `void` 未授权
   * @response `403` `void` 权限不足
   * @response `404` `void` 用户不存在
   */
  userManagementControllerGetUserById = (
    id: number,
    params: RequestParams = {},
  ) =>
    this.http.request<UserManagementControllerGetUserByIdData, void>({
      path: `/api/admin/users/${id}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description 仅管理员可更新用户信息
   *
   * @tags users
   * @name UserManagementControllerUpdateUser
   * @summary 更新用户信息
   * @request PUT:/api/admin/users/{id}
   * @secure
   * @response `200` `UserManagementControllerUpdateUserData`
   * @response `400` `void` 请求参数错误
   * @response `401` `void` 未授权
   * @response `403` `void` 权限不足
   * @response `404` `void` 用户不存在
   */
  userManagementControllerUpdateUser = (
    id: number,
    data: UpdateUserDto,
    params: RequestParams = {},
  ) =>
    this.http.request<UserManagementControllerUpdateUserData, void>({
      path: `/api/admin/users/${id}`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description 仅管理员可删除用户
   *
   * @tags users
   * @name UserManagementControllerDeleteUser
   * @summary 删除用户
   * @request DELETE:/api/admin/users/{id}
   * @secure
   * @response `200` `UserManagementControllerDeleteUserData`
   * @response `401` `void` 未授权
   * @response `403` `void` 权限不足
   * @response `404` `void` 用户不存在
   */
  userManagementControllerDeleteUser = (
    id: number,
    params: RequestParams = {},
  ) =>
    this.http.request<UserManagementControllerDeleteUserData, void>({
      path: `/api/admin/users/${id}`,
      method: "DELETE",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags users
   * @name UserManagementControllerGetUserByEmail
   * @summary 通过邮箱获取用户详情
   * @request GET:/api/admin/users/email/{email}
   * @secure
   * @response `200` `UserManagementControllerGetUserByEmailData`
   * @response `401` `void` 未授权
   * @response `403` `void` 权限不足
   * @response `404` `void` 用户不存在
   */
  userManagementControllerGetUserByEmail = (
    email: string,
    params: RequestParams = {},
  ) =>
    this.http.request<UserManagementControllerGetUserByEmailData, void>({
      path: `/api/admin/users/email/${email}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description 激活或禁用用户账户
   *
   * @tags users
   * @name UserManagementControllerUpdateUserStatus
   * @summary 更新用户状态
   * @request PUT:/api/admin/users/{id}/status
   * @secure
   * @response `200` `UserManagementControllerUpdateUserStatusData`
   * @response `401` `void` 未授权
   * @response `403` `void` 权限不足
   * @response `404` `void` 用户不存在
   */
  userManagementControllerUpdateUserStatus = (
    id: number,
    data: UpdateUserStatusDto,
    params: RequestParams = {},
  ) =>
    this.http.request<UserManagementControllerUpdateUserStatusData, void>({
      path: `/api/admin/users/${id}/status`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description 修改用户角色权限
   *
   * @tags users
   * @name UserManagementControllerUpdateUserRole
   * @summary 更新用户角色
   * @request PUT:/api/admin/users/{id}/role
   * @secure
   * @response `200` `UserManagementControllerUpdateUserRoleData`
   * @response `401` `void` 未授权
   * @response `403` `void` 权限不足
   * @response `404` `void` 用户不存在
   */
  userManagementControllerUpdateUserRole = (
    id: number,
    data: UpdateUserRoleDto,
    params: RequestParams = {},
  ) =>
    this.http.request<UserManagementControllerUpdateUserRoleData, void>({
      path: `/api/admin/users/${id}/role`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description 管理员重置用户密码
   *
   * @tags users
   * @name UserManagementControllerResetUserPassword
   * @summary 重置用户密码
   * @request PUT:/api/admin/users/{id}/password
   * @secure
   * @response `200` `UserManagementControllerResetUserPasswordData`
   * @response `401` `void` 未授权
   * @response `403` `void` 权限不足
   * @response `404` `void` 用户不存在
   */
  userManagementControllerResetUserPassword = (
    id: number,
    data: ResetUserPasswordDto,
    params: RequestParams = {},
  ) =>
    this.http.request<UserManagementControllerResetUserPasswordData, void>({
      path: `/api/admin/users/${id}/password`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description 管理员手动验证用户邮箱
   *
   * @tags users
   * @name UserManagementControllerVerifyUserEmail
   * @summary 验证用户邮箱
   * @request PUT:/api/admin/users/{id}/verify-email
   * @secure
   * @response `200` `UserManagementControllerVerifyUserEmailData`
   * @response `401` `void` 未授权
   * @response `403` `void` 权限不足
   * @response `404` `void` 用户不存在
   */
  userManagementControllerVerifyUserEmail = (
    id: number,
    params: RequestParams = {},
  ) =>
    this.http.request<UserManagementControllerVerifyUserEmailData, void>({
      path: `/api/admin/users/${id}/verify-email`,
      method: "PUT",
      secure: true,
      format: "json",
      ...params,
    });
}
