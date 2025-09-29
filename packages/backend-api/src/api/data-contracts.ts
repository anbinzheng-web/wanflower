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

export interface ByIdDto {
  /** ID */
  id: number;
}

export interface ProductCreateDto {
  /** 商品名称 */
  name: string;
  /** 商品描述 */
  description: string;
  /** 商品价格，单位分 */
  price: number;
  /** 商品库存 */
  stock: number;
  /** 商品状态 */
  status: ProductCreateDtoStatusEnum;
}

export interface ProductUpdateDto {
  /** 商品ID */
  id: number;
}

export interface ProductImageUploadDto {
  /** @format binary */
  file: File;
  /** 图片类型 */
  type?: ProductImageUploadDtoTypeEnum;
  /**
   * 排序，数字越小越靠前
   * @default 0
   */
  sort?: number;
  /** 商品ID */
  product_id?: number;
}

export interface ReviewCreateDto {
  /** 商品ID */
  product_id: number;
  /** 用户ID */
  user_id?: number;
  /** 评分，1-5 */
  rating: number;
  /** 评论内容 */
  content: string;
  /** 评论图片，最多9张 */
  images?: string[];
  /** 订单ID */
  order_id?: number;
}

export interface ProductReviewUploadImageDto {
  /** @format binary */
  file: File;
  /** 评论ID */
  review_id: number;
}

export interface ProductReviewDeleteImageDto {
  /** 图片文件名 */
  filename: string;
  /** 评论ID */
  review_id: number;
}

export interface BlogCreateDto {
  /** 博客标题 */
  title: string;
  /** slug */
  slug: string;
  /**
   * 作者
   * @default "anbin"
   */
  author: string;
  /** 封面图 */
  cover_image: string;
  /** seo 相关的数据 */
  seo?: object;
  /** markdown */
  md: string;
  /** 博客归属语言 */
  language: string;
  /** 博客摘要 */
  summary: string;
}

export interface BlogUpdateDto {
  /** ID */
  id: number;
  /** 状态 */
  status: string;
}

export interface BlogSlugDto {
  /** slug */
  slug: string;
}

export interface CreateUserDto {
  /** 邮箱 */
  email?: string;
  /** 密码 */
  password?: string;
}

export interface LoginDto {
  /** 邮箱 */
  email?: string;
  /** 密码 */
  password?: string;
}

/** 商品状态 */
export enum ProductCreateDtoStatusEnum {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  DRAFT = "DRAFT",
}

/** 图片类型 */
export enum ProductImageUploadDtoTypeEnum {
  MAIN = "MAIN",
  VICE = "VICE",
  DETAIL = "DETAIL",
}

export interface ProductControllerListParams {
  /**
   * 页码
   * @default 1
   */
  page?: number;
  /**
   * 每页条数
   * @default 20
   */
  page_size?: number;
  /** 价格排序 asc/desc */
  price_order?: PriceOrderEnum;
}

/** 价格排序 asc/desc */
export enum PriceOrderEnum {
  Asc = "asc",
  Desc = "desc",
}

export type ProductControllerListData = any;

/** 价格排序 asc/desc */
export enum ProductControllerListParams1PriceOrderEnum {
  Asc = "asc",
  Desc = "desc",
}

export type ProductControllerDetailData = any;

export type ProductControllerCreateData = any;

export type ProductControllerUpdateData = any;

export type ProductControllerDeleteData = any;

export type ProductControllerUploadData = any;

export type ProductControllerDeleteImageData = any;

export type ProductControllerViewsData = any;

export type ReviewControllerCreateData = any;

export type ReviewControllerUpdateData = any;

export interface ReviewControllerListParams {
  /**
   * 页码
   * @default 1
   */
  page?: number;
  /**
   * 每页条数
   * @default 20
   */
  page_size?: number;
  /** 商品ID */
  product_id: number;
}

export type ReviewControllerListData = any;

export type ReviewControllerDeleteData = any;

export type ReviewControllerUploadImageData = any;

export type ReviewControllerDeleteImageData = any;

export interface BlogControllerListParams {
  /**
   * 页码
   * @default 1
   */
  page?: number;
  /**
   * 每页条数
   * @default 20
   */
  page_size?: number;
  /** 博客状态 */
  status: string;
  /** 模糊搜索/title+md */
  search: string;
}

export type BlogControllerListData = any;

export type BlogControllerCreateData = any;

export type BlogControllerUpdateData = any;

export type BlogControllerDeleteData = any;

export type BlogControllerSlugData = any;

export type AuthControllerRegisterData = any;

export type AuthControllerLoginData = any;

export type UserControllerMeData = any;

export type UserControllerListAllData = any;

export type UserControllerSetRoleData = any;
