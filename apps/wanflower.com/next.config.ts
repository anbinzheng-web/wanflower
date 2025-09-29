import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
	/* config options here */
	turbopack: {
    rules: {
      '*.svg': {
        loaders: [{
          loader: '@svgr/webpack',
          options: {
            icon: true,
            svgo: true,
            // svgoConfig: {
            //   plugins: [
            //     {
            //       name: 'removeViewBox',
            //       active: false, // 保留 viewBox 方便缩放
            //     },
            //   ],
            // },
          }
        }],
        as: '*.js',
      },
    },
  },
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
