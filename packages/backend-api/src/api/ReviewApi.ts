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
  ByIdDto,
  ProductReviewDeleteImageDto,
  ProductReviewUploadImageDto,
  ReviewControllerCreateData,
  ReviewControllerDeleteData,
  ReviewControllerDeleteImageData,
  ReviewControllerListData,
  ReviewControllerListParams,
  ReviewControllerUpdateData,
  ReviewControllerUploadImageData,
  ReviewCreateDto,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class ReviewApi<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  /**
   * No description
   *
   * @tags review, 商品的评论
   * @name ReviewControllerCreate
   * @request POST:/review/create
   * @response `201` `ReviewControllerCreateData`
   */
  reviewControllerCreate = (
    data: ReviewCreateDto,
    params: RequestParams = {},
  ) =>
    this.http.request<ReviewControllerCreateData, any>({
      path: `/review/create`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags review, 商品的评论
   * @name ReviewControllerUpdate
   * @request POST:/review/update
   * @response `201` `ReviewControllerUpdateData`
   */
  reviewControllerUpdate = (
    data: ReviewCreateDto,
    params: RequestParams = {},
  ) =>
    this.http.request<ReviewControllerUpdateData, any>({
      path: `/review/update`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags review, 商品的评论
   * @name ReviewControllerList
   * @request GET:/review/list
   * @response `200` `ReviewControllerListData`
   */
  reviewControllerList = (
    query: ReviewControllerListParams,
    params: RequestParams = {},
  ) =>
    this.http.request<ReviewControllerListData, any>({
      path: `/review/list`,
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags review, 商品的评论
   * @name ReviewControllerDelete
   * @request POST:/review/delete
   * @response `201` `ReviewControllerDeleteData`
   */
  reviewControllerDelete = (data: ByIdDto, params: RequestParams = {}) =>
    this.http.request<ReviewControllerDeleteData, any>({
      path: `/review/delete`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags review, 商品的评论
   * @name ReviewControllerUploadImage
   * @request POST:/review/upload_image
   * @response `201` `ReviewControllerUploadImageData`
   */
  reviewControllerUploadImage = (
    data: ProductReviewUploadImageDto,
    params: RequestParams = {},
  ) =>
    this.http.request<ReviewControllerUploadImageData, any>({
      path: `/review/upload_image`,
      method: "POST",
      body: data,
      type: ContentType.FormData,
      ...params,
    });
  /**
   * No description
   *
   * @tags review, 商品的评论
   * @name ReviewControllerDeleteImage
   * @request POST:/review/delete_image
   * @response `201` `ReviewControllerDeleteImageData`
   */
  reviewControllerDeleteImage = (
    data: ProductReviewDeleteImageDto,
    params: RequestParams = {},
  ) =>
    this.http.request<ReviewControllerDeleteImageData, any>({
      path: `/review/delete_image`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
}
