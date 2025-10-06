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

export interface PaginatedDto {
  /**
   * 响应状态码
   * @example 0
   */
  code: number;
  /** 分页数据 */
  data: object;
  /**
   * 响应消息
   * @example "success"
   */
  message: string;
}

export interface ProductListDto {
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
  /** 价格排序 */
  price_order?: ProductListDtoPriceOrderEnum;
  /** 销量排序 */
  sales_order?: ProductListDtoSalesOrderEnum;
  /** 浏览量排序 */
  view_order?: ProductListDtoViewOrderEnum;
  /** 产品状态筛选 */
  status?: ProductListDtoStatusEnum;
  /** 分类ID筛选 */
  category_id?: number;
  /** 关键词搜索 */
  keyword?: string;
  /** 最低价格筛选 */
  min_price?: number;
  /** 最高价格筛选 */
  max_price?: number;
}

export interface MessageDto {
  /**
   * 响应状态码
   * @example 0
   */
  code: number;
  /**
   * 响应消息
   * @example "success"
   */
  message: string;
  /** 响应数据 */
  data: object;
}

export interface ProductDetailDto {
  /** 产品ID */
  id: number;
}

export interface ProductViewDto {
  /** 产品ID */
  id: number;
}

export interface ProductDimensionsDto {
  /** 长度(cm) */
  length: number;
  /** 宽度(cm) */
  width: number;
  /** 高度(cm) */
  height: number;
  /**
   * 单位
   * @default "cm"
   */
  unit?: string;
}

export interface ProductAttributeDto {
  /** 属性名称 */
  name: string;
  /** 属性值 */
  value: string;
  /**
   * 排序权重
   * @default 0
   */
  sort_order?: number;
}

export interface ProductCreateDto {
  /** 商品名称 */
  name: string;
  /** 商品详细描述 */
  description: string;
  /** 商品简短描述 */
  short_desc?: string;
  /** 商品价格 */
  price: number;
  /** 商品原价 */
  original_price?: number;
  /** 商品库存 */
  stock: number;
  /**
   * 最小库存预警
   * @default 0
   */
  min_stock?: number;
  /** 商品重量(kg) */
  weight?: number;
  /** 商品尺寸信息 */
  dimensions?: ProductDimensionsDto;
  /** SKU编码 */
  sku?: string;
  /** 条形码 */
  barcode?: string;
  /** 商品状态 */
  status: ProductCreateDtoStatusEnum;
  /** 分类ID */
  category_id?: number;
  /**
   * 排序权重
   * @default 0
   */
  sort_order?: number;
  /** SEO标题 */
  seo_title?: string;
  /** SEO描述 */
  seo_description?: string;
  /** SEO关键词 */
  seo_keywords?: string[];
  /** 商品属性 */
  attributes?: ProductAttributeDto[];
}

export interface ProductUpdateDto {
  /** 商品ID */
  id: number;
}

export interface ProductBatchDeleteDto {
  /** 产品ID数组 */
  ids: number[];
}

export interface ProductBatchUpdateStatusDto {
  /** 产品ID数组 */
  ids: number[];
  /** 目标状态 */
  status: ProductBatchUpdateStatusDtoStatusEnum;
}

export interface ProductMediaUploadDto {
  /**
   * 媒体文件
   * @format binary
   */
  file: File;
  /** 产品ID */
  product_id: number;
  /** 媒体类型 */
  type: ProductMediaUploadDtoTypeEnum;
  /**
   * 媒体分类
   * @default "MAIN"
   */
  media_category?: ProductMediaUploadDtoMediaCategoryEnum;
  /**
   * 排序权重
   * @default 0
   */
  sort_order?: number;
  /** 替代文本 */
  alt_text?: string;
}

export interface ProductMediaUpdateDto {
  /** 媒体ID */
  id: number;
  /** 媒体分类 */
  media_category?: ProductMediaUpdateDtoMediaCategoryEnum;
  /** 排序权重 */
  sort_order?: number;
  /** 替代文本 */
  alt_text?: string;
}

export interface ProductMediaDeleteDto {
  /** 媒体ID */
  id: number;
}

export interface ProductMediaMigrateToCdnDto {
  /** 媒体ID */
  id: number;
  /** CDN URL */
  cdn_url: string;
  /** CDN存储键 */
  cdn_key: string;
}

export interface CategoryCreateDto {
  /** 分类名称 */
  name: string;
  /** URL友好标识 */
  slug: string;
  /** 分类描述 */
  description?: string;
  /** 分类图片URL */
  image_url?: string;
  /** 父分类ID */
  parent_id?: number;
  /**
   * 排序权重
   * @default 0
   */
  sort_order?: number;
  /**
   * 是否启用
   * @default true
   */
  is_active?: boolean;
}

export interface CategoryUpdateDto {
  /** 分类ID */
  id: number;
}

export type Object = object;

export interface ProductAttributeCreateDto {
  /** 产品ID */
  product_id: number;
  /** 属性名称 */
  name: string;
  /** 属性值 */
  value: string;
  /**
   * 排序权重
   * @default 0
   */
  sort_order?: number;
}

export interface ProductAttributeUpdateDto {
  /** 属性ID */
  id: number;
  /** 属性名称 */
  name?: string;
  /** 属性值 */
  value?: string;
  /** 排序权重 */
  sort_order?: number;
}

export interface ReviewCreateDto {
  /** 产品ID */
  product_id: number;
  /** 订单ID */
  order_id: number;
  /** 评分，1-5星 */
  rating: number;
  /** 评论内容 */
  content: string;
  /** 父评论ID（用于回复） */
  parent_id?: number;
}

