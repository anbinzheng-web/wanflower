import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';
import { Layout, Menu, Breadcrumb, Spin } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import qs from 'query-string';
import NProgress from 'nprogress';
import Navbar from './components/NavBar';
import useRoute, { IRoute } from '@/routes';
import { isArray } from './utils/is';
import useLocale from './utils/useLocale';
import getUrlParams from './utils/getUrlParams';
import lazyload from './utils/lazyload';
import { useAppStore } from './store';
import styles from './style/layout.module.less';

const Sider = Layout.Sider;
const Content = Layout.Content;

function getFlattenRoutes(routes) {
  const mod = import.meta.glob('./pages/**/[a-z[]*.tsx');
  const res = [];
  function travel(_routes) {
    _routes.forEach((route) => {
      if (route.key && !route.children) {
        route.component = lazyload(mod[`./pages/${route.key}/index.tsx`]);
        res.push(route);
      } else if (isArray(route.children) && route.children.length) {
        travel(route.children);
      }
    });
  }
  travel(routes);
  return res;
}

function PageLayout() {
  const urlParams = getUrlParams();
  const history = useHistory();
  const pathname = history.location.pathname;
  const currentComponent = qs.parseUrl(pathname).url.slice(1);
  const locale = useLocale();
  const { settings, userLoading, userInfo } = useAppStore(state => state)

  const [routes, defaultRoute] = useRoute(userInfo?.permissions);
  const defaultSelectedKeys = [currentComponent || defaultRoute];
  const paths = (currentComponent || defaultRoute).split('/');
  const defaultOpenKeys = paths.slice(0, paths.length - 1);

  const [breadcrumb, setBreadCrumb] = useState([]);
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [selectedKeys, setSelectedKeys] =
    useState<string[]>(defaultSelectedKeys);
  const [openKeys, setOpenKeys] = useState<string[]>(defaultOpenKeys);

  const routeMap = useRef<Map<string, React.ReactNode[]>>(new Map());
  const menuMap = useRef<
    Map<string, { menuItem?: boolean; subMenu?: boolean }>
  >(new Map());

  const navbarHeight = 60;
  const menuWidth = collapsed ? 48 : settings.menuWidth;

  const showNavbar = settings.navbar && urlParams.navbar !== false;
  const showMenu = settings.menu && urlParams.menu !== false;

  const flattenRoutes = useMemo(() => getFlattenRoutes(routes) || [], [routes]);

  function onClickMenuItem(key) {
    const currentRoute = flattenRoutes.find((r) => r.key === key);
    const component = currentRoute.component;
    const preload = component.preload();
    NProgress.start();
    preload.then(() => {
      history.push(currentRoute.path ? currentRoute.path : `/${key}`);
      NProgress.done();
    });
  }

  function toggleCollapse() {
    setCollapsed((collapsed) => !collapsed);
  }

  function renderRoutes(locale) {
    routeMap.current.clear();
    return function travel(_routes: IRoute[], level, parentNode = []): MenuProps['items'] {
      return _routes.map((route) => {
        const { breadcrumb = true, ignore, icon } = route;
        routeMap.current.set(
          `/${route.key}`,
          breadcrumb ? [...parentNode, route.name] : []
        );

        const visibleChildren = (route.children || []).filter((child) => {
          const { ignore, breadcrumb = true } = child;
          if (ignore || route.ignore) {
            routeMap.current.set(
              `/${child.key}`,
              breadcrumb ? [...parentNode, route.name, child.name] : []
            );
          }

          return !ignore;
        });

        if (ignore) {
          return null;
        }
        
        if (visibleChildren.length) {
          menuMap.current.set(route.key, { subMenu: true });
          return {
            key: route.key,
            label: route.name,
            icon: icon,
            children: travel(visibleChildren, level + 1, [...parentNode, route.name]) as MenuProps['items']
          };
        }
        
        menuMap.current.set(route.key, { menuItem: true });
        return {
          key: route.key,
          label: route.name,
          icon: icon,
        };
      }).filter(Boolean);
    };
  }

  function updateMenuStatus() {
    const pathKeys = pathname.split('/');
    const newSelectedKeys: string[] = [];
    const newOpenKeys: string[] = [...openKeys];
    while (pathKeys.length > 0) {
      const currentRouteKey = pathKeys.join('/');
      const menuKey = currentRouteKey.replace(/^\//, '');
      const menuType = menuMap.current.get(menuKey);
      if (menuType && menuType.menuItem) {
        newSelectedKeys.push(menuKey);
      }
      if (menuType && menuType.subMenu && !openKeys.includes(menuKey)) {
        newOpenKeys.push(menuKey);
      }
      pathKeys.pop();
    }
    setSelectedKeys(newSelectedKeys);
    setOpenKeys(newOpenKeys);
  }

  useEffect(() => {
    const routeConfig = routeMap.current.get(pathname);
    setBreadCrumb(routeConfig || []);
    updateMenuStatus();
  }, [pathname]);
  return (
    <Layout>
      <div className={'bg-white border-b border-gray-200 bg-gray-50'}>
        <Navbar show={showNavbar}>
          <Menu
            selectedKeys={selectedKeys}
            mode="horizontal"
            openKeys={openKeys}
            onOpenChange={(openKeys) => {
              setOpenKeys(openKeys);
            }}
            onClick={({ key }) => {
              onClickMenuItem(key)
            }}
            theme="light"
            items={renderRoutes(locale)(routes, 1)}
          />
        </Navbar>
      </div>
      {userLoading ? (
        <Spin className={styles['spin']} />
      ) : (
        <Layout>
          {/* {showMenu && (
            <Sider
              width={menuWidth}
              collapsed={collapsed}
              onCollapse={setCollapsed}
              trigger={null}
              collapsible
              breakpoint="xl"
              className="h-[calc(100vh-61px)]"
              style={{ height: 'calc(100vh-61px)' }}
            >
              <div className='h-[calc(100%-40px)]'>
                <Menu
                  selectedKeys={selectedKeys}
                  mode="horizontal"
                  openKeys={openKeys}
                  onOpenChange={(openKeys) => {
                    setOpenKeys(openKeys);
                  }}
                  onClick={({ key }) => {
                    onClickMenuItem(key)
                  }}
                  theme="dark"
                  items={renderRoutes(locale)(routes, 1)}
                />
              </div>
              <div className={'text-white h-10 flex items-center justify-center cursor-pointer'} onClick={toggleCollapse} >
                {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              </div>
            </Sider>
          )} */}
          <Layout className={'h-[calc(100vh-61px)] overflow-auto'}>
            <div className={'p-3'}>
              <Content>
                <Switch>
                  {flattenRoutes.map((route, index) => {
                    return (
                      <Route
                        key={index}
                        path={`/${route.key}`}
                        component={route.component}
                      />
                    );
                  })}
                  <Route exact path="/">
                    <Redirect to={`/${defaultRoute}`} />
                  </Route>
                  <Route
                    path="*"
                    component={lazyload(() => import('./pages/exception/403'))}
                  />
                </Switch>
              </Content>
            </div>
          </Layout>
        </Layout>
      )}
    </Layout>
  );
}

export default PageLayout;
