import React from 'react';
import Menu from './menu';
import { connect, Dispatch } from 'umi';
import { getMenuKeys } from './SlideMenuUtils';
import { RouteProps } from '@/utils/interface';

interface IProps {
  menuData: RouteProps[];
  dispatch: Dispatch;
}
const SideMenu: React.FunctionComponent<IProps> = React.memo(props => {
  const menuKeys: string[] = getMenuKeys(props.menuData);
  return <Menu {...props} />;
});
export default connect(({ global }: any) => ({
  collapsed: global.collapsed,
}))(SideMenu);
