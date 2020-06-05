import pathToRegexp from 'path-to-regexp';
import RenderAuthorize from '@/components/Authorized';
import { getCurrentUser } from '@/utils/appData';
import { RouteProps } from '@/utils/interface';

/**
 * @description 根据路由获取权限
 * @param { 路由数组 } router
 * @param { 当前路由名称 } pathname
 */
let route: RouteProps | undefined;
export const getAuthorityByRoute = (
  router: RouteProps[],
  pathname: string,
): RouteProps | undefined => {
  router.map(item => {
    if (item.path && pathToRegexp(item.path).exec(pathname)) {
      route = item;
    } else {
      if (item.routes) route = getAuthorityByRoute(item.routes, pathname);
    }
  });
  return route;
};

//获取当前用户的权限
const getCurrentAuthority = (): string | string[] => {
  let account = getCurrentUser(),
    authority;
  authority = 'undefined';
  if (account) {
    if (typeof account.authority === 'string') {
      authority = [account.authority];
    } else {
      authority = account.authority;
    }
  }
  return authority;
};

//当前路由权限检查组件
let Authorized = RenderAuthorize(getCurrentAuthority());

//刷新路由权限
export const reloadAuthorized = (): void => {
  Authorized = RenderAuthorize(getCurrentAuthority());
};

export default Authorized;
