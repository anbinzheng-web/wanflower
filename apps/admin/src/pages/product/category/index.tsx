import { useState, useCallback, useEffect } from 'react'
import { ProTable, defineColumns, defineActions } from '@/components/ProTable'
import { useFormModal } from '@/hooks/useFormModal'
import { API } from '@/api'
// 使用全局属性
declare global {
  var $message: typeof import('antd').message
}
import { EditOutlined, DeleteOutlined, PlusOutlined, EyeOutlined } from '@ant-design/icons'
import { Button, Tag, Space, Image, Popconfirm, Tree } from 'antd'

// 分类列表列定义
const columns = defineColumns([
  {
    title: '分类名称',
    dataIndex: 'name',
    searchDefaultValue: '',
    render: (text: string, record: any) => (
      <div className="flex items-center space-x-2">
        {record.image_url && (
          <Image
            src={record.image_url}
            alt={text}
            width={32}
            height={32}
            className="rounded object-cover"
          />
        )}
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
    searchDefaultValue: '',
    render: (text: string) => text || '-'
  },
  {
    title: '状态',
    dataIndex: 'is_active',
    searchDefaultValue: '',
    render: (isActive: boolean) => (
      <Tag color={isActive ? 'green' : 'red'}>
        {isActive ? '启用' : '禁用'}
      </Tag>
    )
  },
  {
    title: '排序权重',
    dataIndex: 'sort_order',
    searchDefaultValue: '',
    render: (order: number) => order || 0
  },
  {
    title: '产品数量',
    dataIndex: 'product_count',
    searchDefaultValue: '',
    render: (count: number) => count || 0
  },
  {
    title: '创建时间',
    dataIndex: 'created_at',
    searchDefaultValue: '',
    render: (date: string) => new Date(date).toLocaleString()
  }
])

// 操作按钮定义
const actions = defineActions([
  {
    name: 'view',
    icon: <EyeOutlined />,
    text: '查看'
  },
  {
    name: 'edit',
    icon: <EditOutlined />,
    text: '编辑'
  },
  {
    name: 'delete',
    icon: <DeleteOutlined />,
    text: '删除'
  }
])

export default function CategoryManagement() {
  const [categories, setCategories] = useState<any[]>([])
  const [treeData, setTreeData] = useState<any[]>([])

  // 分类表单配置
  const categorySchemas = [
    { fieldId: 'name', label: '分类名称', component: 'Input' as const, required: true },
    { fieldId: 'slug', label: 'URL标识', component: 'Input' as const, required: true },
    { fieldId: 'description', label: '分类描述', component: 'Input' as const, componentProps: { rows: 4 } },
    { fieldId: 'image_url', label: '分类图片', component: 'Input' as const },
    { fieldId: 'parent_id', label: '父分类', component: 'Select' as const, componentProps: { 
      options: categories.map(cat => ({ label: cat.name, value: cat.id })),
      placeholder: '请选择父分类（可选）'
    }},
    { fieldId: 'sort_order', label: '排序权重', component: 'InputNumber' as const, componentProps: { min: 0 } },
    { fieldId: 'is_active', label: '是否启用', component: 'Switch' as const, componentProps: { defaultChecked: true } }
  ]

  // 分类表单弹窗
  const showCategoryModal = useFormModal()

  // 打开分类表单
  const openCategoryModal = (record?: any) => {
    showCategoryModal({
      title: record ? '编辑分类' : '新增分类',
      schemas: categorySchemas,
      initialValues: record,
      onOk: async (values) => {
        try {
          if (values.id) {
            await API.product.productControllerUpdateCategory(values)
            $message.success('分类更新成功')
          } else {
            await API.product.productControllerCreateCategory(values)
            $message.success('分类创建成功')
          }
          await loadCategories()
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
      const categoryList = response.data.records || []
      setCategories(categoryList)
      
      // 构建树形数据
      const buildTree = (items: any[], parentId: number | null = null): any[] => {
        return items
          .filter(item => item.parent_id === parentId)
          .map(item => ({
            ...item,
            key: item.id,
            title: item.name,
            children: buildTree(items, item.id)
          }))
      }
      
      setTreeData(buildTree(categoryList))
    } catch (error) {
      console.error('获取分类列表失败:', error)
      $message.error('获取分类列表失败')
    }
  }, [])

  // 获取分类列表
  const fetchCategories = useCallback(async (params: any) => {
    try {
      const response = await API.product.productControllerGetCategoryList(params)
      return response.data
    } catch (error) {
      throw new Error('获取分类列表失败')
    }
  }, [])

  // 处理操作
  const handleAction = useCallback(async (action: string, record: any) => {
    switch (action) {
      case 'view':
        // 查看分类详情
        console.log('分类详情:', record)
        break

      case 'edit':
        // 编辑分类
        openCategoryModal(record)
        break

      case 'delete':
        // 删除分类
        try {
          await API.product.productControllerDeleteCategory(record.id)
          $message.success('分类删除成功')
          await loadCategories()
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
    <div className="p-4">
      <div className="mb-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">产品分类管理</h1>
        <Button 
          type="primary" 
          icon={<PlusOutlined />}
          onClick={() => openCategoryModal()}
        >
          新增分类
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* 分类树形结构 */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-medium mb-4">分类结构</h3>
          <Tree
            treeData={treeData}
            showLine
            defaultExpandAll
            onSelect={(selectedKeys, info) => {
              console.log('选中分类:', selectedKeys, info)
            }}
          />
        </div>

        {/* 分类列表 */}
        <div className="lg:col-span-2">
          <ProTable
            columns={columns}
            actions={actions}
            handleAction={handleAction}
            request={fetchCategories}
            pagination={{
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total) => `共 ${total} 条记录`
            }}
          />
        </div>
      </div>
    </div>
  )
}
