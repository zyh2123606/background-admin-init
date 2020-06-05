import React from 'react';
import { Modal, Form, Input, Button } from 'antd';
import { connect } from 'dva';
import { removeCurrentUser } from '@/utils/appData';
import { DispatchProps, IAccount } from '@/utils/interface';
import { useHistory } from 'umi';

interface IProps {
  pwdVisible: boolean;
  dispatch: DispatchProps;
  loading: boolean;
  account: IAccount;
}
const FormItem = Form.Item;
const UpdatePwd: React.FunctionComponent<IProps> = ({
  pwdVisible,
  dispatch,
  account = { user: {} },
  loading,
}) => {
  const [form] = Form.useForm();
  const history = useHistory();
  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 5 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 19 },
    },
  };
  //提交表单
  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    form.validateFields().then(async values => {
      const result: any = await dispatch({
        type: 'global/updatePassword',
        values,
      });
      if (result.code !== 200) return;
      removeCurrentUser();
      dispatch({ type: 'global/pwdWinToggle' });
      history.push('/user/login');
    });
  };
  // 关闭弹窗
  const hideWin = () => {
    form.resetFields();
    dispatch({ type: 'global/pwdWinToggle' });
  };
  // 验证确认密码
  const confirmPwd = (
    rule: any,
    value: string,
    callback: (args?: any) => void,
  ) => {
    if (value && value !== form.getFieldValue('newPassword')) {
      callback('两次输入的密码不一致');
    } else {
      callback();
    }
  };
  return (
    <Modal
      visible={pwdVisible}
      title="修改密码"
      width={450}
      maskClosable={false}
      onOk={handleSubmit}
      onCancel={hideWin}
      footer={[
        <Button key="back" onClick={hideWin}>
          取消
        </Button>,
        <Button
          key="submit"
          type="primary"
          disabled={loading}
          loading={loading}
          onClick={handleSubmit}
        >
          确定
        </Button>,
      ]}
    >
      <Form form={form} layout="horizontal">
        <FormItem
          {...formItemLayout}
          label="原密码"
          name="oldPassword"
          rules={[{ required: true, message: '请输入原密码' }]}
        >
          <Input.Password maxLength={20} placeholder="请输入原密码" />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="新密码"
          name="newPassword"
          rules={[
            { required: true, message: '请输入新密码' },
            { whitespace: true, message: '不能以空格开头' },
            {
              pattern: /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)]|[\(\)])+$)([^(0-9a-zA-Z)]|[\(\)]|[a-z]|[A-Z]|[0-9]){8,20}$/,
              message: '密码必须是包含大小写、数字、特殊字符中两个的8-20位字符',
            },
          ]}
        >
          <Input.Password maxLength={20} placeholder="请输入新密码" />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="重复密码"
          name="repeatPassword"
          rules={[
            { required: true, message: '请再次输入密码' },
            { validator: confirmPwd },
          ]}
        >
          <Input.Password maxLength={20} placeholder="请再次输入密码" />
        </FormItem>
        <FormItem {...formItemLayout} label="手机号" name="telephone">
          <Input readOnly />
        </FormItem>
      </Form>
    </Modal>
  );
};

export default connect(({ global, loading }: any) => ({
  pwdVisible: global.pwdVisible,
  account: global.account,
  loading: loading.effects['global/updatePassword'],
}))(UpdatePwd);