export interface ReviewUpdateDto {
  /** 评论ID */
  id: number;
}

export interface ReviewDeleteDto {
  /** 评论ID */
  id: number;
  /** 删除原因 */
  delete_reason?: string;
}

export interface ReviewHelpfulVoteDto {
  /** 评论ID */
  review_id: number;
  /**
   * 是否有用
   * @example true
   */
  is_helpful: boolean;
}

export interface ReviewReportDto {
  /** 评论ID */
  review_id: number;
  /** 举报原因 */
  reason: ReviewReportDtoReasonEnum;
  /** 举报详情 */
  description?: string;
}

export interface ReviewMediaUploadDto {
  /**
   * 媒体文件
   * @format binary
   */
  file: File;
  /** 评论ID */
  review_id: number;
  /** 媒体类型 */
  type: ReviewMediaUploadDtoTypeEnum;
  /**
   * 排序权重
   * @default 0
   */
  sort_order?: number;
}

export interface ReviewMediaUpdateDto {
  /** 媒体文件ID */
  id: number;
  /** 排序权重 */
  sort_order?: number;
}

export interface ReviewMediaDeleteDto {
  /** 媒体文件ID */
  id: number;
}

export interface ReviewModerationDto {
  /** 评论ID */
  id: number;
  /** 审核状态 */
  status: ReviewModerationDtoStatusEnum;
  /** 审核备注 */
  moderation_note?: string;
}

export interface ReviewBatchModerationDto {
  /** 评论ID数组 */
  ids: number[];
  /** 审核状态 */
  status: ReviewBatchModerationDtoStatusEnum;
  /** 批量审核备注 */
  moderation_note?: string;
}

export interface BlogListDto {
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
  /** 项目类型 */
  project_type: string;
  /** 模糊搜索/title+md */
  search: string;
  /** 标签ID列表 */
  tag_ids: string[];
  /** 分类ID列表 */
  category_ids: string[];
  /** 是否精选 */
  is_featured: boolean;
  /** 语言代码 */
  language: string;
  /** 排序字段 */
  sort_by: BlogListDtoSortByEnum;
  /** 排序方向 */
  sort_order: BlogListDtoSortOrderEnum;
}

export type DefaultModel = object;

export interface BlogSlugDto {
  /** slug */
  slug: string;
  /** 项目类型 */
  project_type: string;
  /** 语言代码 */
  language: string;
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
  /** markdown 内容（支持 HTML） */
  md: string;
  /**
   * 博客归属语言
   * @default "zh"
   */
  language: string;
  /** 博客摘要 */
  summary: string;
  /** 项目类型 */
  project_type: string;
  /**
   * 是否精选
   * @default false
   */
  is_featured: boolean;
  /**
   * 排序权重
   * @default 0
   */
  sort_order: number;
  /** 标签ID列表 */
  tag_ids: string[];
  /** 分类ID列表 */
  category_ids: string[];
}

export interface BlogUpdateDto {
  /** ID */
  id: number;
  /** 状态 */
  status: string;
}

export interface ByIdDto {
  /** ID */
  id: number;
}

export interface BlogTagListDto {
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
  /** 项目类型 */
  project_type: string;
  /** 是否启用 */
  is_active: boolean;
  /** 搜索标签名称 */
  search: string;
}

export interface BlogTagCreateDto {
  /** 标签名称 */
  name: string;
  /** 标签 slug */
  slug: string;
  /** 标签描述 */
  description: string;
  /** 标签颜色（十六进制） */
  color: string;
  /** 项目类型 */
  project_type: string;
  /**
   * 排序权重
   * @default 0
   */
  sort_order: number;
}

export interface BlogTagUpdateDto {
  /** ID */
  id: number;
  /** 是否启用 */
  is_active: boolean;
}

export interface BlogCategoryListDto {
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
  /** 项目类型 */
  project_type: string;
  /** 是否启用 */
  is_active: boolean;
  /** 父分类ID */
  parent_id: number;
  /** 搜索分类名称 */
  search: string;
}

export interface BlogCategoryCreateDto {
  /** 分类名称 */
  name: string;
  /** 分类 slug */
  slug: string;
  /** 分类描述 */
  description: string;
  /** 父分类ID */
  parent_id: number;
  /** 项目类型 */
  project_type: string;
  /**
   * 排序权重
   * @default 0
   */
  sort_order: number;
}

export interface BlogCategoryUpdateDto {
  /** ID */
  id: number;
  /** 是否启用 */
  is_active: boolean;
}

export interface CreateUserDto {
  /**
   * 邮箱地址
   * @example "newuser@example.com"
   */
  email: string;
  /**
   * 密码
   * @example "password123"
   */
  password: string;
  /**
   * 角色
   * @example "user"
   */
  role: CreateUserDtoRoleEnum;
  /**
   * 名字
   * @example "John"
   */
  first_name?: string;
  /**
   * 姓氏
   * @example "Doe"
   */
  last_name?: string;
  /**
   * 手机号
   * @example "+1234567890"
   */
  phone?: string;
  /**
   * 头像URL
   * @example "https://example.com/avatar.jpg"
   */
  avatar_url?: string;
  /**
   * 是否已验证
   * @example true
   */
  is_verified?: boolean;
  /**
   * 是否激活
   * @example true
   */
  is_active?: boolean;
}

export interface LoginDto {
  /** 邮箱 */
  email?: string;
  /** 密码 */
  password?: string;
}

