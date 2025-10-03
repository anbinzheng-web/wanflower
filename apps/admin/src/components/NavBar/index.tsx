import React, { useEffect } from 'react';
import {
  Avatar,
  Dropdown, 
  Button,
  DropdownProps,
} from 'antd';
import { PoweroffOutlined, SettingOutlined } from '@ant-design/icons';
import Logo from '@/assets/logo.svg';
import Settings from '../Settings';
import useStorage from '@/utils/useStorage';
import { useAppStore } from '@/store';
import { generatePermission } from '@/routes';

function Navbar({ show, children }: { show: boolean, children: React.ReactNode }) {
  const { updateUserInfo, userInfo } = useAppStore(state => state);

  const [_, setUserStatus] = useStorage('userStatus');
  const [role, setRole] = useStorage('userRole', 'admin');

  function logout() {
    setUserStatus('logout');
    window.location.href = '/login';
  }

  useEffect(() => {
    updateUserInfo({
      userInfo: {
        ...userInfo,
        permissions: generatePermission(role),
      },
    })
  }, [role]);

  if (!show) {
    return (
      <div className="fixed top-72 right-0">
        <Settings
          trigger={
            <Button icon={<SettingOutlined />} type="primary" size="large" />
          }
        />
      </div>
    );
  }

  const droplist: DropdownProps['menu'] = {
    items: [
      {
        key: 'logout',
        label: '退出登录',
        icon: <PoweroffOutlined />,
        onClick: () => {
          logout();
        }
      }
    ]
  };

  return (
    <div className="flex justify-between h-full">
      <div className="flex items-center">
        <div className="flex items-center w-48 pl-5">
          <Logo />
          <div className="text-gray-800 font-medium text-xl ml-2.5 font-['PingFang_SC']">
            WanFlower
          </div>
        </div>
        {children}
      </div>
      <ul className="flex list-none pr-5">
        {userInfo && (
          <li className="px-2 flex items-center">
            <Dropdown menu={droplist}>
              <Avatar size={32} className="cursor-pointer">
                <img alt="avatar" src={userInfo.avatar} />
              </Avatar>
            </Dropdown>
          </li>
        )}
      </ul>
    </div>
  );
}

export default Navbar;
