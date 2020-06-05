import { useState } from 'react';
import { View } from 'cy-element';
import { Button, Form, Input } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import request from '@/utils/request';
import { saveCurrentUser } from '@/utils/appData';
import Style from './index.less';

const FormItem = Form.Item;
const Login = props => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const handleSubmit = () => {
    form.validateFields().then(async data => {
      setLoading(true);
      const { code, datas } = await request.post(
        '/api-uaa/oauth/mobile/token',
        { params: data },
      );
      setLoading(false);
      if (code !== 0) return;
      datas.isLogin = true;
      datas.authority = [
        'HOME',
        'USER_MANAGER',
        'ROLE_MANAGER',
        'MENU_MANAGER',
      ];
      saveCurrentUser(datas);
    });
  };
  return (
    <View
      className={Style.container}
      column
      justContent="center"
      alignItems="middle"
    >
      <View className={Style.content}>
        <View className={Style.banner}></View>
        <View className={Style.body} column>
          <View className={Style.logo} />
          <Form form={form} onFinish={handleSubmit} className={Style.form}>
            <FormItem
              hasFeedback
              name="mobile"
              rules={[{ required: true, message: '请输入账号' }]}
            >
              <Input
                className={Style.inp}
                maxLength={11}
                allowClear
                prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="请输入账号"
              />
            </FormItem>
            <FormItem
              hasFeedback
              name="password"
              rules={[{ required: true, message: '请输入密码' }]}
            >
              <Input
                maxLength={20}
                className={Style.inp}
                allowClear
                prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="请输入密码"
                type="password"
              />
            </FormItem>
            <FormItem>
              <Button
                htmlType="submit"
                className={Style.btn}
                className={Style.btn}
                disabled={loading}
                loading={loading}
                type="primary"
              >
                登录
              </Button>
            </FormItem>
          </Form>
        </View>
      </View>
    </View>
  );
};

export default Login;