export interface UserResponseDto {
  /**
   * 用户ID
   * @example 1
   */
  id: number;
  /**
   * 邮箱地址
   * @example "user@example.com"
   */
  email: string;
  /**
   * 角色
   * @example "user"
   */
  role: string;
  /**
   * 名字
   * @example "John"
   */
  first_name?: string;
  /**
   * 姓氏
   * @example "Doe"
   */
  last_name?: string;
  /**
   * 手机号
   * @example "+1234567890"
   */
  phone?: string;
  /**
   * 头像URL
   * @example "https://example.com/avatar.jpg"
   */
  avatar_url?: string;
  /**
   * 是否已验证
   * @example true
   */
  is_verified: boolean;
  /**
   * 是否激活
   * @example true
   */
  is_active: boolean;
  /**
   * 最后登录时间
   * @format date-time
   * @example "2024-01-15T10:30:00Z"
   */
  last_login?: string;
  /**
   * 创建时间
   * @format date-time
   * @example "2024-01-01T00:00:00Z"
   */
  created_at: string;
  /**
   * 更新时间
   * @format date-time
   * @example "2024-01-15T10:30:00Z"
   */
  updated_at: string;
}

export interface UpdateUserDto {
  /**
   * 邮箱地址
   * @example "updated@example.com"
   */
  email?: string;
  /**
   * 密码
   * @example "newpassword123"
   */
  password?: string;
  /** 角色 */
  role?: UpdateUserDtoRoleEnum;
  /**
   * 名字
   * @example "Jane"
   */
  first_name?: string;
  /**
   * 姓氏
   * @example "Smith"
   */
  last_name?: string;
  /**
   * 手机号
   * @example "+1234567890"
   */
  phone?: string;
  /**
   * 头像URL
   * @example "https://example.com/avatar.jpg"
   */
  avatar_url?: string;
  /**
   * 是否已验证
   * @example true
   */
  is_verified?: boolean;
  /**
   * 是否激活
   * @example true
   */
  is_active?: boolean;
}

export interface UpdateUserStatusDto {
  /**
   * 是否激活
   * @example true
   */
  is_active: boolean;
}

export interface UpdateUserRoleDto {
  /**
   * 角色
   * @example "staff"
   */
  role: UpdateUserRoleDtoRoleEnum;
}

export interface ResetUserPasswordDto {
  /**
   * 新密码
   * @example "newpassword123"
   */
  password: string;
}

export interface OrderWithDetailsDto {
  /**
   * 订单ID
   * @example 1
   */
  id: number;
  /**
   * 订单号
   * @example "ORD202401010001"
   */
  order_number: string;
  /**
   * 用户ID
   * @example 1
   */
  user_id: number;
  /**
   * 订单状态
   * @example "PENDING"
   */
  status: string;
  /**
   * 商品小计
   * @example 100
   */
  subtotal: number;
  /**
   * 运费
   * @example 10
   */
  shipping_fee: number;
  /**
   * 税费
   * @example 5
   */
  tax_amount: number;
  /**
   * 折扣金额
   * @example 0
   */
  discount_amount: number;
  /**
   * 总金额
   * @example 115
   */
  total_amount: number;
  /** 收货地址 */
  shipping_address: Record<string, any>;
  /**
   * 支付方式
   * @example "alipay"
   */
  payment_method: string;
  /**
   * 支付状态
   * @example "PENDING"
   */
  payment_status: string;
  /**
   * 第三方支付ID
   * @example "pay_123456789"
   */
  payment_id: string;
  /**
   * 支付时间
   * @format date-time
   * @example "2024-01-01T10:00:00Z"
   */
  paid_at: string;
  /**
   * 物流方式
   * @example "express"
   */
  shipping_method: string;
  /**
   * 物流单号
   * @example "SF1234567890"
   */
  tracking_number: string;
  /**
   * 发货时间
   * @format date-time
   * @example "2024-01-01T10:00:00Z"
   */
  shipped_at: string;
  /**
   * 签收时间
   * @format date-time
   * @example "2024-01-01T10:00:00Z"
   */
  delivered_at: string;
  /**
   * 客户备注
   * @example "请小心轻放"
   */
  customer_notes: string;
  /**
   * 管理员备注
   * @example "客户要求加急处理"
   */
  admin_notes: string;
  /**
   * 创建时间
   * @format date-time
   * @example "2024-01-01T10:00:00Z"
   */
  created_at: string;
  /**
   * 更新时间
   * @format date-time
   * @example "2024-01-01T10:00:00Z"
   */
  updated_at: string;
  /** 订单项列表 */
  items: any[];
  /** 用户信息 */
  user: Record<string, any>;
}

export interface ShippingAddressDto {
  /**
   * 收货人姓名
   * @example "John Smith"
   */
  name: string;
  /**
   * 收货人电话（国际格式）
   * @example "+86 138 0013 8000"
   */
  phone: string;
  /**
   * 公司名称
   * @example "ABC Company Ltd."
   */
  company?: string;
  /**
   * 国家（ISO 3166-1 alpha-2 代码）
   * @example "CN"
   */
  country: string;
  /**
   * 省/州/大区
   * @example "Guangdong"
   */
  province: string;
  /**
   * 城市
   * @example "Shenzhen"
   */
  city: string;
  /**
   * 区/县/郡
   * @example "Nanshan District"
   */
  district?: string;
  /**
   * 邮政编码/邮编
   * @example "518000"
   */
  postal_code?: string;
  /**
   * 地址第一行（街道、门牌号等）
   * @example "123 Main Street"
   */
  address_line_1: string;
  /**
   * 地址第二行（公寓号、楼层等）
   * @example "Apt 456, Floor 2"
   */
  address_line_2?: string;
  /**
   * 地址第三行（特殊说明等）
   * @example "Building B, Near Metro Station"
   */
  address_line_3?: string;
}

