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
  MediaBatchUploadDto,
  MediaControllerBatchUploadMediaData,
  MediaControllerDeleteMediaData,
  MediaControllerGetBusinessTypesData,
  MediaControllerGetMediaCategoriesData,
  MediaControllerGetMediaListData,
  MediaControllerGetMediaListParams,
  MediaControllerUpdateMediaData,
  MediaControllerUploadMediaData,
  MediaDeleteDto,
  MediaUpdateDto,
  MediaUploadDto,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class MediaApi<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  /**
   * No description
   *
   * @tags media
   * @name MediaControllerUploadMedia
   * @summary 上传单个媒体文件
   * @request POST:/api/media/upload
   * @secure
   * @response `200` `MediaControllerUploadMediaData`
   * @response `400` `void` 文件格式或大小不符合要求
   */
  mediaControllerUploadMedia = (
    data: MediaUploadDto,
    params: RequestParams = {},
  ) =>
    this.http.request<MediaControllerUploadMediaData, void>({
      path: `/api/media/upload`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.FormData,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags media
   * @name MediaControllerBatchUploadMedia
   * @summary 批量上传媒体文件
   * @request POST:/api/media/batch-upload
   * @secure
   * @response `200` `MediaControllerBatchUploadMediaData`
   * @response `400` `void` 文件格式或大小不符合要求
   */
  mediaControllerBatchUploadMedia = (
    data: MediaBatchUploadDto,
    params: RequestParams = {},
  ) =>
    this.http.request<MediaControllerBatchUploadMediaData, void>({
      path: `/api/media/batch-upload`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.FormData,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags media
   * @name MediaControllerGetMediaList
   * @summary 获取媒体列表
   * @request GET:/api/media/list
   * @secure
   * @response `200` `MediaControllerGetMediaListData`
   */
  mediaControllerGetMediaList = (
    query: MediaControllerGetMediaListParams,
    params: RequestParams = {},
  ) =>
    this.http.request<MediaControllerGetMediaListData, any>({
      path: `/api/media/list`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags media
   * @name MediaControllerUpdateMedia
   * @summary 更新媒体信息
   * @request PUT:/api/media/update
   * @secure
   * @response `200` `MediaControllerUpdateMediaData`
   * @response `403` `void` 无权限修改此文件
   * @response `404` `void` 媒体文件不存在
   */
  mediaControllerUpdateMedia = (
    data: MediaUpdateDto,
    params: RequestParams = {},
  ) =>
    this.http.request<MediaControllerUpdateMediaData, void>({
      path: `/api/media/update`,
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
   * @tags media
   * @name MediaControllerDeleteMedia
   * @summary 删除媒体文件
   * @request DELETE:/api/media/delete
   * @secure
   * @response `200` `MediaControllerDeleteMediaData`
   * @response `403` `void` 无权限删除此文件
   * @response `404` `void` 媒体文件不存在
   */
  mediaControllerDeleteMedia = (
    data: MediaDeleteDto,
    params: RequestParams = {},
  ) =>
    this.http.request<MediaControllerDeleteMediaData, void>({
      path: `/api/media/delete`,
      method: "DELETE",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags media
   * @name MediaControllerGetMediaCategories
   * @summary 获取媒体分类列表
   * @request GET:/api/media/categories
   * @secure
   * @response `200` `MediaControllerGetMediaCategoriesData`
   */
  mediaControllerGetMediaCategories = (params: RequestParams = {}) =>
    this.http.request<MediaControllerGetMediaCategoriesData, any>({
      path: `/api/media/categories`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags media
   * @name MediaControllerGetBusinessTypes
   * @summary 获取业务类型列表
   * @request GET:/api/media/business-types
   * @secure
   * @response `200` `MediaControllerGetBusinessTypesData`
   */
  mediaControllerGetBusinessTypes = (params: RequestParams = {}) =>
    this.http.request<MediaControllerGetBusinessTypesData, any>({
      path: `/api/media/business-types`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
}
