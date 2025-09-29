## WanFlower

app/
├── (marketing)/              # 营销/品牌相关
│   ├── about/                # 关于我们
│   ├── contact/              # 联系我们
│   ├── blog/                 # 博客
│   └── ...
│
├── (shop)/                   # 商城核心
│   ├── products/             # 商品目录
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx   # 商品详情
│   ├── categories/[cat]/     # 分类
│   ├── cart/page.tsx         # 购物车
│   ├── checkout/             # 结算流程
│   │   ├── page.tsx
│   │   ├── payment/page.tsx
│   │   └── success/page.tsx
│   ├── orders/               # 订单与物流
│   │   ├── page.tsx
│   │   └── [id]/page.tsx
│   ├── wishlist/page.tsx     # 心愿单
│   └── ...
│
├── (account)/                # 用户中心
│   ├── login/page.tsx
│   ├── register/page.tsx
│   ├── profile/page.tsx
│   └── reset-password/page.tsx
│
├── (help)/                   # 帮助与服务
│   ├── shipping/page.tsx     # 物流/配送政策
│   ├── returns/page.tsx      # 退换货政策
│   ├── faq/page.tsx          # 常见问题
│   └── support/page.tsx      # 在线客服/帮助中心
│
├── (legal)/                  # 法律合规
│   ├── privacy-policy/       # 隐私政策
│   │   └── page.tsx
│   ├── terms-of-service/     # 服务条款（用户协议）
│   │   └── page.tsx
│   ├── refund-policy/        # 退款政策
│   │   └── page.tsx
│   ├── cookie-policy/        # Cookie 政策
│   │   └── page.tsx
│   └── disclaimer/           # 免责声明 (可选)
│       └── page.tsx
│
├── page.tsx                  # 首页
└── sitemap.xml/              # SEO 站点地图

