import React from 'react';
import { Drawer, Avatar, List } from 'antd';
import { connect, Dispatch } from 'dva';
import { View } from 'cy-element';
import { UserOutlined } from '@ant-design/icons';
import { IAccount } from '@/utils/interface';

interface IProps {
  visible?: boolean;
  account?: IAccount;
  dispatch: Dispatch;
}
const Item = List.Item;
const Account: React.FunctionComponent<IProps> = ({
  visible,
  dispatch,
  account,
}) => {
  const onClose = (): void => {
    dispatch({ type: 'global/accountWinVisibleToggle' });
  };
  const user = account?.user;
  return (
    <Drawer visible={visible} closable={false} onClose={onClose}>
      <View column>
        <View column alignItems="middle">
          <Avatar
            size="large"
            style={{ backgroundColor: '#547eff' }}
            icon={<UserOutlined />}
          />
          <View style={{ marginTop: 10 }}>
            <View>{user?.username || '系统用户'}</View>
          </View>
        </View>
        <List style={{ marginTop: 10 }}>
          <Item>电话：{user?.mobile || '无电话号码'}</Item>
          <Item>电话：{user?.mobile || '无电话号码'}</Item>
          <Item>电话：{user?.mobile || '无电话号码'}</Item>
        </List>
      </View>
    </Drawer>
  );
};

export default connect(({ global }: any) => ({
  account: global.account,
  visible: global.accountVisible,
}))(Account);