export interface OrderItemDto {
  /**
   * 商品ID
   * @example 1
   */
  product_id: number;
  /**
   * 商品数量
   * @example 2
   */
  quantity: number;
}

export interface CreateOrderDto {
  /**
   * 用户ID（管理员代下单时使用）
   * @example 1
   */
  user_id?: number;
  /** 收货地址 */
  shipping_address: ShippingAddressDto;
  /** 订单项列表 */
  items: OrderItemDto[];
  /**
   * 客户备注
   * @example "请小心轻放"
   */
  customer_notes?: string;
  /**
   * 支付方式
   * @example "alipay"
   */
  payment_method?: string;
  /**
   * 物流方式
   * @example "express"
   */
  shipping_method?: string;
}

export interface OrderStatsDto {
  /**
   * 总订单数
   * @example 100
   */
  total_orders: number;
  /**
   * 总金额
   * @example 10000
   */
  total_amount: number;
  /**
   * 待付款订单数
   * @example 10
   */
  pending_orders: number;
  /**
   * 已付款订单数
   * @example 20
   */
  paid_orders: number;
  /**
   * 已发货订单数
   * @example 30
   */
  shipped_orders: number;
  /**
   * 已完成订单数
   * @example 25
   */
  completed_orders: number;
  /**
   * 已取消订单数
   * @example 5
   */
  cancelled_orders: number;
  /**
   * 已退款订单数
   * @example 2
   */
  refunded_orders: number;
}

export interface UpdateOrderDto {
  /** 订单状态 */
  status?: UpdateOrderDtoStatusEnum;
  /** 支付状态 */
  payment_status?: UpdateOrderDtoPaymentStatusEnum;
  /**
   * 第三方支付ID
   * @example "pay_123456789"
   */
  payment_id?: string;
  /**
   * 支付时间
   * @example "2024-01-01T10:00:00Z"
   */
  paid_at?: string;
  /**
   * 物流方式
   * @example "express"
   */
  shipping_method?: string;
  /**
   * 物流单号
   * @example "SF1234567890"
   */
  tracking_number?: string;
  /**
   * 发货时间
   * @example "2024-01-01T10:00:00Z"
   */
  shipped_at?: string;
  /**
   * 签收时间
   * @example "2024-01-01T10:00:00Z"
   */
  delivered_at?: string;
  /**
   * 管理员备注
   * @example "客户要求加急处理"
   */
  admin_notes?: string;
}

export interface ConfirmPaymentDto {
  /**
   * 支付方式
   * @example "BANK_TRANSFER"
   */
  payment_method: ConfirmPaymentDtoPaymentMethodEnum;
  /**
   * 支付金额
   * @example 299.99
   */
  amount: number;
  /**
   * 第三方支付ID（如Stripe Payment Intent ID）
   * @example "pi_1234567890abcdef"
   */
  payment_id: string;
  /**
   * 支付时间
   * @example "2024-01-15T10:30:00Z"
   */
  paid_at: string;
  /**
   * 支付备注
   * @example "银行转账，交易号：123456789"
   */
  payment_notes?: string;
  /**
   * 交易凭证号
   * @example "TXN20240115001"
   */
  transaction_reference?: string;
  /**
   * 银行名称（银行转账时使用）
   * @example "中国工商银行"
   */
  bank_name?: string;
  /**
   * 账户后四位（银行转账时使用）
   * @example "1234"
   */
  account_last_four?: string;
}

export interface CartResponseDto {
  /**
   * 购物车ID
   * @example 1
   */
  id: number;
  /**
   * 用户ID
   * @example 1
   */
  user_id: number;
  /** 购物车项列表 */
  items: any[];
  /**
   * 创建时间
   * @format date-time
   * @example "2024-01-01T10:00:00Z"
   */
  created_at: string;
  /**
   * 更新时间
   * @format date-time
   * @example "2024-01-01T10:00:00Z"
   */
  updated_at: string;
}

export interface CartItemDto {
  /**
   * 商品ID
   * @example 1
   */
  product_id: number;
  /**
   * 商品数量
   * @example 2
   */
  quantity: number;
}

export interface UpdateCartItemDto {
  /**
   * 商品数量
   * @example 3
   */
  quantity: number;
}

export interface CartCountResponseDto {
  /**
   * 购物车商品数量
   * @example 5
   */
  count: number;
}

export interface CartValidationResponseDto {
  /**
   * 是否有效
   * @example true
   */
  valid: boolean;
  /** 无效商品列表 */
  invalidItems: any[];
}

/** 价格排序 */
export enum ProductListDtoPriceOrderEnum {
  Asc = "asc",
  Desc = "desc",
}

/** 销量排序 */
export enum ProductListDtoSalesOrderEnum {
  Asc = "asc",
  Desc = "desc",
}

/** 浏览量排序 */
export enum ProductListDtoViewOrderEnum {
  Asc = "asc",
  Desc = "desc",
}

/** 产品状态筛选 */
export enum ProductListDtoStatusEnum {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  DRAFT = "DRAFT",
}

/** 商品状态 */
export enum ProductCreateDtoStatusEnum {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  DRAFT = "DRAFT",
}

/** 目标状态 */
export enum ProductBatchUpdateStatusDtoStatusEnum {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  DRAFT = "DRAFT",
}

