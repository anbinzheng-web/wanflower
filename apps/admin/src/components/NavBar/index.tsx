import React, { useContext, useEffect } from 'react';
import {
  Avatar,
  Dropdown,
  Menu,
  Divider,
  Button,
} from 'antd';
import { PoweroffOutlined, SettingOutlined } from '@ant-design/icons';
import { GlobalContext } from '@/context';
import useLocale from '@/utils/useLocale';
import Logo from '@/assets/logo.svg';
import Settings from '../Settings';
import styles from './style/index.module.less';
import defaultLocale from '@/locale';
import useStorage from '@/utils/useStorage';
import { useAppStore } from '@/store';
import { generatePermission } from '@/routes';
import { UserOutlined } from '@ant-design/icons';

function Navbar({ show }: { show: boolean }) {
  const { updateUserInfo, userInfo } = useAppStore(state => state);

  const [_, setUserStatus] = useStorage('userStatus');
  const [role, setRole] = useStorage('userRole', 'admin');

  const { setLang, lang, theme, setTheme } = useContext(GlobalContext);

  function logout() {
    setUserStatus('logout');
    window.location.href = '/login';
  }

  function onMenuItemClick(key) {
    if (key === 'logout') {
      logout();
    } else {
      // Message.info(`You clicked ${key}`);
    }
  }

  useEffect(() => {

    // dispatch({
    //   type: 'update-userInfo',
    //   payload: {
    //     userInfo: {
    //       ...userInfo,
    //       permissions: generatePermission(role),
    //     },
    //   },
    // });
    updateUserInfo({
      userInfo: {
        ...userInfo,
        permissions: generatePermission(role),
      },
    })
  }, [role]);

  if (!show) {
    return (
      <div className={styles['fixed-settings']}>
        <Settings
          trigger={
            <Button icon={<SettingOutlined />} type="primary" size="large" />
          }
        />
      </div>
    );
  }

  const handleChangeRole = () => {
    const newRole = role === 'admin' ? 'user' : 'admin';
    setRole(newRole);
  };

  const droplist = (
    <Menu onClickMenuItem={onMenuItemClick}>
      {/* <Menu.SubMenu
        key="role"
        title={
          <>
            <UserOutlined className={styles['dropdown-icon']} />
            <span className={styles['user-role']}>
              {role === 'admin'
                ? t['menu.user.role.admin']
                : t['menu.user.role.user']}
            </span>
          </>
        }
      >
        <Menu.Item onClick={handleChangeRole} key="switch role">
          <IconTag className={styles['dropdown-icon']} />
          {t['menu.user.switchRoles']}
        </Menu.Item>
      </Menu.SubMenu>
      <Menu.Item key="setting">
        <IconSettings className={styles['dropdown-icon']} />
        {t['menu.user.setting']}
      </Menu.Item> */}
      {/* <Menu.SubMenu
        key="more"
        title={
          <div style={{ width: 80 }}>
            <IconExperiment className={styles['dropdown-icon']} />
            {t['message.seeMore']}
          </div>
        }
      >
        <Menu.Item key="workplace">
          <IconDashboard className={styles['dropdown-icon']} />
          {t['menu.dashboard.workplace']}
        </Menu.Item>
      </Menu.SubMenu> */}

      <Divider style={{ margin: '4px 0' }} />
      <Menu.Item key="logout">
        <PoweroffOutlined className={styles['dropdown-icon']} />
        退出登录
      </Menu.Item>
    </Menu>
  );

  return (
    <div className={styles.navbar}>
      <div className={styles.left}>
        <div className={styles.logo}>
          <Logo />
          <div className={styles['logo-name']}>WanFlower</div>
        </div>
      </div>
      <ul className={styles.right}>
        {userInfo && (
          <li>
            <Dropdown droplist={droplist} position="br">
              <Avatar size={32} style={{ cursor: 'pointer' }}>
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
