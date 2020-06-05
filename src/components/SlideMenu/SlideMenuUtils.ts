import pathToRegexp from 'path-to-regexp';
import { RouteProps } from '@/utils/interface';

//获取menu keys
export const getMenuKeys = (menuData: RouteProps[]) => {
  let keys: any[] = [];
  menuData.map(item => {
    keys.push(item.path);
    if (item.routes) keys = keys.concat(getMenuKeys(item.routes));
  });
  return keys;
};

//校验key与path
export const checkKeytToPath = (
  menuKeys: string[],
  pathname: string,
): string[] => {
  return menuKeys.filter(key => {
    if (key) return pathToRegexp(key).test(pathname);
    return false;
  });
};

//将url转为数组字符串
export const urlToList = (pathname: string): string[] => {
  const urlList = pathname.split('/').filter(item => item);
  return urlList.map(
    (item, index) => `/${urlList.slice(0, index + 1).join('/')}`,
  );
};

//获取默认的openkeys
export const getDefaultOpenKeys = (
  menuKeys: string[],
  pathname: string,
): string[] => {
  return urlToList(pathname)
    .map(key => checkKeytToPath(menuKeys, key)[0])
    .filter(item => item)
    .reduce((prev, cur) => [...prev, cur], ['/']);
};