/** 媒体类型 */
export enum ProductMediaUploadDtoTypeEnum {
  IMAGE = "IMAGE",
  VIDEO = "VIDEO",
}

/**
 * 媒体分类
 * @default "MAIN"
 */
export enum ProductMediaUploadDtoMediaCategoryEnum {
  MAIN = "MAIN",
  GALLERY = "GALLERY",
  DETAIL = "DETAIL",
}

/** 媒体分类 */
export enum ProductMediaUpdateDtoMediaCategoryEnum {
  MAIN = "MAIN",
  GALLERY = "GALLERY",
  DETAIL = "DETAIL",
}

/** 举报原因 */
export enum ReviewReportDtoReasonEnum {
  Spam = "spam",
  Inappropriate = "inappropriate",
  Fake = "fake",
  Other = "other",
}

/** 媒体类型 */
export enum ReviewMediaUploadDtoTypeEnum {
  IMAGE = "IMAGE",
  VIDEO = "VIDEO",
}

/** 审核状态 */
export enum ReviewModerationDtoStatusEnum {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}

/** 审核状态 */
export enum ReviewBatchModerationDtoStatusEnum {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}

/** 排序字段 */
export enum BlogListDtoSortByEnum {
  CreatedAt = "created_at",
  UpdatedAt = "updated_at",
  ViewCount = "view_count",
  ReadingTime = "reading_time",
  SortOrder = "sort_order",
}

/** 排序方向 */
export enum BlogListDtoSortOrderEnum {
  Asc = "asc",
  Desc = "desc",
}

/**
 * 角色
 * @example "user"
 */
export enum CreateUserDtoRoleEnum {
  User = "user",
  Staff = "staff",
  Admin = "admin",
}

/** 角色 */
export enum UpdateUserDtoRoleEnum {
  User = "user",
  Staff = "staff",
  Admin = "admin",
}

/**
 * 角色
 * @example "staff"
 */
export enum UpdateUserRoleDtoRoleEnum {
  User = "user",
  Staff = "staff",
  Admin = "admin",
}

/** 订单状态 */
export enum UpdateOrderDtoStatusEnum {
  PENDING = "PENDING",
  PAID = "PAID",
  PROCESSING = "PROCESSING",
  SHIPPED = "SHIPPED",
  DELIVERED = "DELIVERED",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
  REFUNDED = "REFUNDED",
}

/** 支付状态 */
export enum UpdateOrderDtoPaymentStatusEnum {
  PENDING = "PENDING",
  PAID = "PAID",
  FAILED = "FAILED",
  REFUNDED = "REFUNDED",
  CANCELLED = "CANCELLED",
}

/**
 * 支付方式
 * @example "BANK_TRANSFER"
 */
export enum ConfirmPaymentDtoPaymentMethodEnum {
  CASH = "CASH",
  BANK_TRANSFER = "BANK_TRANSFER",
  WIRE_TRANSFER = "WIRE_TRANSFER",
  CHECK = "CHECK",
  STRIPE = "STRIPE",
  PAYPAL = "PAYPAL",
  ALIPAY = "ALIPAY",
  WECHAT_PAY = "WECHAT_PAY",
  OTHER = "OTHER",
}

export interface ProductControllerGetProductListParams {
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
  /** 价格排序 */
  price_order?: PriceOrderEnum;
  /** 销量排序 */
  sales_order?: SalesOrderEnum;
  /** 浏览量排序 */
  view_order?: ViewOrderEnum;
  /** 产品状态筛选 */
  status?: StatusEnum;
  /** 分类ID筛选 */
  category_id?: number;
  /** 关键词搜索 */
  keyword?: string;
  /** 最低价格筛选 */
  min_price?: number;
  /** 最高价格筛选 */
  max_price?: number;
}

/** 价格排序 */
export enum PriceOrderEnum {
  Asc = "asc",
  Desc = "desc",
}

/** 销量排序 */
export enum SalesOrderEnum {
  Asc = "asc",
  Desc = "desc",
}

/** 浏览量排序 */
export enum ViewOrderEnum {
  Asc = "asc",
  Desc = "desc",
}

/** 产品状态筛选 */
export enum StatusEnum {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  DRAFT = "DRAFT",
}

export type ProductControllerGetProductListData = PaginatedDto & {
  /** @example 0 */
  code?: number;
  /** @example "请求成功" */
  message?: string;
  data?: {
    records?: ProductListDto[];
    total?: number;
    page?: number;
    page_size?: number;
  };
};

/** 价格排序 */
export enum ProductControllerGetProductListParams1PriceOrderEnum {
  Asc = "asc",
  Desc = "desc",
}

/** 销量排序 */
export enum ProductControllerGetProductListParams1SalesOrderEnum {
  Asc = "asc",
  Desc = "desc",
}

/** 浏览量排序 */
export enum ProductControllerGetProductListParams1ViewOrderEnum {
  Asc = "asc",
  Desc = "desc",
}

/** 产品状态筛选 */
export enum ProductControllerGetProductListParams1StatusEnum {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  DRAFT = "DRAFT",
}

export type ProductControllerGetProductDetailData = MessageDto & {
  data?: ProductDetailDto;
};

export type ProductControllerGetProductBySkuData = MessageDto & {
  data?: ProductDetailDto;
};

export type ProductControllerIncrementProductViewData = MessageDto & {
  data?: ProductViewDto;
};

export type ProductControllerGetProductMediaData = any;

export type ProductControllerCreateProductData = MessageDto & {
  data?: ProductCreateDto;
};

