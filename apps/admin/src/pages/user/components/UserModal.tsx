import { useFormModal } from '@/hooks/useFormModal';
import { API } from '@/api';
import { ProTableRef } from '@/components/ProTable';

export const useUserModal = (ref: React.RefObject<ProTableRef>) => {
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
      formProps: {
        labelCol: { span: 6 },
        wrapperCol: { span: 18 },
      },
      onOk: async (values) => {
        try {
          const res = await API.users.userManagementControllerCreateUser(values);
          if (res.code === 0) {
            $message.success('用户创建成功');
            ref.current?.refresh();
          } else {
            $message.error(res.message);
          }
        } catch (error) {
          console.error('创建用户失败:', error);
          $message.error('创建用户失败');
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
      formProps: {
        labelCol: { span: 6 },
        wrapperCol: { span: 18 },
      },
      initialValues: record, // 暂时注释掉，需要查看ProForm是否支持
      onOk: async (values) => {
        try {
          // 如果密码为空，删除该字段
          if (!values.password) {
            delete values.password;
          }
          const res = await API.users.userManagementControllerUpdateUser(record.id, values);
          if (res.code === 0) {
            $message.success('用户更新成功');
            ref.current?.refresh();
          } else {
            $message.error(res.message);
          }
        } catch (error) {
          console.error('更新用户失败:', error);
          $message.error('更新用户失败');
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
      formProps: {
        labelCol: { span: 6 },
        wrapperCol: { span: 18 },
      },
      onOk: async (values) => {
        try {
          const res = await API.users.userManagementControllerResetUserPassword(record.id, values);
          if (res.code === 0) {
            $message.success('密码重置成功');
            ref.current?.refresh();
          } else {
            $message.error(res.message);
          }
        } catch (error) {
          console.error('重置密码失败:', error);
          $message.error('重置密码失败');
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
