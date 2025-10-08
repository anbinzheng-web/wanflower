import { ProTable, defineColumns } from '@/components/ProTable';
import { EditOutlined, DeleteOutlined, KeyOutlined, CheckCircleOutlined, StopOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Tag } from 'antd';
import { API } from '@/api';
import { useUserModal } from './components/UserModal';
import { useRef } from 'react';
import { ProTableRef } from '@/components/ProTable';

export default function User() {
  const tableRef = useRef<ProTableRef>(null);
  const { showCreateModal, showEditModal, showResetPasswordModal } = useUserModal(tableRef);
  const columns = defineColumns([
    {
      title: 'ID',
      dataIndex: 'id',
      sorter: true
    },
    {
      title: '头像',
      dataIndex: 'avatar_url',
      width: 80,
      render: (avatar_url, record) => {
        if (avatar_url) {
          return <img src={avatar_url} alt="avatar" className="w-8 h-8 rounded-full object-cover" />
        }
        return <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
          <UserOutlined className="text-gray-500" />
        </div>
      }
    },
    {
      title: '姓名',
      dataIndex: 'first_name',
      render: (first_name, record) => {
        const fullName = [first_name, record.last_name].filter(Boolean).join(' ');
        return fullName || '-';
      }
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      ellipsis: true,
      searchType: 'Input'
    },
    {
      title: '手机号',
      dataIndex: 'phone',
      render: (phone) => phone || '-'
    },
    {
      title: '角色',
      dataIndex: 'role',
      render: (role) => {
        const roleConfig = {
          admin: { color: 'red', text: '管理员' },
          staff: { color: 'blue', text: '员工' },
          user: { color: 'green', text: '用户' }
        };
        const config = roleConfig[role] || { color: 'default', text: role };
        return <Tag color={config.color}>{config.text}</Tag>;
      }
    },
    {
      title: '状态',
      dataIndex: 'is_active',
      render: (is_active) => (
        <Tag color={is_active ? 'green' : 'red'}>
          {is_active ? '激活' : '禁用'}
        </Tag>
      )
    },
    {
      title: '验证状态',
      dataIndex: 'is_verified',
      render: (is_verified) => (
        <Tag color={is_verified ? 'green' : 'orange'}>
          {is_verified ? '已验证' : '未验证'}
        </Tag>
      )
    },
    {
      title: '最近登陆时间',
      dataIndex: 'last_login',
      render: (last_login) => $formatDate(last_login),
    },
    {
      title: '更新时间',
      dataIndex: 'updated_at',
      render: (text) => $formatDate(text),
    },
    {
      title: '创建时间',
      dataIndex: 'created_at',
      render: (text) => $formatDate(text),
    }
  ])


  const actions = [
    {
      name: 'edit',
      icon: <EditOutlined />,
      text: '编辑',
      collapsed: true
    },
    {
      name: 'resetPassword',
      icon: <KeyOutlined />,
      text: '重置密码',
      collapsed: true
    },
    {
      name: 'verifyEmail',
      icon: <CheckCircleOutlined />,
      text: '验证邮箱',
      hide: (record) => record.is_verified,
      collapsed: true
    },
    {
      name: 'toggleStatus',
      icon: <StopOutlined />,
      text: '切换状态',
      collapsed: true
    },
    {
      name: 'delete',
      icon: <DeleteOutlined />,
      text: '删除',
      danger: true,
      collapsed: true
    },
  ]

  const handleAction = async (name, record) => {
    switch (name) {
      case 'edit':
        showEditModal(record);
        break;
      case 'delete':
        handleDelete(record);
        break;
      case 'resetPassword':
        showResetPasswordModal(record);
        break;
      case 'verifyEmail':
        handleVerifyEmail(record);
        break;
      case 'toggleStatus':
        handleToggleStatus(record);
        break;
      default:
        console.log('未知操作:', name, record);
    }
  }

  const handleDelete = async (record) => {
    try {
      await API.users.userManagementControllerDeleteUser(record.id);
      $message.success('用户删除成功');
      // 刷新表格
      tableRef.current?.refresh();
    } catch (error) {
      console.error('删除用户失败:', error);
      $message.error('删除用户失败');
    }
  }

  const handleVerifyEmail = async (record) => {
    try {
      await API.users.userManagementControllerVerifyUserEmail(record.id);
      $message.success('邮箱验证成功');
      // 刷新表格
      tableRef.current?.refresh();
    } catch (error) {
      console.error('验证邮箱失败:', error);
      $message.error('验证邮箱失败');
    }
  }

  const handleToggleStatus = async (record) => {
    try {
      const newStatus = !record.is_active;
      const res = await API.users.userManagementControllerUpdateUserStatus(record.id, { is_active: newStatus });
      if (res.code === 0) {
        $message.success(`用户已${newStatus ? '激活' : '禁用'}`);
        tableRef.current?.refresh();
      } 
    } catch (error) {
      console.error('切换用户状态失败:', error);
      $message.error('切换用户状态失败');
    }
  }

  return (
    <ProTable
      columns={columns}
      request={API.users.userManagementControllerGetUsers}
      actions={actions}
      handleAction={handleAction}
      toolBar={<Button type='primary' onClick={showCreateModal}>创建用户</Button>}
      pagination={{
        showSizeChanger: true,
        showQuickJumper: true,
        showTotal: (total, range) => `第 ${range[0]}-${range[1]} 条/共 ${total} 条`
      }}
      rowKey="id"
      scroll={{ x: 'max-content' }}
      ref={tableRef}
    />
  )
}