export type ProductControllerUpdateProductData = MessageDto & {
  data?: ProductUpdateDto;
};

export type ProductControllerDeleteProductData = any;

export type ProductControllerBatchDeleteProductsData = any;

export type ProductControllerBatchUpdateProductStatusData = any;

export type ProductControllerUploadProductMediaData = any;

export type ProductControllerBatchUploadProductMediaData = any;

export type ProductControllerUpdateProductMediaData = any;

export type ProductControllerDeleteProductMediaData = any;

export type ProductControllerMigrateMediaToCdnData = any;

export type ProductControllerBatchMigrateProductMediaToCdnData = any;

export interface ProductControllerGetCategoryListParams {
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
  /** 父分类ID */
  parent_id?: number;
  /** 是否启用 */
  is_active?: boolean;
}

export type ProductControllerGetCategoryListData = any;

export type ProductControllerCreateCategoryData = any;

export type ProductControllerUpdateCategoryData = any;

export type ProductControllerDeleteCategoryData = any;

export interface ProductControllerGetProductAttributesParams {
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
  /** 产品ID */
  product_id: number;
}

export type ProductControllerGetProductAttributesData = MessageDto & {
  data?: Object;
};

export type ProductControllerCreateProductAttributeData = MessageDto & {
  data?: Object;
};

export type ProductControllerUpdateProductAttributeData = MessageDto & {
  data?: Object;
};

export type ProductControllerDeleteProductAttributeData = any;

export interface ReviewControllerGetReviewListParams {
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
  /** 产品ID */
  product_id: number;
  /** 评分筛选 */
  rating?: RatingEnum;
  /** 审核状态筛选 */
  status?: StatusEnum1;
  /** 是否有媒体文件 */
  has_media?: boolean;
  /** 排序方式 */
  sort_by?: SortByEnum;
}

/** 评分筛选 */
export enum RatingEnum {
  Value1 = 1,
  Value2 = 2,
  Value3 = 3,
  Value4 = 4,
  Value5 = 5,
}

/** 审核状态筛选 */
export enum StatusEnum1 {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}

/** 排序方式 */
export enum SortByEnum {
  Newest = "newest",
  Oldest = "oldest",
  Helpful = "helpful",
  RatingHigh = "rating_high",
  RatingLow = "rating_low",
}

export type ReviewControllerGetReviewListData = any;

/** 评分筛选 */
export enum ReviewControllerGetReviewListParams1RatingEnum {
  Value1 = 1,
  Value2 = 2,
  Value3 = 3,
  Value4 = 4,
  Value5 = 5,
}

/** 审核状态筛选 */
export enum ReviewControllerGetReviewListParams1StatusEnum {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}

/** 排序方式 */
export enum ReviewControllerGetReviewListParams1SortByEnum {
  Newest = "newest",
  Oldest = "oldest",
  Helpful = "helpful",
  RatingHigh = "rating_high",
  RatingLow = "rating_low",
}

export type ReviewControllerGetReviewDetailData = any;

export type ReviewControllerGetReviewStatsData = any;

export type ReviewControllerGetReviewMediaData = any;

export type ReviewControllerCreateReviewData = any;

export type ReviewControllerUpdateReviewData = any;

export type ReviewControllerDeleteReviewData = any;

export type ReviewControllerVoteReviewHelpfulData = any;

export type ReviewControllerReportReviewData = any;

export type ReviewControllerUploadReviewMediaData = any;

export type ReviewControllerBatchUploadReviewMediaData = any;

export type ReviewControllerUpdateReviewMediaData = any;

export type ReviewControllerDeleteReviewMediaData = any;

export type ReviewControllerGetMyReviewMediaData = any;

export interface ReviewControllerGetAdminReviewListParams {
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
  /** 产品ID筛选 */
  product_id?: number;
  /** 用户ID筛选 */
  user_id?: number;
  /** 审核状态筛选 */
  status?: StatusEnum2;
  /** 评分筛选 */
  rating?: number;
  /** 关键词搜索 */
  keyword?: string;
  /** 日期范围开始 */
  date_from?: string;
  /** 日期范围结束 */
  date_to?: string;
}

/** 审核状态筛选 */
export enum StatusEnum2 {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}

export type ReviewControllerGetAdminReviewListData = any;

/** 审核状态筛选 */
export enum ReviewControllerGetAdminReviewListParams1StatusEnum {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}

export type ReviewControllerModerateReviewData = any;

export type ReviewControllerBatchModerateReviewsData = any;

export type ReviewControllerAdminDeleteReviewMediaData = any;

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
  /** 项目类型 */
  project_type: string;
  /** 模糊搜索/title+md */
  search: string;
  /** 标签ID列表 */
  tag_ids: string[];
  /** 分类ID列表 */
  category_ids: string[];
  /** 是否精选 */
  is_featured: boolean;
  /** 语言代码 */
  language: string;
  /** 排序字段 */
  sort_by: SortByEnum1;
  /** 排序方向 */
  sort_order: SortOrderEnum;
}

/** 排序字段 */
export enum SortByEnum1 {
  CreatedAt = "created_at",
  UpdatedAt = "updated_at",
  ViewCount = "view_count",
  ReadingTime = "reading_time",
  SortOrder = "sort_order",
}

/** 排序方向 */
export enum SortOrderEnum {
  Asc = "asc",
  Desc = "desc",
}

export type BlogControllerListData = PaginatedDto & {
  /** @example 0 */
  code?: number;
  /** @example "请求成功" */
  message?: string;
  data?: {
    records?: BlogListDto[];
    total?: number;
    page?: number;
    page_size?: number;
  };
};

