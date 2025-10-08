import { ProTable, defineColumns } from '@/components/ProTable'
import { Button, Space, Tag, Modal, TreeSelect } from 'antd'
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { useFormModal } from '@/hooks/useFormModal';
import { API } from '@/api';
import { useState, useEffect } from 'react';

export default function() {
  const showFormModal = useFormModal();
  const [projectTypes, setProjectTypes] = useState([]);
  const [categories, setCategories] = useState([]);

  // 获取项目类型和分类数据
  useEffect(() => {
    const fetchData = async () => {
      try {
        // 获取项目类型
        setProjectTypes([
          { label: '万花电商', value: 'wanflower' },
          { label: '技术博客', value: 'tech' },
          { label: '生活随笔', value: 'life' }
        ]);

        // 获取分类数据用于父分类选择
        const categoriesRes = await API.blog.blogControllerListCategories({ 
          page: 1, 
          page_size: 1000,
          project_type: 'wanflower',
          is_active: true,
          parent_id: 0,
          search: ''
        });
        if (categoriesRes.code === 0 && categoriesRes.data?.records) {
          setCategories(categoriesRes.data.records);
        }
      } catch (error) {
        console.error('获取数据失败:', error);
      }
    };

    fetchData();
  }, []);

  // 构建树形数据
  const buildTreeData = (categories: any[], parentId: number | null = null): any[] => {
    return categories
      .filter(cat => cat.parent_id === parentId)
      .map(cat => ({
        title: cat.name,
        value: cat.id,
        key: cat.id,
        children: buildTreeData(categories, cat.id)
      }));
  };

  const columns = defineColumns([
    {
      title: 'ID',
      dataIndex: 'id',
      width: 80
    },
    {
      title: '分类名称',
      dataIndex: 'name',
      searchType: 'Input',
      searchProps: {
        placeholder: '请输入分类名称'
      }
    },
    {
      title: 'Slug',
      dataIndex: 'slug'
    },
    {
      title: '父分类',
      dataIndex: 'parent_id',
      render: (parentId, record) => {
        if (!parentId) return '-';
        const parent = categories.find(cat => cat.id === parentId);
        return parent ? parent.name : '-';
      }
    },
    {
      title: '项目类型',
      dataIndex: 'project_type',
      searchType: 'Select',
      searchProps: {
        options: projectTypes,
        placeholder: '请选择项目类型'
      }
    },
    {
      title: '描述',
      dataIndex: 'description',
      render: (description) => description || '-'
    },
    {
      title: '排序权重',
      dataIndex: 'sort_order',
      sorter: true,
      render: (order) => order || 0
    },
    {
      title: '状态',
      dataIndex: 'is_active',
      searchType: 'Select',
      searchProps: {
        options: [
          { label: '启用', value: true },
          { label: '禁用', value: false }
        ]
      },
      render: (isActive) => (
        <Tag color={isActive ? 'green' : 'red'}>
          {isActive ? '启用' : '禁用'}
        </Tag>
      )
    },
    {
      title: '创建时间',
      dataIndex: 'created_at',
      sorter: true,
      render: (date) => globalThis.$formatDate(date)
    }
  ]);

  const actions = [
    {
      name: 'edit',
      icon: <EditOutlined />,
      text: '编辑',
      collapsed: true
    },
    {
      name: 'delete',
      icon: <DeleteOutlined />,
      text: '删除',
      danger: true,
      collapsed: true
    }
  ];

  const handleAction = async (name: string, record: any) => {
    switch (name) {
      case 'edit':
        showFormModal({
          title: '编辑分类',
          schemas: [
            {
              name: 'name',
              label: '分类名称',
              component: 'Input',
              rules: [{ required: true, message: '请输入分类名称' }],
              componentProps: {
                placeholder: '请输入分类名称'
              }
            },
            {
              name: 'slug',
              label: 'Slug',
              component: 'Input',
              componentProps: {
                placeholder: '请输入slug（留空自动生成）'
              }
            },
            {
              name: 'description',
              label: '描述',
              component: 'Textarea',
              componentProps: {
                placeholder: '请输入分类描述',
                rows: 3
              }
            },
            {
              name: 'parent_id',
              label: '父分类',
              component: 'TreeSelect',
              componentProps: {
                placeholder: '请选择父分类（留空为顶级分类）',
                treeData: buildTreeData(categories),
                allowClear: true,
                treeDefaultExpandAll: true
              }
            },
            {
              name: 'project_type',
              label: '项目类型',
              component: 'Select',
              rules: [{ required: true, message: '请选择项目类型' }],
              componentProps: {
                options: projectTypes,
                placeholder: '请选择项目类型'
              }
            },
            {
              name: 'sort_order',
              label: '排序权重',
              component: 'InputNumber',
              componentProps: {
                placeholder: '请输入排序权重',
                min: 0
              }
            },
            {
              name: 'is_active',
              label: '是否启用',
              component: 'Switch'
            }
          ],
          initialValues: record,
          onOk: async (values) => {
            try {
              const result = await API.blog.blogControllerUpdateCategory({ id: record.id, ...values });
              if (result.code === 0) {
                globalThis.$message.success('更新成功');
                return true;
              } else {
                globalThis.$message.error(result.message || '更新失败');
                return false;
              }
            } catch (error) {
              globalThis.$message.error('更新失败');
              return false;
            }
          }
        });
        break;
      case 'delete':
        const confirmed = await new Promise((resolve) => {
          Modal.confirm({
            title: '确认删除',
            content: `确定要删除分类"${record.name}"吗？`,
            onOk: () => resolve(true),
            onCancel: () => resolve(false)
          });
        });
        
        if (confirmed) {
          try {
            const result = await API.blog.blogControllerDeleteCategory(record.id);
            if (result.code === 0) {
              globalThis.$message.success('删除成功');
              window.location.reload();
            } else {
              globalThis.$message.error(result.message || '删除失败');
            }
          } catch (error) {
            globalThis.$message.error('删除失败');
          }
        }
        break;
    }
  };

  const handleCreate = () => {
    showFormModal({
      title: '创建分类',
      schemas: [
        {
          name: 'name',
          label: '分类名称',
          component: 'Input',
          rules: [{ required: true, message: '请输入分类名称' }],
          componentProps: {
            placeholder: '请输入分类名称'
          }
        },
        {
          name: 'slug',
          label: 'Slug',
          component: 'Input',
          componentProps: {
            placeholder: '请输入slug（留空自动生成）'
          }
        },
        {
          name: 'description',
          label: '描述',
          component: 'Textarea',
          componentProps: {
            placeholder: '请输入分类描述',
            rows: 3
          }
        },
        {
          name: 'parent_id',
          label: '父分类',
          component: 'TreeSelect',
          componentProps: {
            placeholder: '请选择父分类（留空为顶级分类）',
            treeData: buildTreeData(categories),
            allowClear: true,
            treeDefaultExpandAll: true
          }
        },
        {
          name: 'project_type',
          label: '项目类型',
          component: 'Select',
          rules: [{ required: true, message: '请选择项目类型' }],
          componentProps: {
            options: projectTypes,
            placeholder: '请选择项目类型'
          }
        },
        {
          name: 'sort_order',
          label: '排序权重',
          component: 'InputNumber',
          componentProps: {
            placeholder: '请输入排序权重',
            min: 0
          }
        }
      ],
      onOk: async (values) => {
        try {
          const result = await API.blog.blogControllerCreateCategory(values);
          if (result.code === 0) {
            globalThis.$message.success('创建成功');
            return true;
          } else {
            globalThis.$message.error(result.message || '创建失败');
            return false;
          }
        } catch (error) {
          globalThis.$message.error('创建失败');
          return false;
        }
      }
    });
  };

  return (
    <div>
      <ProTable
        columns={columns}
        request={API.blog.blogControllerListCategories}
        actions={actions}
        handleAction={handleAction}
        toolBar={
          <Space>
            <Button type="primary" icon={<PlusOutlined />} onClick={handleCreate}>
              创建分类
            </Button>
          </Space>
        }
      />
    </div>
  );
}
