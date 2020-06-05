import React, {
  useState,
  useCallback,
  useEffect,
  FunctionComponent,
} from 'react';
import { Layout, Menu, Result } from 'antd';
import { useModel, Link } from 'umi';
import {
  checkKeytToPath,
  urlToList,
  getMenuKeys,
  getDefaultOpenKeys,
} from './SlideMenuUtils';
import { RouteProps } from '@/utils/interface';
import { IconFont } from '@/components';
import Authorized from '@/utils/Authorized';
import { View } from 'cy-element';
import Style from './index.less';
import { WarningOutlined } from '@ant-design/icons';

const { Sider, Header } = Layout;
const MenuItem = Menu.Item;
const SubMenu = Menu.SubMenu;
const BaseMenu: FunctionComponent = () => {
  const { initialState } = useModel('@@initialState');
  const { menuData = [], collapsed } = initialState || {};
  const menuKeys: string[] = getMenuKeys(menuData);
  const [openKeys, setOpenKeys] = useState(
    getDefaultOpenKeys(menuKeys, location.pathname),
  );
  //渲染菜单
  const renderMenu = (menuData: RouteProps[] | undefined) => {
    if (!Array.isArray(menuData) || !menuData.length) return [];
    const menuList = menuData
      .map((item: RouteProps) => {
        if (item.routes && item.routes.some(route => route.name)) {
          const subMenuItem = (
            <SubMenu
              key={item.path}
              title={
                <span>
                  {getMenuIcon(item.icon)}
                  <span>{item.name}</span>
                </span>
              }
            >
              {renderMenu(item.routes)}
            </SubMenu>
          );
          return Authorized.check(item.authority, subMenuItem, null);
        }
        const menuItem = (
          <MenuItem key={item.path}>{getItemPath(item)}</MenuItem>
        );
        return Authorized.check(item.authority, menuItem, null);
      })
      .filter(item => item);
    return menuList.length ? menuList : noAuthRender();
  };
  //获取菜单链接是link还是a标签
  const getItemPath = (item: RouteProps) => {
    if (item.path.startsWith('http') || item.path.startsWith('https')) {
      return (
        <a href={item.path} target="_blank">
          {getMenuIcon(item.icon)}
          <span className={Style['menu-trxt']}>{item.name}</span>
        </a>
      );
    } else {
      return (
        <Link
          className={Style['menu-style']}
          to={item.path}
          replace={item.path === location.pathname}
        >
          {getMenuIcon(item.icon)}
          <span>{item.name}</span>
        </Link>
      );
    }
  };
  //获取菜单图标
  const getMenuIcon = (icon: string | undefined) => {
    if (!icon) return null;
    return <IconFont type={icon} />;
  };
  //没有任何菜单权限
  const noAuthRender = () => {
    return (
      <Result
        status="warning"
        icon={<WarningOutlined style={{ fontSize: 35, color: '#ccc' }} />}
        title={<p style={{ fontSize: 12, color: '#999' }}>没有操作权限</p>}
      />
    );
  };
  //菜单展开收缩
  const handleOpenChange = (openKeys: string[]): void => {
    const isMoreThanOne: boolean =
      openKeys.filter(openKey => isMainMenu(openKey)).length > 1;
    openKeys = (isMoreThanOne ? [openKeys.pop() || ''] : [...openKeys]).filter(
      item => item !== '',
    );
    setOpenKeys(openKeys);
  };
  const isMainMenu = (key: string) => {
    if (!key) return false;
    return menuData.some(item => {
      return item.path === key;
    });
  };
  //获取选中菜单
  const getSelectedKeys = (): string[] => {
    return urlToList(location!.pathname)
      .map(path => {
        let _keys = checkKeytToPath(menuKeys, path).pop();
        if (_keys) return _keys;
        return '';
      })
      .filter(item => item !== '');
  };
  const selectedKeys = getSelectedKeys();
  let pops = {};
  if (!collapsed)
    pops = { openKeys: openKeys.length === 0 ? [...selectedKeys] : openKeys };
  return (
    <Sider
      width={200}
      collapsed={collapsed}
      theme="light"
      className={Style.container}
    >
      <Header className={Style.log} />
      <Layout className={Style['menu-wrapper']}>
        <Menu
          mode="inline"
          {...pops}
          onOpenChange={handleOpenChange}
          selectedKeys={selectedKeys}
        >
          {renderMenu(menuData)}
        </Menu>
      </Layout>
    </Sider>
  );
};
export default BaseMenu;