/** 排序字段 */
export enum BlogControllerListParams1SortByEnum {
  CreatedAt = "created_at",
  UpdatedAt = "updated_at",
  ViewCount = "view_count",
  ReadingTime = "reading_time",
  SortOrder = "sort_order",
}

/** 排序方向 */
export enum BlogControllerListParams1SortOrderEnum {
  Asc = "asc",
  Desc = "desc",
}

export type BlogControllerFindByIdData = MessageDto & {
  data?: object;
};

export type BlogControllerFindBySlugData = MessageDto & {
  data?: object;
};

export type BlogControllerCreateData = MessageDto & {
  data?: object;
};

export type BlogControllerUpdateData = MessageDto & {
  data?: object;
};

export type BlogControllerDeleteData = MessageDto & {
  data?: object;
};

export type BlogControllerIncrementViewCountData = MessageDto & {
  data?: object;
};

export interface BlogControllerListTagsParams {
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
  /** 项目类型 */
  project_type: string;
  /** 是否启用 */
  is_active: boolean;
  /** 搜索标签名称 */
  search: string;
}

export type BlogControllerListTagsData = PaginatedDto & {
  /** @example 0 */
  code?: number;
  /** @example "请求成功" */
  message?: string;
  data?: {
    records?: BlogTagListDto[];
    total?: number;
    page?: number;
    page_size?: number;
  };
};

export type BlogControllerCreateTagData = MessageDto & {
  data?: object;
};

export type BlogControllerUpdateTagData = MessageDto & {
  data?: object;
};

export type BlogControllerDeleteTagData = MessageDto & {
  data?: object;
};

export interface BlogControllerListCategoriesParams {
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
  /** 项目类型 */
  project_type: string;
  /** 是否启用 */
  is_active: boolean;
  /** 父分类ID */
  parent_id: number;
  /** 搜索分类名称 */
  search: string;
}

export type BlogControllerListCategoriesData = PaginatedDto & {
  /** @example 0 */
  code?: number;
  /** @example "请求成功" */
  message?: string;
  data?: {
    records?: BlogCategoryListDto[];
    total?: number;
    page?: number;
    page_size?: number;
  };
};

export type BlogControllerCreateCategoryData = MessageDto & {
  data?: object;
};

export type BlogControllerUpdateCategoryData = MessageDto & {
  data?: object;
};

export type BlogControllerDeleteCategoryData = MessageDto & {
  data?: object;
};

export type BlogControllerAdminTestData = MessageDto & {
  data?: object;
};

export type AuthControllerRegisterData = any;

export type AuthControllerVerifyEmailData = any;

export type AuthControllerLoginData = any;

export type AuthControllerRefreshData = any;

export type AuthControllerLogoutData = any;

export type AuthControllerSendVerificationCodeData = any;

export type UserControllerMeData = any;

export type UserControllerListAllData = any;

export type UserControllerSetRoleData = any;

export interface UserManagementControllerGetUsersParams {
  /**
   * 页码
   * @min 1
   * @example 1
   */
  page?: number;
  /**
   * 每页数量
   * @min 1
   * @max 100
   * @example 10
   */
  page_size?: number;
  /**
   * 搜索关键词（邮箱、姓名）
   * @example "admin"
   */
  search?: string;
  /** 角色筛选 */
  role?: RoleEnum;
  /**
   * 验证状态筛选
   * @example true
   */
  is_verified?: boolean;
  /**
   * 激活状态筛选
   * @example true
   */
  is_active?: boolean;
  /**
   * 排序字段
   * @example "created_at"
   */
  sortBy?: string;
  /**
   * 排序方向
   * @example "desc"
   */
  sortOrder?: SortOrderEnum1;
}

/** 角色筛选 */
export enum RoleEnum {
  User = "user",
  Staff = "staff",
  Admin = "admin",
}

/**
 * 排序方向
 * @example "desc"
 */
export enum SortOrderEnum1 {
  Asc = "asc",
  Desc = "desc",
}

export type UserManagementControllerGetUsersData = PaginatedDto & {
  /** @example 0 */
  code?: number;
  /** @example "请求成功" */
  message?: string;
  data?: {
    records?: UserResponseDto[];
    total?: number;
    page?: number;
    page_size?: number;
  };
};

/** 角色筛选 */
export enum UserManagementControllerGetUsersParams1RoleEnum {
  User = "user",
  Staff = "staff",
  Admin = "admin",
}

/**
 * 排序方向
 * @example "desc"
 */
export enum UserManagementControllerGetUsersParams1SortOrderEnum {
  Asc = "asc",
  Desc = "desc",
}

export type UserManagementControllerCreateUserData = MessageDto & {
  data?: UserResponseDto;
};

export type UserManagementControllerGetUserByIdData = MessageDto & {
  data?: UserResponseDto;
};

export type UserManagementControllerUpdateUserData = MessageDto & {
  data?: UserResponseDto;
};

export type UserManagementControllerDeleteUserData = MessageDto & {
  data?: object;
};

export type UserManagementControllerGetUserByEmailData = MessageDto & {
  data?: UserResponseDto;
};

export type UserManagementControllerUpdateUserStatusData = MessageDto & {
  data?: object;
};

export type UserManagementControllerUpdateUserRoleData = MessageDto & {
  data?: object;
};

export type UserManagementControllerResetUserPasswordData = MessageDto & {
  data?: object;
};

export type UserManagementControllerVerifyUserEmailData = MessageDto & {
  data?: object;
};

