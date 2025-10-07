import { useState, useCallback, useEffect } from 'react'
import { ProTable, defineColumns, defineActions } from '@/components/ProTable'
import { useFormModal } from '@/hooks/useFormModal'
import { API } from '@/api'
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import { Button, Tag, Image } from 'antd'
import { defineSchemas } from '@/components/ProForm'

// 分类列表列定义
const columns = defineColumns([
  {
    title: '分类名称',
    dataIndex: 'name',
    render: (text: string, record: any) => (
      <div className="flex items-center space-x-2">
        <div>
          <div className="font-medium">{text}</div>
          <div className="text-xs text-gray-500">/{record.slug}</div>
        </div>
      </div>
    )
  },
  {
    title: '描述',
    dataIndex: 'description',
    render: (text: string) => text || '-'
  },
  {
    title: '状态',
    dataIndex: 'is_active',
    render: (isActive: boolean) => (
      <Tag color={isActive ? 'green' : 'red'}>
        {isActive ? '启用' : '禁用'}
      </Tag>
    )
  },
  {
    title: '排序权重',
    dataIndex: 'sort_order',
    render: (order: number) => order || 0
  },
  {
    title: '产品数量',
    dataIndex: 'product_count',
    render: (count: number) => count || 0
  },
  {
    title: '创建时间',
    dataIndex: 'created_at',
    render: (date: string) => $formatDate(date)
  }
])

// 操作按钮定义
const actions = defineActions([
  {
    name: 'edit',
    icon: <EditOutlined />,
  },
  {
    name: 'delete',
    icon: <DeleteOutlined />,
    danger: true,
  }
])

export default function CategoryManagement() {
  const [categories, setCategories] = useState<any[]>([])
  const [treeData, setTreeData] = useState<any[]>([])

  // 分类表单配置
  

  // 分类表单弹窗
  const showCategoryModal = useFormModal()

  // 打开分类表单
  const openCategoryModal = (record?: any) => {
    showCategoryModal({
      title: record ? '编辑分类' : '新增分类',
      schemas: defineSchemas([
        { name: 'name', label: '分类名称', component: 'Input', required: true },
        { name: 'slug', label: 'URL标识', component: 'Input', required: true },
        { name: 'description', label: '分类描述', component: 'Textarea', componentProps: { rows: 4 } },
        { name: 'image_url', label: '分类图片', component: 'Input' },
        { name: 'parent_id', label: '父分类', component: 'Select', componentProps: { 
          options: categories.map(cat => ({ label: cat.name, value: cat.id })),
          placeholder: '请选择父分类（可选）'
        }},
        { name: 'sort_order', label: '排序权重', component: 'InputNumber', componentProps: { min: 0 } },
        { name: 'is_active', label: '是否启用', component: 'Switch', componentProps: { defaultChecked: true } }
      ]),
      initialValues: record,
      onOk: async (values) => {
        try {
          let res;
          if (values.id) {
            res = await API.product.productControllerUpdateCategory(values)
          } else {
            res = await API.product.productControllerCreateCategory(values)
          }

          if (res.code === 0) {
            await loadCategories()
            $message.success('操作成功')
          } else {
            $message.error(res.message)
          }
        } catch (error) {
          $message.error('操作失败')
        }
      }
    })
  }

  // 加载分类列表
  const loadCategories = useCallback(async () => {
    try {
      const response = await API.product.productControllerGetCategoryList({})
      const categoryList = response.data || []
      setCategories(categoryList)
      
      // 构建树形数据
      const buildTree = (items: any[], parentId: number | null = null): any[] => {
        return items
          .filter(item => item.parent_id === parentId)
          .map(item => {
            const children = buildTree(items, item.id);
            return {
              ...item,
              key: item.id,
              title: item.name,
              children: children.length > 0 ? children : undefined
            }
          })
      }
      
      setTreeData(buildTree(categoryList))
    } catch (error) {
      console.error('获取分类列表失败:', error)
      $message.error('获取分类列表失败')
    }
  }, [])

  // 处理操作
  const handleAction = useCallback(async (action: string, record: any) => {
    switch (action) {
      case 'edit':
        // 编辑分类
        openCategoryModal(record)
        break

      case 'delete':
        // 删除分类
        try {
          const res = await API.product.productControllerDeleteCategory(record.id)
          if (res.code === 0) {
            $message.success('分类删除成功')
            await loadCategories()
          } else {
            $message.error(res.message)
          }
        } catch (error) {
          $message.error('删除分类失败')
        }
        break

      default:
        console.warn('未知操作:', action, record)
    }
  }, [loadCategories])

  useEffect(() => {
    loadCategories()
  }, [loadCategories])

  return (
    <ProTable
      columns={columns}
      actions={actions}
      handleAction={handleAction}
      dataSource={treeData}
      pagination={{
        showSizeChanger: true,
        showQuickJumper: true,
        showTotal: (total) => `共 ${total} 条记录`
      }}
      rowKey="id"
      toolBar={<Button 
        type="primary" 
        icon={<PlusOutlined />}
        onClick={() => openCategoryModal()}
      >
        新增分类
      </Button>}
    />
  )
}
