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
  BlogControllerCreateData,
  BlogControllerDeleteData,
  BlogControllerListData,
  BlogControllerListParams,
  BlogControllerSlugData,
  BlogControllerUpdateData,
  BlogCreateDto,
  BlogSlugDto,
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
   * @tags blog, 博客相关接口
   * @name BlogControllerList
   * @request GET:/blog/list
   * @response `200` `BlogControllerListData`
   */
  blogControllerList = (
    query: BlogControllerListParams,
    params: RequestParams = {},
  ) =>
    this.http.request<BlogControllerListData, any>({
      path: `/blog/list`,
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags blog, 博客相关接口
   * @name BlogControllerCreate
   * @request POST:/blog/create
   * @response `201` `BlogControllerCreateData`
   */
  blogControllerCreate = (data: BlogCreateDto, params: RequestParams = {}) =>
    this.http.request<BlogControllerCreateData, any>({
      path: `/blog/create`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags blog, 博客相关接口
   * @name BlogControllerUpdate
   * @request POST:/blog/update
   * @response `201` `BlogControllerUpdateData`
   */
  blogControllerUpdate = (data: BlogUpdateDto, params: RequestParams = {}) =>
    this.http.request<BlogControllerUpdateData, any>({
      path: `/blog/update`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags blog, 博客相关接口
   * @name BlogControllerDelete
   * @request POST:/blog/delete
   * @response `201` `BlogControllerDeleteData`
   */
  blogControllerDelete = (data: ByIdDto, params: RequestParams = {}) =>
    this.http.request<BlogControllerDeleteData, any>({
      path: `/blog/delete`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags blog, 博客相关接口
   * @name BlogControllerSlug
   * @request POST:/blog/slug
   * @response `201` `BlogControllerSlugData`
   */
  blogControllerSlug = (data: BlogSlugDto, params: RequestParams = {}) =>
    this.http.request<BlogControllerSlugData, any>({
      path: `/blog/slug`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
}
