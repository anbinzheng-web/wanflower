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
  AddressControllerGetCountriesData,
  AddressControllerGetProvincesByCountryData,
  AddressControllerValidateAddressData,
  ShippingAddressDto,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class AddressApi<SecurityDataType = unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  /**
   * No description
   *
   * @tags address
   * @name AddressControllerGetCountries
   * @summary 获取国家列表
   * @request GET:/api/address/countries
   * @secure
   * @response `200` `AddressControllerGetCountriesData`
   */
  addressControllerGetCountries = (params: RequestParams = {}) =>
    this.http.request<AddressControllerGetCountriesData, any>({
      path: `/api/address/countries`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags address
   * @name AddressControllerGetProvincesByCountry
   * @summary 根据国家代码获取省/州列表
   * @request GET:/api/address/provinces/{countryCode}
   * @secure
   * @response `200` `AddressControllerGetProvincesByCountryData`
   */
  addressControllerGetProvincesByCountry = (
    countryCode: string,
    params: RequestParams = {},
  ) =>
    this.http.request<AddressControllerGetProvincesByCountryData, any>({
      path: `/api/address/provinces/${countryCode}`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags address
   * @name AddressControllerValidateAddress
   * @summary 验证和标准化地址
   * @request POST:/api/address/validate
   * @secure
   * @response `200` `AddressControllerValidateAddressData`
   */
  addressControllerValidateAddress = (
    data: ShippingAddressDto,
    params: RequestParams = {},
  ) =>
    this.http.request<AddressControllerValidateAddressData, any>({
      path: `/api/address/validate`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
}