export type UserActivityControllerGetActivityStatsData = any;

export type UserActivityControllerGetTodayActiveUsersData = any;

export type UserActivityControllerGetWeeklyActiveUsersData = any;

export type UserActivityControllerGetMonthlyActiveUsersData = any;

export interface UserActivityControllerGetActiveUsersTrendParams {
  /** 天数，默认7天 */
  days?: string;
}

export type UserActivityControllerGetActiveUsersTrendData = any;

export interface UserActivityControllerGetInactiveUsersParams {
  /** 不活跃天数，默认30天 */
  days?: string;
}

export type UserActivityControllerGetInactiveUsersData = any;

export type UserActivityControllerGetActivityDistributionData = any;

export type OrderControllerCreateOrderData = MessageDto & {
  data?: OrderWithDetailsDto;
};

export interface OrderControllerGetOrdersParams {
  /**
   * 用户ID
   * @example 1
   */
  user_id?: number;
  /** 订单状态 */
  status?: StatusEnum3;
  /** 支付状态 */
  payment_status?: PaymentStatusEnum;
  /**
   * 订单号
   * @example "ORD202401010001"
   */
  order_number?: string;
  /**
   * 开始日期
   * @example "2024-01-01"
   */
  start_date?: string;
  /**
   * 结束日期
   * @example "2024-12-31"
   */
  end_date?: string;
  /**
   * 页码
   * @min 1
   * @example 1
   */
  page?: number;
  /**
   * 每页数量
   * @min 1
   * @max 100
   * @example 10
   */
  page_size?: number;
  /**
   * 排序字段
   * @example "created_at"
   */
  sort_by?: SortByEnum2;
  /**
   * 排序顺序
   * @example "desc"
   */
  sort_order?: SortOrderEnum2;
}

/** 订单状态 */
export enum StatusEnum3 {
  PENDING = "PENDING",
  PAID = "PAID",
  PROCESSING = "PROCESSING",
  SHIPPED = "SHIPPED",
  DELIVERED = "DELIVERED",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
  REFUNDED = "REFUNDED",
}

/** 支付状态 */
export enum PaymentStatusEnum {
  PENDING = "PENDING",
  PAID = "PAID",
  FAILED = "FAILED",
  REFUNDED = "REFUNDED",
  CANCELLED = "CANCELLED",
}

/**
 * 排序字段
 * @example "created_at"
 */
export enum SortByEnum2 {
  CreatedAt = "created_at",
  TotalAmount = "total_amount",
  OrderNumber = "order_number",
}

/**
 * 排序顺序
 * @example "desc"
 */
export enum SortOrderEnum2 {
  Asc = "asc",
  Desc = "desc",
}

export type OrderControllerGetOrdersData = PaginatedDto & {
  /** @example 0 */
  code?: number;
  /** @example "请求成功" */
  message?: string;
  data?: {
    records?: OrderWithDetailsDto[];
    total?: number;
    page?: number;
    page_size?: number;
  };
};

/** 订单状态 */
export enum OrderControllerGetOrdersParams1StatusEnum {
  PENDING = "PENDING",
  PAID = "PAID",
  PROCESSING = "PROCESSING",
  SHIPPED = "SHIPPED",
  DELIVERED = "DELIVERED",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
  REFUNDED = "REFUNDED",
}

/** 支付状态 */
export enum OrderControllerGetOrdersParams1PaymentStatusEnum {
  PENDING = "PENDING",
  PAID = "PAID",
  FAILED = "FAILED",
  REFUNDED = "REFUNDED",
  CANCELLED = "CANCELLED",
}

/**
 * 排序字段
 * @example "created_at"
 */
export enum OrderControllerGetOrdersParams1SortByEnum {
  CreatedAt = "created_at",
  TotalAmount = "total_amount",
  OrderNumber = "order_number",
}

/**
 * 排序顺序
 * @example "desc"
 */
export enum OrderControllerGetOrdersParams1SortOrderEnum {
  Asc = "asc",
  Desc = "desc",
}

export type OrderControllerGetOrderStatsData = MessageDto & {
  data?: OrderStatsDto;
};

export type OrderControllerGetOrderByIdData = MessageDto & {
  data?: OrderWithDetailsDto;
};

export type OrderControllerUpdateOrderData = MessageDto & {
  data?: OrderWithDetailsDto;
};

export type OrderControllerDeleteOrderData = MessageDto & {
  data?: object;
};

export type OrderControllerCancelOrderData = MessageDto & {
  data?: OrderWithDetailsDto;
};

export type OrderControllerConfirmOfflinePaymentData = MessageDto & {
  data?: OrderWithDetailsDto;
};

export type CartControllerGetCartData = MessageDto & {
  data?: CartResponseDto;
};

export type CartControllerAddToCartData = MessageDto & {
  data?: CartResponseDto;
};

export type CartControllerUpdateCartItemData = MessageDto & {
  data?: CartResponseDto;
};

export type CartControllerRemoveFromCartData = MessageDto & {
  data?: CartResponseDto;
};

export type CartControllerClearCartData = MessageDto & {
  data?: CartResponseDto;
};

export type CartControllerGetCartItemCountData = MessageDto & {
  data?: CartCountResponseDto;
};

export type CartControllerValidateCartItemsData = MessageDto & {
  data?: CartValidationResponseDto;
};

export type AddressControllerGetCountriesData = MessageDto & {
  data?: object;
};

export type AddressControllerGetProvincesByCountryData = MessageDto & {
  data?: object;
};

export type AddressControllerValidateAddressData = MessageDto & {
  data?: object;
};
