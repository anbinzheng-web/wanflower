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
  ProductControllerCreateData,
  ProductControllerDeleteData,
  ProductControllerDeleteImageData,
  ProductControllerDetailData,
  ProductControllerListData,
  ProductControllerListParams,
  ProductControllerUpdateData,
  ProductControllerUploadData,
  ProductControllerViewsData,
  ProductCreateDto,
  ProductImageUploadDto,
  ProductUpdateDto,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class ProductApi<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  /**
   * No description
   *
   * @tags product
   * @name ProductControllerList
   * @request GET:/product/list
   * @response `200` `ProductControllerListData`
   */
  productControllerList = (
    query: ProductControllerListParams,
    params: RequestParams = {},
  ) =>
    this.http.request<ProductControllerListData, any>({
      path: `/product/list`,
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags product
   * @name ProductControllerDetail
   * @request GET:/product/detail
   * @response `200` `ProductControllerDetailData`
   */
  productControllerDetail = (data: ByIdDto, params: RequestParams = {}) =>
    this.http.request<ProductControllerDetailData, any>({
      path: `/product/detail`,
      method: "GET",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags product
   * @name ProductControllerCreate
   * @request POST:/product/create
   * @response `201` `ProductControllerCreateData`
   */
  productControllerCreate = (
    data: ProductCreateDto,
    params: RequestParams = {},
  ) =>
    this.http.request<ProductControllerCreateData, any>({
      path: `/product/create`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags product
   * @name ProductControllerUpdate
   * @request POST:/product/update
   * @response `201` `ProductControllerUpdateData`
   */
  productControllerUpdate = (
    data: ProductUpdateDto,
    params: RequestParams = {},
  ) =>
    this.http.request<ProductControllerUpdateData, any>({
      path: `/product/update`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags product
   * @name ProductControllerDelete
   * @request POST:/product/delete
   * @response `201` `ProductControllerDeleteData`
   */
  productControllerDelete = (data: ByIdDto, params: RequestParams = {}) =>
    this.http.request<ProductControllerDeleteData, any>({
      path: `/product/delete`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
  /**
   * No description
   *
   * @tags product
   * @name ProductControllerUpload
   * @request POST:/product/upload_image
   * @response `201` `ProductControllerUploadData`
   */
  productControllerUpload = (
    data: ProductImageUploadDto,
    params: RequestParams = {},
  ) =>
    this.http.request<ProductControllerUploadData, any>({
      path: `/product/upload_image`,
      method: "POST",
      body: data,
      type: ContentType.FormData,
      ...params,
    });
  /**
   * No description
   *
   * @tags product
   * @name ProductControllerDeleteImage
   * @request POST:/product/delete_image/{id}
   * @response `201` `ProductControllerDeleteImageData`
   */
  productControllerDeleteImage = (id: string, params: RequestParams = {}) =>
    this.http.request<ProductControllerDeleteImageData, any>({
      path: `/product/delete_image/${id}`,
      method: "POST",
      ...params,
    });
  /**
   * @description 商品浏览量+1
   *
   * @tags product
   * @name ProductControllerViews
   * @request POST:/product/views
   * @response `201` `ProductControllerViewsData`
   */
  productControllerViews = (data: ByIdDto, params: RequestParams = {}) =>
    this.http.request<ProductControllerViewsData, any>({
      path: `/product/views`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      ...params,
    });
}
