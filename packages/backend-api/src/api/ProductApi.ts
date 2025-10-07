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
  CategoryCreateDto,
  CategoryUpdateDto,
  ProductAttributeCreateDto,
  ProductAttributeUpdateDto,
  ProductBatchDeleteDto,
  ProductBatchUpdateStatusDto,
  ProductControllerBatchDeleteProductsData,
  ProductControllerBatchUpdateProductStatusData,
  ProductControllerBatchUploadProductMediaData,
  ProductControllerCreateCategoryData,
  ProductControllerCreateProductAttributeData,
  ProductControllerCreateProductData,
  ProductControllerDeleteCategoryData,
  ProductControllerDeleteProductAttributeData,
  ProductControllerDeleteProductData,
  ProductControllerDeleteProductMediaData,
  ProductControllerGetCategoryListData,
  ProductControllerGetCategoryListParams,
  ProductControllerGetProductAttributesData,
  ProductControllerGetProductAttributesParams,
  ProductControllerGetProductBySkuData,
  ProductControllerGetProductDetailData,
  ProductControllerGetProductListData,
  ProductControllerGetProductListParams,
  ProductControllerGetProductMediaByIdData,
  ProductControllerGetProductMediaListData,
  ProductControllerGetProductMediaStatsData,
  ProductControllerIncrementProductViewData,
  ProductControllerUpdateCategoryData,
  ProductControllerUpdateProductAttributeData,
  ProductControllerUpdateProductData,
  ProductControllerUpdateProductMediaData,
  ProductControllerUploadProductMediaData,
  ProductCreateDto,
  ProductMediaBatchUploadOrderDto,
  ProductMediaDeleteDto,
  ProductMediaUpdateDto,
  ProductMediaUploadDto,
  ProductUpdateDto,
  ProductViewDto,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class ProductApi<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  /**
   * @description 支持筛选、排序、分页的产品列表
   *
   * @tags product
   * @name ProductControllerGetProductList
   * @summary 获取产品列表
   * @request GET:/api/product/list
   * @response `200` `ProductControllerGetProductListData`
   */
  productControllerGetProductList = (
    query: ProductControllerGetProductListParams,
    params: RequestParams = {},
  ) =>
    this.http.request<ProductControllerGetProductListData, any>({
      path: `/api/product/list`,
      method: "GET",
      query: query,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags product
   * @name ProductControllerGetProductDetail
   * @summary 获取产品详情
   * @request GET:/api/product/detail/{id}
   * @response `200` `ProductControllerGetProductDetailData`
   */
  productControllerGetProductDetail = (
    id: number,
    params: RequestParams = {},
  ) =>
    this.http.request<ProductControllerGetProductDetailData, any>({
      path: `/api/product/detail/${id}`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags product
   * @name ProductControllerGetProductBySku
   * @summary 通过SKU获取产品详情
   * @request GET:/api/product/sku/{sku}
   * @response `200` `ProductControllerGetProductBySkuData`
   * @response `404` `void` 产品不存在
   */
  productControllerGetProductBySku = (
    sku: string,
    params: RequestParams = {},
  ) =>
    this.http.request<ProductControllerGetProductBySkuData, void>({
      path: `/api/product/sku/${sku}`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags product
   * @name ProductControllerIncrementProductView
   * @summary 增加产品浏览量
   * @request POST:/api/product/view
   * @response `200` `ProductControllerIncrementProductViewData`
   */
  productControllerIncrementProductView = (
    data: ProductViewDto,
    params: RequestParams = {},
  ) =>
    this.http.request<ProductControllerIncrementProductViewData, any>({
      path: `/api/product/view`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description 需要员工或管理员权限
   *
   * @tags product
   * @name ProductControllerCreateProduct
   * @summary 创建产品
   * @request POST:/api/product/create
   * @secure
   * @response `200` `ProductControllerCreateProductData`
   * @response `400` `void` 参数错误
   * @response `403` `void` 权限不足
   */
  productControllerCreateProduct = (
    data: ProductCreateDto,
    params: RequestParams = {},
  ) =>
    this.http.request<ProductControllerCreateProductData, void>({
      path: `/api/product/create`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description 需要员工或管理员权限
   *
   * @tags product
   * @name ProductControllerUpdateProduct
   * @summary 更新产品
   * @request PUT:/api/product/update
   * @secure
   * @response `200` `ProductControllerUpdateProductData`
   * @response `403` `void` 权限不足
   * @response `404` `void` 产品不存在
   */
  productControllerUpdateProduct = (
    data: ProductUpdateDto,
    params: RequestParams = {},
  ) =>
    this.http.request<ProductControllerUpdateProductData, void>({
      path: `/api/product/update`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description 软删除，需要员工或管理员权限
   *
   * @tags product
   * @name ProductControllerDeleteProduct
   * @summary 删除产品
   * @request DELETE:/api/product/delete/{id}
   * @secure
   * @response `200` `ProductControllerDeleteProductData` 删除成功
   * @response `403` `void` 权限不足
   * @response `404` `void` 产品不存在
   */
  productControllerDeleteProduct = (id: number, params: RequestParams = {}) =>
    this.http.request<ProductControllerDeleteProductData, void>({
      path: `/api/product/delete/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * @description 需要员工或管理员权限
   *
   * @tags product
   * @name ProductControllerBatchDeleteProducts
   * @summary 批量删除产品
   * @request POST:/api/product/batch-delete
   * @secure
   * @response `200` `ProductControllerBatchDeleteProductsData` 删除成功
   * @response `403` `void` 权限不足
   */
  productControllerBatchDeleteProducts = (
    data: ProductBatchDeleteDto,
    params: RequestParams = {},
  ) =>
    this.http.request<ProductControllerBatchDeleteProductsData, void>({
      path: `/api/product/batch-delete`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 需要员工或管理员权限
   *
   * @tags product
   * @name ProductControllerBatchUpdateProductStatus
   * @summary 批量更新产品状态
   * @request POST:/api/product/batch-update-status
   * @secure
   * @response `200` `ProductControllerBatchUpdateProductStatusData` 更新成功
   * @response `403` `void` 权限不足
   */
  productControllerBatchUpdateProductStatus = (
    data: ProductBatchUpdateStatusDto,
    params: RequestParams = {},
  ) =>
    this.http.request<ProductControllerBatchUpdateProductStatusData, void>({
      path: `/api/product/batch-update-status`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 使用统一媒体管理系统，支持图片和视频，需要员工或管理员权限
   *
   * @tags product
   * @name ProductControllerUploadProductMedia
   * @summary 上传产品媒体文件
   * @request POST:/api/product/media/upload
   * @secure
   * @response `201` `ProductControllerUploadProductMediaData` 上传成功
   * @response `400` `void` 文件格式或大小不符合要求
   * @response `403` `void` 权限不足
   */
  productControllerUploadProductMedia = (
    data: ProductMediaUploadDto,
    params: RequestParams = {},
  ) =>
    this.http.request<ProductControllerUploadProductMediaData, void>({
      path: `/api/product/media/upload`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.FormData,
      ...params,
    });
  /**
   * @description 使用统一媒体管理系统，需要员工或管理员权限
   *
   * @tags product
   * @name ProductControllerBatchUploadProductMedia
   * @summary 批量上传产品媒体文件
   * @request POST:/api/product/media/batch-upload
   * @secure
   * @response `201` `ProductControllerBatchUploadProductMediaData` 上传成功
   * @response `400` `void` 文件格式或大小不符合要求
   * @response `403` `void` 权限不足
   */
  productControllerBatchUploadProductMedia = (
    data: ProductMediaBatchUploadOrderDto,
    params: RequestParams = {},
  ) =>
    this.http.request<ProductControllerBatchUploadProductMediaData, void>({
      path: `/api/product/media/batch-upload`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.FormData,
      ...params,
    });
  /**
   * @description 需要员工或管理员权限
   *
   * @tags product
   * @name ProductControllerUpdateProductMedia
   * @summary 更新媒体文件信息
   * @request PUT:/api/product/media/update
   * @secure
   * @response `200` `ProductControllerUpdateProductMediaData` 更新成功
   * @response `403` `void` 权限不足
   * @response `404` `void` 媒体文件不存在
   */
  productControllerUpdateProductMedia = (
    data: ProductMediaUpdateDto,
    params: RequestParams = {},
  ) =>
    this.http.request<ProductControllerUpdateProductMediaData, void>({
      path: `/api/product/media/update`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 需要员工或管理员权限
   *
   * @tags product
   * @name ProductControllerDeleteProductMedia
   * @summary 删除媒体文件
   * @request DELETE:/api/product/media/delete
   * @secure
   * @response `200` `ProductControllerDeleteProductMediaData` 删除成功
   * @response `403` `void` 权限不足
   * @response `404` `void` 媒体文件不存在
   */
  productControllerDeleteProductMedia = (
    data: ProductMediaDeleteDto,
    params: RequestParams = {},
  ) =>
    this.http.request<ProductControllerDeleteProductMediaData, void>({
      path: `/api/product/media/delete`,
      method: "DELETE",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 使用统一媒体管理系统，需要员工或管理员权限
   *
   * @tags product
   * @name ProductControllerGetProductMediaList
   * @summary 获取产品媒体列表
   * @request GET:/api/product/media/list/{productId}
   * @secure
   * @response `200` `ProductControllerGetProductMediaListData` 获取成功
   */
  productControllerGetProductMediaList = (
    productId: number,
    params: RequestParams = {},
  ) =>
    this.http.request<ProductControllerGetProductMediaListData, any>({
      path: `/api/product/media/list/${productId}`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description 使用统一媒体管理系统，需要员工或管理员权限
   *
   * @tags product
   * @name ProductControllerGetProductMediaById
   * @summary 获取单个媒体文件信息
   * @request GET:/api/product/media/{mediaId}
   * @secure
   * @response `200` `ProductControllerGetProductMediaByIdData` 获取成功
   * @response `404` `void` 媒体文件不存在
   */
  productControllerGetProductMediaById = (
    mediaId: number,
    params: RequestParams = {},
  ) =>
    this.http.request<ProductControllerGetProductMediaByIdData, void>({
      path: `/api/product/media/${mediaId}`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description 使用统一媒体管理系统，需要员工或管理员权限
   *
   * @tags product
   * @name ProductControllerGetProductMediaStats
   * @summary 获取产品媒体统计
   * @request GET:/api/product/media/stats/{productId}
   * @secure
   * @response `200` `ProductControllerGetProductMediaStatsData` 获取成功
   */
  productControllerGetProductMediaStats = (
    productId: number,
    params: RequestParams = {},
  ) =>
    this.http.request<ProductControllerGetProductMediaStatsData, any>({
      path: `/api/product/media/stats/${productId}`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags product
   * @name ProductControllerGetCategoryList
   * @summary 获取产品分类列表
   * @request GET:/api/product/category/list
   * @response `200` `ProductControllerGetCategoryListData`
   */
  productControllerGetCategoryList = (
    query: ProductControllerGetCategoryListParams,
    params: RequestParams = {},
  ) =>
    this.http.request<ProductControllerGetCategoryListData, any>({
      path: `/api/product/category/list`,
      method: "GET",
      query: query,
      format: "json",
      ...params,
    });
  /**
   * @description 需要员工或管理员权限
   *
   * @tags product
   * @name ProductControllerCreateCategory
   * @summary 创建产品分类
   * @request POST:/api/product/category/create
   * @secure
   * @response `201` `ProductControllerCreateCategoryData` 创建成功
   * @response `400` `void` 参数错误
   * @response `403` `void` 权限不足
   */
  productControllerCreateCategory = (
    data: CategoryCreateDto,
    params: RequestParams = {},
  ) =>
    this.http.request<ProductControllerCreateCategoryData, void>({
      path: `/api/product/category/create`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 需要员工或管理员权限
   *
   * @tags product
   * @name ProductControllerUpdateCategory
   * @summary 更新产品分类
   * @request PUT:/api/product/category/update
   * @secure
   * @response `200` `ProductControllerUpdateCategoryData` 更新成功
   * @response `403` `void` 权限不足
   * @response `404` `void` 分类不存在
   */
  productControllerUpdateCategory = (
    data: CategoryUpdateDto,
    params: RequestParams = {},
  ) =>
    this.http.request<ProductControllerUpdateCategoryData, void>({
      path: `/api/product/category/update`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 仅管理员权限，且分类下不能有产品或子分类
   *
   * @tags product
   * @name ProductControllerDeleteCategory
   * @summary 删除产品分类
   * @request DELETE:/api/product/category/delete/{id}
   * @secure
   * @response `200` `ProductControllerDeleteCategoryData` 删除成功
   * @response `400` `void` 分类下有产品或子分类，无法删除
   * @response `403` `void` 权限不足
   * @response `404` `void` 分类不存在
   */
  productControllerDeleteCategory = (id: number, params: RequestParams = {}) =>
    this.http.request<ProductControllerDeleteCategoryData, void>({
      path: `/api/product/category/delete/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * @description 需要员工或管理员权限
   *
   * @tags product
   * @name ProductControllerGetProductAttributes
   * @summary 获取产品属性列表
   * @request GET:/api/product/attributes
   * @secure
   * @response `200` `ProductControllerGetProductAttributesData`
   * @response `400` `void` 产品不存在
   * @response `403` `void` 权限不足
   */
  productControllerGetProductAttributes = (
    query: ProductControllerGetProductAttributesParams,
    params: RequestParams = {},
  ) =>
    this.http.request<ProductControllerGetProductAttributesData, void>({
      path: `/api/product/attributes`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * @description 需要员工或管理员权限
   *
   * @tags product
   * @name ProductControllerCreateProductAttribute
   * @summary 创建产品属性
   * @request POST:/api/product/attribute/create
   * @secure
   * @response `200` `ProductControllerCreateProductAttributeData`
   * @response `400` `void` 产品不存在
   * @response `403` `void` 权限不足
   */
  productControllerCreateProductAttribute = (
    data: ProductAttributeCreateDto,
    params: RequestParams = {},
  ) =>
    this.http.request<ProductControllerCreateProductAttributeData, void>({
      path: `/api/product/attribute/create`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description 需要员工或管理员权限
   *
   * @tags product
   * @name ProductControllerUpdateProductAttribute
   * @summary 更新产品属性
   * @request PUT:/api/product/attribute/update
   * @secure
   * @response `200` `ProductControllerUpdateProductAttributeData`
   * @response `400` `void` 属性不存在或产品已删除
   * @response `403` `void` 权限不足
   */
  productControllerUpdateProductAttribute = (
    data: ProductAttributeUpdateDto,
    params: RequestParams = {},
  ) =>
    this.http.request<ProductControllerUpdateProductAttributeData, void>({
      path: `/api/product/attribute/update`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * @description 需要员工或管理员权限
   *
   * @tags product
   * @name ProductControllerDeleteProductAttribute
   * @summary 删除产品属性
   * @request DELETE:/api/product/attribute/delete/{id}
   * @secure
   * @response `200` `ProductControllerDeleteProductAttributeData` 删除成功
   * @response `400` `void` 属性不存在或产品已删除
   * @response `403` `void` 权限不足
   */
  productControllerDeleteProductAttribute = (
    id: number,
    params: RequestParams = {},
  ) =>
    this.http.request<ProductControllerDeleteProductAttributeData, void>({
      path: `/api/product/attribute/delete/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
}
