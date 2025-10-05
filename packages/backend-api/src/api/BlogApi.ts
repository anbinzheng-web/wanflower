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
  BlogCategoryCreateDto,
  BlogCategoryUpdateDto,
  BlogControllerAdminTestData,
  BlogControllerCreateCategoryData,
  BlogControllerCreateData,
  BlogControllerCreateTagData,
  BlogControllerDeleteCategoryData,
  BlogControllerDeleteData,
  BlogControllerDeleteTagData,
  BlogControllerFindByIdData,
  BlogControllerFindBySlugData,
  BlogControllerIncrementViewCountData,
  BlogControllerListCategoriesData,
  BlogControllerListCategoriesParams,
  BlogControllerListData,
  BlogControllerListParams,
  BlogControllerListTagsData,
  BlogControllerListTagsParams,
  BlogControllerUpdateCategoryData,
  BlogControllerUpdateData,
  BlogControllerUpdateTagData,
  BlogCreateDto,
  BlogSlugDto,
  BlogTagCreateDto,
  BlogTagUpdateDto,
  BlogUpdateDto,
  ByIdDto,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class BlogApi<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  /**
   * No description
   *
   * @tags blog
   * @name BlogControllerList
   * @summary 获取博客列表
   * @request GET:/api/blog/list
   * @response `200` `BlogControllerListData`
   */
  blogControllerList = (
    query: BlogControllerListParams,
    params: RequestParams = {},
  ) =>
    this.http.request<BlogControllerListData, any>({
      path: `/api/blog/list`,
      method: "GET",
      query: query,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags blog
   * @name BlogControllerFindById
   * @summary 根据ID获取博客详情
   * @request GET:/api/blog/{id}
   * @response `200` `BlogControllerFindByIdData`
   * @response `404` `void` 博客不存在
   */
  blogControllerFindById = (id: string, params: RequestParams = {}) =>
    this.http.request<BlogControllerFindByIdData, void>({
      path: `/api/blog/${id}`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags blog
   * @name BlogControllerFindBySlug
   * @summary 根据slug获取博客详情
   * @request POST:/api/blog/slug
   * @response `200` `BlogControllerFindBySlugData`
   * @response `404` `void` 博客不存在
   */
  blogControllerFindBySlug = (data: BlogSlugDto, params: RequestParams = {}) =>
    this.http.request<BlogControllerFindBySlugData, void>({
      path: `/api/blog/slug`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags blog
   * @name BlogControllerCreate
   * @summary 创建博客文章
   * @request POST:/api/blog/create
   * @response `200` `BlogControllerCreateData`
   * @response `400` `void` 请求参数错误
   */
  blogControllerCreate = (data: BlogCreateDto, params: RequestParams = {}) =>
    this.http.request<BlogControllerCreateData, void>({
      path: `/api/blog/create`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags blog
   * @name BlogControllerUpdate
   * @summary 更新博客文章
   * @request PUT:/api/blog/update
   * @response `200` `BlogControllerUpdateData`
   * @response `400` `void` 请求参数错误
   * @response `404` `void` 博客不存在
   */
  blogControllerUpdate = (data: BlogUpdateDto, params: RequestParams = {}) =>
    this.http.request<BlogControllerUpdateData, void>({
      path: `/api/blog/update`,
      method: "PUT",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags blog
   * @name BlogControllerDelete
   * @summary 删除博客文章
   * @request DELETE:/api/blog/delete
   * @response `200` `BlogControllerDeleteData`
   * @response `404` `void` 博客不存在
   */
  blogControllerDelete = (data: ByIdDto, params: RequestParams = {}) =>
    this.http.request<BlogControllerDeleteData, void>({
      path: `/api/blog/delete`,
      method: "DELETE",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags blog
   * @name BlogControllerIncrementViewCount
   * @summary 增加博客浏览量
   * @request POST:/api/blog/{id}/view
   * @response `200` `BlogControllerIncrementViewCountData`
   * @response `404` `void` 博客不存在
   */
  blogControllerIncrementViewCount = (id: string, params: RequestParams = {}) =>
    this.http.request<BlogControllerIncrementViewCountData, void>({
      path: `/api/blog/${id}/view`,
      method: "POST",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags blog
   * @name BlogControllerListTags
   * @summary 获取标签列表
   * @request GET:/api/blog/tags/list
   * @response `200` `BlogControllerListTagsData`
   */
  blogControllerListTags = (
    query: BlogControllerListTagsParams,
    params: RequestParams = {},
  ) =>
    this.http.request<BlogControllerListTagsData, any>({
      path: `/api/blog/tags/list`,
      method: "GET",
      query: query,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags blog
   * @name BlogControllerCreateTag
   * @summary 创建标签
   * @request POST:/api/blog/tags/create
   * @response `200` `BlogControllerCreateTagData`
   * @response `400` `void` 请求参数错误
   */
  blogControllerCreateTag = (
    data: BlogTagCreateDto,
    params: RequestParams = {},
  ) =>
    this.http.request<BlogControllerCreateTagData, void>({
      path: `/api/blog/tags/create`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags blog
   * @name BlogControllerUpdateTag
   * @summary 更新标签
   * @request PUT:/api/blog/tags/update
   * @response `200` `BlogControllerUpdateTagData`
   * @response `400` `void` 请求参数错误
   * @response `404` `void` 标签不存在
   */
  blogControllerUpdateTag = (
    data: BlogTagUpdateDto,
    params: RequestParams = {},
  ) =>
    this.http.request<BlogControllerUpdateTagData, void>({
      path: `/api/blog/tags/update`,
      method: "PUT",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags blog
   * @name BlogControllerDeleteTag
   * @summary 删除标签
   * @request DELETE:/api/blog/tags/delete
   * @response `200` `BlogControllerDeleteTagData`
   * @response `404` `void` 标签不存在
   */
  blogControllerDeleteTag = (data: ByIdDto, params: RequestParams = {}) =>
    this.http.request<BlogControllerDeleteTagData, void>({
      path: `/api/blog/tags/delete`,
      method: "DELETE",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags blog
   * @name BlogControllerListCategories
   * @summary 获取分类列表
   * @request GET:/api/blog/categories/list
   * @response `200` `BlogControllerListCategoriesData`
   */
  blogControllerListCategories = (
    query: BlogControllerListCategoriesParams,
    params: RequestParams = {},
  ) =>
    this.http.request<BlogControllerListCategoriesData, any>({
      path: `/api/blog/categories/list`,
      method: "GET",
      query: query,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags blog
   * @name BlogControllerCreateCategory
   * @summary 创建分类
   * @request POST:/api/blog/categories/create
   * @response `200` `BlogControllerCreateCategoryData`
   * @response `400` `void` 请求参数错误
   */
  blogControllerCreateCategory = (
    data: BlogCategoryCreateDto,
    params: RequestParams = {},
  ) =>
    this.http.request<BlogControllerCreateCategoryData, void>({
      path: `/api/blog/categories/create`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags blog
   * @name BlogControllerUpdateCategory
   * @summary 更新分类
   * @request PUT:/api/blog/categories/update
   * @response `200` `BlogControllerUpdateCategoryData`
   * @response `400` `void` 请求参数错误
   * @response `404` `void` 分类不存在
   */
  blogControllerUpdateCategory = (
    data: BlogCategoryUpdateDto,
    params: RequestParams = {},
  ) =>
    this.http.request<BlogControllerUpdateCategoryData, void>({
      path: `/api/blog/categories/update`,
      method: "PUT",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags blog
   * @name BlogControllerDeleteCategory
   * @summary 删除分类
   * @request DELETE:/api/blog/categories/delete
   * @response `200` `BlogControllerDeleteCategoryData`
   * @response `404` `void` 分类不存在
   */
  blogControllerDeleteCategory = (data: ByIdDto, params: RequestParams = {}) =>
    this.http.request<BlogControllerDeleteCategoryData, void>({
      path: `/api/blog/categories/delete`,
      method: "DELETE",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags blog
   * @name BlogControllerAdminTest
   * @summary 博客模块健康检查
   * @request GET:/api/blog/admin/test
   * @response `200` `BlogControllerAdminTestData`
   */
  blogControllerAdminTest = (params: RequestParams = {}) =>
    this.http.request<BlogControllerAdminTestData, any>({
      path: `/api/blog/admin/test`,
      method: "GET",
      format: "json",
      ...params,
    });
}
