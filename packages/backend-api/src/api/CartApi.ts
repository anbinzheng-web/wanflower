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
  CartControllerAddToCartData,
  CartControllerClearCartData,
  CartControllerGetCartData,
  CartControllerGetCartItemCountData,
  CartControllerRemoveFromCartData,
  CartControllerUpdateCartItemData,
  CartControllerValidateCartItemsData,
  CartItemDto,
  UpdateCartItemDto,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class CartApi<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  /**
   * No description
   *
   * @tags cart
   * @name CartControllerGetCart
   * @summary 获取购物车
   * @request GET:/api/cart
   * @secure
   * @response `200` `CartControllerGetCartData`
   */
  cartControllerGetCart = (params: RequestParams = {}) =>
    this.http.request<CartControllerGetCartData, any>({
      path: `/api/cart`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags cart
   * @name CartControllerAddToCart
   * @summary 添加商品到购物车
   * @request POST:/api/cart/items
   * @secure
   * @response `200` `CartControllerAddToCartData`
   */
  cartControllerAddToCart = (data: CartItemDto, params: RequestParams = {}) =>
    this.http.request<CartControllerAddToCartData, any>({
      path: `/api/cart/items`,
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
   * @tags cart
   * @name CartControllerUpdateCartItem
   * @summary 更新购物车商品数量
   * @request PUT:/api/cart/items/{productId}
   * @secure
   * @response `200` `CartControllerUpdateCartItemData`
   */
  cartControllerUpdateCartItem = (
    productId: number,
    data: UpdateCartItemDto,
    params: RequestParams = {},
  ) =>
    this.http.request<CartControllerUpdateCartItemData, any>({
      path: `/api/cart/items/${productId}`,
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
   * @tags cart
   * @name CartControllerRemoveFromCart
   * @summary 从购物车移除商品
   * @request DELETE:/api/cart/items/{productId}
   * @secure
   * @response `200` `CartControllerRemoveFromCartData`
   */
  cartControllerRemoveFromCart = (
    productId: number,
    params: RequestParams = {},
  ) =>
    this.http.request<CartControllerRemoveFromCartData, any>({
      path: `/api/cart/items/${productId}`,
      method: "DELETE",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags cart
   * @name CartControllerClearCart
   * @summary 清空购物车
   * @request DELETE:/api/cart/clear
   * @secure
   * @response `200` `CartControllerClearCartData`
   */
  cartControllerClearCart = (params: RequestParams = {}) =>
    this.http.request<CartControllerClearCartData, any>({
      path: `/api/cart/clear`,
      method: "DELETE",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags cart
   * @name CartControllerGetCartItemCount
   * @summary 获取购物车商品数量
   * @request GET:/api/cart/count
   * @secure
   * @response `200` `CartControllerGetCartItemCountData`
   */
  cartControllerGetCartItemCount = (params: RequestParams = {}) =>
    this.http.request<CartControllerGetCartItemCountData, any>({
      path: `/api/cart/count`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags cart
   * @name CartControllerValidateCartItems
   * @summary 验证购物车商品可用性
   * @request GET:/api/cart/validate
   * @secure
   * @response `200` `CartControllerValidateCartItemsData`
   */
  cartControllerValidateCartItems = (params: RequestParams = {}) =>
    this.http.request<CartControllerValidateCartItemsData, any>({
      path: `/api/cart/validate`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
}
