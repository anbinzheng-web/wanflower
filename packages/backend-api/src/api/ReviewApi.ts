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
  ReviewBatchModerationDto,
  ReviewControllerAdminDeleteReviewMediaData,
  ReviewControllerBatchModerateReviewsData,
  ReviewControllerBatchUploadReviewMediaData,
  ReviewControllerCreateReviewData,
  ReviewControllerDeleteReviewData,
  ReviewControllerDeleteReviewMediaData,
  ReviewControllerGetAdminReviewListData,
  ReviewControllerGetAdminReviewListParams,
  ReviewControllerGetMyReviewMediaData,
  ReviewControllerGetReviewDetailData,
  ReviewControllerGetReviewListData,
  ReviewControllerGetReviewListParams,
  ReviewControllerGetReviewMediaData,
  ReviewControllerGetReviewStatsData,
  ReviewControllerModerateReviewData,
  ReviewControllerReportReviewData,
  ReviewControllerUpdateReviewData,
  ReviewControllerUpdateReviewMediaData,
  ReviewControllerUploadReviewMediaData,
  ReviewControllerVoteReviewHelpfulData,
  ReviewCreateDto,
  ReviewDeleteDto,
  ReviewHelpfulVoteDto,
  ReviewMediaDeleteDto,
  ReviewMediaUpdateDto,
  ReviewMediaUploadDto,
  ReviewModerationDto,
  ReviewReportDto,
  ReviewUpdateDto,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class ReviewApi<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  /**
   * @description 公开接口，获取已审核通过的评论
   *
   * @tags review
   * @name ReviewControllerGetReviewList
   * @summary 获取产品评论列表
   * @request GET:/api/review/list
   * @response `200` `ReviewControllerGetReviewListData` 获取成功
   */
  reviewControllerGetReviewList = (
    query: ReviewControllerGetReviewListParams,
    params: RequestParams = {},
  ) =>
    this.http.request<ReviewControllerGetReviewListData, any>({
      path: `/api/review/list`,
      method: "GET",
      query: query,
      ...params,
    });
  /**
   * No description
   *
   * @tags review
   * @name ReviewControllerGetReviewDetail
   * @summary 获取评论详情
   * @request GET:/api/review/detail/{id}
   * @response `200` `ReviewControllerGetReviewDetailData` 获取成功
   * @response `404` `void` 评论不存在
   */
  reviewControllerGetReviewDetail = (id: number, params: RequestParams = {}) =>
    this.http.request<ReviewControllerGetReviewDetailData, void>({
      path: `/api/review/detail/${id}`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags review
   * @name ReviewControllerGetReviewStats
   * @summary 获取产品评论统计
   * @request GET:/api/review/stats/{productId}
   * @response `200` `ReviewControllerGetReviewStatsData` 获取成功
   */
  reviewControllerGetReviewStats = (
    productId: number,
    params: RequestParams = {},
  ) =>
    this.http.request<ReviewControllerGetReviewStatsData, any>({
      path: `/api/review/stats/${productId}`,
      method: "GET",
      ...params,
    });
  /**
   * No description
   *
   * @tags review
   * @name ReviewControllerGetReviewMedia
   * @summary 获取评论媒体文件
   * @request GET:/api/review/media/{reviewId}
   * @response `200` `ReviewControllerGetReviewMediaData` 获取成功
   */
  reviewControllerGetReviewMedia = (
    reviewId: number,
    params: RequestParams = {},
  ) =>
    this.http.request<ReviewControllerGetReviewMediaData, any>({
      path: `/api/review/media/${reviewId}`,
      method: "GET",
      ...params,
    });
  /**
   * @description 需要登录，且必须购买过该产品
   *
   * @tags review
   * @name ReviewControllerCreateReview
   * @summary 创建评论
   * @request POST:/api/review/create
   * @secure
   * @response `201` `ReviewControllerCreateReviewData` 创建成功
   * @response `400` `void` 参数错误或未购买产品
   * @response `401` `void` 未登录
   */
  reviewControllerCreateReview = (
    data: ReviewCreateDto,
    params: RequestParams = {},
  ) =>
    this.http.request<ReviewControllerCreateReviewData, void>({
      path: `/api/review/create`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 只能更新自己的评论，且只能更新待审核的评论
   *
   * @tags review
   * @name ReviewControllerUpdateReview
   * @summary 更新评论
   * @request PUT:/api/review/update
   * @secure
   * @response `200` `ReviewControllerUpdateReviewData` 更新成功
   * @response `400` `void` 已审核通过的评论无法修改
   * @response `404` `void` 评论不存在或无权限
   */
  reviewControllerUpdateReview = (
    data: ReviewUpdateDto,
    params: RequestParams = {},
  ) =>
    this.http.request<ReviewControllerUpdateReviewData, void>({
      path: `/api/review/update`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 软删除，只能删除自己的评论
   *
   * @tags review
   * @name ReviewControllerDeleteReview
   * @summary 删除评论
   * @request DELETE:/api/review/delete
   * @secure
   * @response `200` `ReviewControllerDeleteReviewData` 删除成功
   * @response `404` `void` 评论不存在或无权限
   */
  reviewControllerDeleteReview = (
    data: ReviewDeleteDto,
    params: RequestParams = {},
  ) =>
    this.http.request<ReviewControllerDeleteReviewData, void>({
      path: `/api/review/delete`,
      method: "DELETE",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 对评论进行有用/无用投票
   *
   * @tags review
   * @name ReviewControllerVoteReviewHelpful
   * @summary 评论有用性投票
   * @request POST:/api/review/vote-helpful
   * @secure
   * @response `200` `ReviewControllerVoteReviewHelpfulData` 投票成功
   * @response `400` `void` 不能给自己的评论投票
   */
  reviewControllerVoteReviewHelpful = (
    data: ReviewHelpfulVoteDto,
    params: RequestParams = {},
  ) =>
    this.http.request<ReviewControllerVoteReviewHelpfulData, void>({
      path: `/api/review/vote-helpful`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 举报不当评论
   *
   * @tags review
   * @name ReviewControllerReportReview
   * @summary 举报评论
   * @request POST:/api/review/report
   * @secure
   * @response `200` `ReviewControllerReportReviewData` 举报成功
   * @response `400` `void` 不能举报自己的评论或已举报过
   */
  reviewControllerReportReview = (
    data: ReviewReportDto,
    params: RequestParams = {},
  ) =>
    this.http.request<ReviewControllerReportReviewData, void>({
      path: `/api/review/report`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 使用统一媒体管理系统，支持图片和视频，需要登录
   *
   * @tags review
   * @name ReviewControllerUploadReviewMedia
   * @summary 上传评论媒体文件
   * @request POST:/api/review/media/upload
   * @secure
   * @response `201` `ReviewControllerUploadReviewMediaData` 上传成功
   * @response `400` `void` 文件格式或大小不符合要求
   * @response `403` `void` 无权限操作此评论
   */
  reviewControllerUploadReviewMedia = (
    data: ReviewMediaUploadDto,
    params: RequestParams = {},
  ) =>
    this.http.request<ReviewControllerUploadReviewMediaData, void>({
      path: `/api/review/media/upload`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.FormData,
      ...params,
    });
  /**
   * @description 使用统一媒体管理系统，需要登录
   *
   * @tags review
   * @name ReviewControllerBatchUploadReviewMedia
   * @summary 批量上传评论媒体文件
   * @request POST:/api/review/media/batch-upload/{reviewId}
   * @secure
   * @response `201` `ReviewControllerBatchUploadReviewMediaData` 上传成功
   * @response `403` `void` 无权限操作此评论
   */
  reviewControllerBatchUploadReviewMedia = (
    reviewId: number,
    params: RequestParams = {},
  ) =>
    this.http.request<ReviewControllerBatchUploadReviewMediaData, void>({
      path: `/api/review/media/batch-upload/${reviewId}`,
      method: "POST",
      secure: true,
      ...params,
    });
  /**
   * @description 需要登录
   *
   * @tags review
   * @name ReviewControllerUpdateReviewMedia
   * @summary 更新媒体文件信息
   * @request PUT:/api/review/media/update
   * @secure
   * @response `200` `ReviewControllerUpdateReviewMediaData` 更新成功
   * @response `403` `void` 无权限操作此媒体文件
   * @response `404` `void` 媒体文件不存在
   */
  reviewControllerUpdateReviewMedia = (
    data: ReviewMediaUpdateDto,
    params: RequestParams = {},
  ) =>
    this.http.request<ReviewControllerUpdateReviewMediaData, void>({
      path: `/api/review/media/update`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 需要登录
   *
   * @tags review
   * @name ReviewControllerDeleteReviewMedia
   * @summary 删除媒体文件
   * @request DELETE:/api/review/media/delete
   * @secure
   * @response `200` `ReviewControllerDeleteReviewMediaData` 删除成功
   * @response `403` `void` 无权限操作此媒体文件
   * @response `404` `void` 媒体文件不存在
   */
  reviewControllerDeleteReviewMedia = (
    data: ReviewMediaDeleteDto,
    params: RequestParams = {},
  ) =>
    this.http.request<ReviewControllerDeleteReviewMediaData, void>({
      path: `/api/review/media/delete`,
      method: "DELETE",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 用于编辑时获取
   *
   * @tags review
   * @name ReviewControllerGetMyReviewMedia
   * @summary 获取我的评论媒体文件
   * @request GET:/api/review/my-media/{reviewId}
   * @secure
   * @response `200` `ReviewControllerGetMyReviewMediaData` 获取成功
   */
  reviewControllerGetMyReviewMedia = (
    reviewId: number,
    params: RequestParams = {},
  ) =>
    this.http.request<ReviewControllerGetMyReviewMediaData, any>({
      path: `/api/review/my-media/${reviewId}`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description 需要员工或管理员权限
   *
   * @tags review
   * @name ReviewControllerGetAdminReviewList
   * @summary 管理员获取评论列表
   * @request GET:/api/review/admin/list
   * @secure
   * @response `200` `ReviewControllerGetAdminReviewListData` 获取成功
   * @response `403` `void` 权限不足
   */
  reviewControllerGetAdminReviewList = (
    query: ReviewControllerGetAdminReviewListParams,
    params: RequestParams = {},
  ) =>
    this.http.request<ReviewControllerGetAdminReviewListData, void>({
      path: `/api/review/admin/list`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
  /**
   * @description 需要员工或管理员权限
   *
   * @tags review
   * @name ReviewControllerModerateReview
   * @summary 审核评论
   * @request POST:/api/review/admin/moderate
   * @secure
   * @response `200` `ReviewControllerModerateReviewData` 审核成功
   * @response `403` `void` 权限不足
   * @response `404` `void` 评论不存在
   */
  reviewControllerModerateReview = (
    data: ReviewModerationDto,
    params: RequestParams = {},
  ) =>
    this.http.request<ReviewControllerModerateReviewData, void>({
      path: `/api/review/admin/moderate`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 需要员工或管理员权限
   *
   * @tags review
   * @name ReviewControllerBatchModerateReviews
   * @summary 批量审核评论
   * @request POST:/api/review/admin/batch-moderate
   * @secure
   * @response `200` `ReviewControllerBatchModerateReviewsData` 批量审核成功
   * @response `403` `void` 权限不足
   */
  reviewControllerBatchModerateReviews = (
    data: ReviewBatchModerationDto,
    params: RequestParams = {},
  ) =>
    this.http.request<ReviewControllerBatchModerateReviewsData, void>({
      path: `/api/review/admin/batch-moderate`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 仅管理员权限
   *
   * @tags review
   * @name ReviewControllerAdminDeleteReviewMedia
   * @summary 管理员删除媒体文件
   * @request DELETE:/api/review/admin/media/{mediaId}
   * @secure
   * @response `200` `ReviewControllerAdminDeleteReviewMediaData` 删除成功
   * @response `403` `void` 权限不足
   * @response `404` `void` 媒体文件不存在
   */
  reviewControllerAdminDeleteReviewMedia = (
    mediaId: number,
    params: RequestParams = {},
  ) =>
    this.http.request<ReviewControllerAdminDeleteReviewMediaData, void>({
      path: `/api/review/admin/media/${mediaId}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
}
