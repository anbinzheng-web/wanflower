import { useFormModal } from '@/hooks/useFormModal';
import { message } from 'antd';
import { API } from '@/api';

export const useUserModal = () => {
  const showFormModal = useFormModal();

  const showCreateModal = () => {
    showFormModal({
      title: '创建用户',
      schemas: [
        {
          name: 'email',
          label: '邮箱',
          component: 'Input',
          rules: [{ required: true, message: '请输入邮箱' }, { type: 'email', message: '请输入有效的邮箱地址' }],
        },
        {
          name: 'password',
          label: '密码',
          component: 'Input',
          componentProps: { type: 'password' },
          rules: [{ required: true, message: '请输入密码' }, { min: 6, message: '密码至少6位' }]
        },
        {
          name: 'role',
          label: '角色',
          component: 'Select',
          componentProps: {
            options: [
              { label: '用户', value: 'user' },
              { label: '员工', value: 'staff' },
              { label: '管理员', value: 'admin' }
            ]
          },
          rules: [{ required: true, message: '请选择角色' }]
        },
        {
          name: 'first_name',
          label: '名字',
          component: 'Input'
        },
        {
          name: 'last_name',
          label: '姓氏',
          component: 'Input'
        },
        {
          name: 'phone',
          label: '手机号',
          component: 'Input'
        },
        {
          name: 'avatar_url',
          label: '头像URL',
          component: 'Input'
        },
        {
          name: 'is_verified',
          label: '是否已验证',
          component: 'Switch',
          valuePropName: 'checked'
        },
        {
          name: 'is_active',
          label: '是否激活',
          component: 'Switch',
          valuePropName: 'checked'
        }
      ],
      onOk: async (values) => {
        try {
          await API.users.userManagementControllerCreateUser(values);
          message.success('用户创建成功');
          return true;
        } catch (error) {
          console.error('创建用户失败:', error);
          message.error('创建用户失败');
          return false;
        }
      }
    });
  };

  const showEditModal = (record: any) => {
    showFormModal({
      title: '编辑用户',
      schemas: [
        {
          name: 'email',
          label: '邮箱',
          component: 'Input',
          rules: [{ required: true, message: '请输入邮箱' }, { type: 'email', message: '请输入有效的邮箱地址' }],
        },
        {
          name: 'password',
          label: '密码',
          component: 'Input',
          componentProps: { type: 'password', placeholder: '留空表示不修改密码' },
        },
        {
          name: 'role',
          label: '角色',
          component: 'Select',
          componentProps: {
            options: [
              { label: '用户', value: 'user' },
              { label: '员工', value: 'staff' },
              { label: '管理员', value: 'admin' }
            ]
          },
          rules: [{ required: true, message: '请选择角色' }],
        },
        {
          name: 'first_name',
          label: '名字',
          component: 'Input',
        },
        {
          name: 'last_name',
          label: '姓氏',
          component: 'Input',
        },
        {
          name: 'phone',
          label: '手机号',
          component: 'Input',
        },
        {
          name: 'avatar_url',
          label: '头像URL',
          component: 'Input',
        },
        {
          name: 'is_verified',
          label: '是否已验证',
          component: 'Switch',
          valuePropName: 'checked',
        },
        {
          name: 'is_active',
          label: '是否激活',
          component: 'Switch',
          valuePropName: 'checked',
        }
      ],
      initialValues: record, // 暂时注释掉，需要查看ProForm是否支持
      onOk: async (values) => {
        try {
          // 如果密码为空，删除该字段
          if (!values.password) {
            delete values.password;
          }
          await API.users.userManagementControllerUpdateUser(record.id, values);
          message.success('用户更新成功');
          return true;
        } catch (error) {
          console.error('更新用户失败:', error);
          message.error('更新用户失败');
          return false;
        }
      }
    });
  };

  const showResetPasswordModal = (record: any) => {
    showFormModal({
      title: '重置密码',
      schemas: [
        {
          name: 'password',
          label: '新密码',
          component: 'Input',
          componentProps: { type: 'password' },
          rules: [{ required: true, message: '请输入新密码' }, { min: 6, message: '密码至少6位' }]
        }
      ],
      onOk: async (values) => {
        try {
          await API.users.userManagementControllerResetUserPassword(record.id, values);
          message.success('密码重置成功');
          return true;
        } catch (error) {
          console.error('重置密码失败:', error);
          message.error('重置密码失败');
          return false;
        }
      }
    });
  };

  return {
    showCreateModal,
    showEditModal,
    showResetPasswordModal
  };
};
