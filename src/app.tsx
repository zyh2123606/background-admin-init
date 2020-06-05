import React from 'react';
import { RequestConfig } from 'umi';
import { render as DOMRender, unmountComponentAtNode } from 'react-dom';
import { createLogger } from 'redux-logger';
import { RouteProps } from '@/utils/interface';
import Loading from './loading';
import umiRequest from '@/utils/request';
import { getCurrentUser } from '@/utils/appData';
import { history } from 'umi';
import NProgress from 'nprogress';

export const dva = {
  config: {
    onAction: createLogger(),
    onError(err: Error) {
      console.error(err.message);
    },
  },
};

export const request: RequestConfig = {
  errorConfig: {
    adaptor: resData => {
      return {
        success: resData.code === 0,
        errorMessage: resData.msg,
        data: resData.data,
      };
    },
  },
};

let serverRoutes: RouteProps[] = [],
  menuData: RouteProps[] | undefined = [];
export const patchRoutes = <T extends { routes: RouteProps[] }>(props: T) => {
  //路由根组件
  const rootRoutes: RouteProps | undefined = props.routes.find(
    (item: RouteProps) => item.path === '/',
  );
  if (!rootRoutes) return;
  //服务器返回的路由数据和系统路由配置生成菜单
  if (Array.isArray(serverRoutes) && serverRoutes.length) {
    getAuthorizedRoutes(rootRoutes.routes, serverRoutes);
    menuData = rootRoutes?.routes?.filter(item => item.path !== '/home') || [];
  }
};

const getAuthorizedRoutes = (
  localRoutes: RouteProps[] | undefined,
  serverRoutes: RouteProps[],
) => {
  if (!localRoutes) return [];
  return localRoutes
    .filter(item => item.path)
    .map((route: RouteProps) => {
      if (route.path === '/home') {
        route.authority = 'HOME';
        return route;
      }
      const menuItem = serverRoutes.find(
        (menu: RouteProps) => menu.path === route.path,
      );
      if (menuItem) {
        route.name = menuItem.name;
        route.authority = menuItem.authority;
        if (route.routes)
          route.routes = getAuthorizedRoutes(
            route.routes,
            menuItem.routes || [],
          );
        return route;
      }
      return { path: 'NULL' };
    })
    .filter(item => item.path !== 'NULL');
};

//渲染前预取数据
export const render = async (oldRender: Function) => {
  NProgress.start();
  const account = getCurrentUser();
  if (!account?.isLogin) {
    history.push('/auth/login');
    NProgress.done();
    return oldRender();
  }
  appendLoading();
  umiRequest
    .get('/getMenu')
    .then(({ code, data }) => {
      if (code === 0) serverRoutes = data;
    })
    .finally(() => {
      removeLoading();
      oldRender();
      NProgress.done();
    });
};

export const onRouteChange = <T extends { location: Location }>(props: T) => {
  if (props.location.pathname === '/') history.push('/home');
};

const appendLoading = () => {
  const container = document.createElement('div');
  container.id = 'loading-container';
  document.body.appendChild(container);
  DOMRender(<Loading />, container);
};

const removeLoading = () => {
  const container = document.getElementById('loading-container');
  if (container) {
    unmountComponentAtNode(container);
    document.body.removeChild(container);
  }
};

const initialState = {
  collapsed: false,
  menuData: [] as RouteProps[] | undefined,
};
export const getInitialState = () => {
  initialState.menuData = menuData;
  return initialState;
};
