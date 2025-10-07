import auth, { AuthParams } from '@/utils/authentication';
import { ReactNode, useEffect, useMemo, useState } from 'react';
import { 
  FileTextOutlined, 
  ShoppingOutlined, 
  UserOutlined, 
  ShoppingCartOutlined, 
  AppstoreOutlined,
  UnorderedListOutlined,
  TagsOutlined,
  DollarOutlined,
  PictureOutlined
} from '@ant-design/icons';

export type IRoute = AuthParams & {
  name: string;
  key: string;
  // 当前页是否展示面包屑
  breadcrumb?: boolean;
  children?: IRoute[];
  // 当前路由是否渲染菜单项，为 true 的话不会在菜单中显示，但可通过路由地址访问。
  ignore?: boolean;
  icon?: ReactNode
};

export const routes: IRoute[] = [
  {
    name: '产品管理',
    key: 'product',
    icon: <AppstoreOutlined />,
    children: [
      {
        name: '产品列表',
        key: 'product/list',
        icon: <UnorderedListOutlined />,
        // requiredPermissions: [{ resource: 'product', actions: ['read'] }]
      },
      {
        name: '产品分类',
        key: 'product/category',
        icon: <TagsOutlined />,
        // requiredPermissions: [{ resource: 'product', actions: ['read'] }]
      }
    ]
  },
  {
    name: '订单管理',
    key: 'order',
    icon: <ShoppingOutlined />,
    children: [
      {
        name: '订单列表',
        key: 'order/list',
        icon: <UnorderedListOutlined />,
      },
      {
        name: '购物车管理',
        key: 'order/cart',
        icon: <ShoppingCartOutlined />,
      }
    ]
  },
  {
    name: '支付管理',
    key: 'payment',
    icon: <DollarOutlined />,
    children: [
      {
        name: '支付记录',
        key: 'payment/list',
        icon: <UnorderedListOutlined />,
      }
    ]
  },
  {
    name: '媒体管理',
    key: 'media',
    icon: <PictureOutlined />
  },
  {
    name: '博客管理',
    key: 'blog',
    icon: <FileTextOutlined />,
    children: [
      {
        name: '博客文章',
        key: 'blog/list',
        icon: <FileTextOutlined />
      },
      {
        name: '标签管理',
        key: 'blog/tags',
        icon: <TagsOutlined />
      },
      {
        name: '分类管理',
        key: 'blog/categories',
        icon: <UnorderedListOutlined />
      }
    ]
  },
  {
    name: '用户管理',
    key: 'user',
    icon: <UserOutlined />
  },
];

export const getName = (path: string, routes) => {
  return routes.find((item) => {
    const itemPath = `/${item.key}`;
    if (path === itemPath) {
      return item.name;
    } else if (item.children) {
      return getName(path, item.children);
    }
  });
};

export const generatePermission = (role: string) => {
  const actions = role === 'admin' ? ['*'] : ['read'];
  const result = {};
  routes.forEach((item) => {
    if (item.children) {
      item.children.forEach((child) => {
        result[child.name] = actions;
      });
    }
  });
  return result;
};

const useRoute = (userPermission): [IRoute[], string] => {
  const filterRoute = (routes: IRoute[], arr = []): IRoute[] => {
    if (!routes.length) {
      return [];
    }
    for (const route of routes) {
      const { requiredPermissions, oneOfPerm } = route;
      let visible = true;
      if (requiredPermissions) {
        visible = auth({ requiredPermissions, oneOfPerm }, userPermission);
      }

      if (!visible) {
        continue;
      }
      if (route.children && route.children.length) {
        const newRoute = { ...route, children: [] };
        filterRoute(route.children, newRoute.children);
        if (newRoute.children.length) {
          arr.push(newRoute);
        }
      } else {
        arr.push({ ...route });
      }
    }

    return arr;
  };

  const [permissionRoute, setPermissionRoute] = useState(routes);

  useEffect(() => {
    const newRoutes = filterRoute(routes);
    setPermissionRoute(newRoutes);
  }, [JSON.stringify(userPermission)]);

  const defaultRoute = useMemo(() => {
    const first = permissionRoute[0];
    if (first) {
      const firstRoute = first?.children?.[0]?.key || first.key;
      return firstRoute;
    }
    return '';
  }, [permissionRoute]);

  return [permissionRoute, defaultRoute];
};

export default useRoute;
