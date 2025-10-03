import {
  Form,
  Input,
  Checkbox,
  Button,
  Space,
  message,
} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import React, { useEffect, useRef, useState } from 'react';
import useStorage from '@/utils/useStorage';
import { FormInstance } from 'antd/es/form';
import { LoginDto } from 'backend-api';
import { API } from '@/api';
import { saveTokens, saveUserInfo } from '@/utils/auth';

export default function LoginForm() {
  const [formRef] = Form.useForm<LoginDto>()
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [loginParams, setLoginParams, removeLoginParams] =
    useStorage('loginParams');

  const [rememberPassword, setRememberPassword] = useState(!!loginParams);

  function afterLoginSuccess(params) {
    // 记住密码
    if (rememberPassword) {
      setLoginParams(JSON.stringify(params));
    } else {
      removeLoginParams();
    }
    // 记录登录状态
    localStorage.setItem('userStatus', 'login');
    // 跳转首页
    window.location.href = '/';
  }

  function login(params: LoginDto) {
    setErrorMessage('');
    setLoading(true);
    
    API.auth.authControllerLogin(params)
      .then((res) => {
        if (res.data) {
          // 保存token和用户信息
          if (res.data.access_token) {
            saveTokens(res.data.access_token, res.data.refresh_token);
          }
          if (res.data.user) {
            saveUserInfo(res.data.user);
          }
          message.success('登录成功！');
          afterLoginSuccess(params);
        } else {
          setErrorMessage('登录出错，请刷新重试');
        }
      })
      .catch((error) => {
        console.error('登录失败:', error);
        let errorMsg = '登录出错，请刷新重试';
        
        if (error.response?.data?.message) {
          errorMsg = error.response.data.message;
        } else if (error.response?.status === 401) {
          errorMsg = '邮箱或密码错误';
        } else if (error.response?.status === 400) {
          errorMsg = '请求参数错误';
        } else if (error.response?.status >= 500) {
          errorMsg = '服务器错误，请稍后重试';
        } else if (error.code === 'NETWORK_ERROR') {
          errorMsg = '网络连接失败，请检查网络';
        }
        
        setErrorMessage(errorMsg);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function onSubmitClick() {
    formRef.validateFields().then((values: LoginDto) => {
      login(values);
    });
  }

  // 读取 localStorage，设置初始值
  useEffect(() => {
    const rememberPassword = !!loginParams;
    setRememberPassword(rememberPassword);
    if (formRef && rememberPassword) {
      const parseParams = JSON.parse(loginParams);
      formRef.setFieldsValue(parseParams);
    }
  }, [loginParams]);

  return (
    <div className="w-80">
      <div className="text-2xl font-medium text-gray-900 mb-2">登录管理后台</div>
      <div className="text-base text-gray-500 mb-6">
        高效管理您的电商业务
      </div>
      <div className="h-8 leading-8 text-red-500 mb-4">{errorMessage}</div>
      <Form
        layout="vertical"
        form={formRef}
        initialValues={{ email: 'admin@example.com', password: 'admin' }}
      >
        <Form.Item
          name="email"
          rules={[
            { required: true, message: '邮箱不能为空' },
            { type: 'email', message: '请输入有效的邮箱地址' }
          ]}
        >
          <Input
            prefix={<UserOutlined />}
            placeholder="邮箱地址"
            onPressEnter={onSubmitClick}
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: '密码不能为空' }]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="密码"
            onPressEnter={onSubmitClick}
          />
        </Form.Item>
        <Space size={16} direction="vertical">
          <div className="flex justify-between">
            <Checkbox checked={rememberPassword} onChange={(e) => setRememberPassword(e.target.checked)}>
              记住密码
            </Checkbox>
          </div>
          <Button type="primary" block onClick={onSubmitClick} loading={loading}>
            登录
          </Button>
        </Space>
      </Form>
    </div>
  );
}
