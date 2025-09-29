import './style/global.css';
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/locale/zh_CN';
import enUS from 'antd/locale/en_US';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import PageLayout from './layout';
import { GlobalContext } from './context';
import Login from './pages/login';
import checkLogin from './utils/checkLogin';
import changeTheme from './utils/changeTheme';
import useStorage from './utils/useStorage';
// antd 兼容 react19 的包
import '@ant-design/v5-patch-for-react-19';
import { registerGlobalProperties } from './globalProperties';

function Index() {
  const [lang, setLang] = useStorage('arco-lang', 'en-US');
  const [theme, setTheme] = useStorage('arco-theme', 'light');

  function getArcoLocale() {
    switch (lang) {
      case 'zh-CN':
        return zhCN;
      case 'en-US':
        return enUS;
      default:
        return zhCN;
    }
  }

  function fetchUserInfo() {
    // 获取用户数据
  }

  useEffect(() => {
    if (checkLogin()) {
      fetchUserInfo();
    } else if (window.location.pathname.replace(/\//g, '') !== 'login') {
      window.location.pathname = '/login';
    }
  }, []);

  useEffect(() => {
    changeTheme(theme);
  }, [theme]);

  const contextValue = {
    lang,
    setLang,
    theme,
    setTheme,
  };

  return (
    <BrowserRouter>
      <ConfigProvider
        locale={getArcoLocale()}
      >
        <GlobalContext value={contextValue}>
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/" component={PageLayout} />
          </Switch>
        </GlobalContext>
      </ConfigProvider>
    </BrowserRouter>
  );
}

registerGlobalProperties();
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Index />)
