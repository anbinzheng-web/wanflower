import React, { useEffect } from 'react';
// import Footer from '@/components/Footer';
import Logo from '@/assets/logo.svg';
import LoginForm from './form';
import LoginBanner from './banner';

function Login() {
  useEffect(() => {
    document.body.setAttribute('arco-theme', 'light');
  }, []);

  return (
    <div className="flex h-screen">
      <div className="fixed top-6 left-6 z-10 flex items-center">
        <Logo />
        <div className="ml-1 mr-1 text-xl text-white">万花电商管理后台</div>
      </div>
      <div className="w-[550px] bg-gradient-to-br from-gray-800 to-blue-900 flex justify-center items-center">
        <div className="h-full flex-1">
          <LoginBanner />
        </div>
      </div>
      <div className="flex-1 relative pb-10 flex justify-center items-center">
        <div className="flex-1 flex justify-center items-center">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
Login.displayName = 'LoginPage';

export default Login;
