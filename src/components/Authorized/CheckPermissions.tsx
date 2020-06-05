import React from 'react';
import { CURRENT_AUTHORITY } from './renderAuthorized';

export type AuthorizedProps =
  | undefined
  | string
  | string[]
  | ((currentAuthority: string | string[]) => AuthorizedProps);

/**
 * @description 通用权限检查方法
 * @param { 准入权限 } authority
 * @param { 当前登录用户权限 } currentAuthority
 * @param { 通过权限的组件 } target
 * @param { 未通过的权限组件 } Exception
 * @since 19/12/25
 */
const checkPermissions = <T, K>(
  authority: AuthorizedProps,
  currentAuthority: string | string[],
  target: T,
  Exception: K,
): T | K | React.ReactNode => {
  if (!authority) return Exception;
  //处理数组的情况
  if (Array.isArray(authority)) {
    if (Array.isArray(currentAuthority)) {
      if (currentAuthority.some(item => authority.includes(item)))
        return target;
    } else if (authority.includes(currentAuthority)) {
      return target;
    }
    return Exception;
  }
  //处理是字符串的情况
  if (typeof authority === 'string') {
    if (Array.isArray(currentAuthority)) {
      if (currentAuthority.some(item => authority === item)) return target;
    } else if (currentAuthority === authority) return target;
    return Exception;
  }
  return Exception;
};

const check = <T, K>(
  authority: AuthorizedProps,
  target: T,
  Exception: K,
): T | K | React.ReactNode => {
  return checkPermissions<T, K>(
    authority,
    CURRENT_AUTHORITY,
    target,
    Exception,
  );
};

export { checkPermissions };
export default check;
