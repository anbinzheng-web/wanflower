import { useCallback, useRef } from 'react'
import { ProTable, defineColumns, defineActions, ProTableRef } from '@/components/ProTable'
import { API } from '@/api'
import { EditOutlined, DeleteOutlined, PlusOutlined, EyeOutlined, UploadOutlined, SettingOutlined } from '@ant-design/icons'
import { Button, Tag, Image } from 'antd'
import { useProductModal } from './components/ProductModal'
import { useProductAttributeModal, useProductAttributeManager } from './components/ProductAttributeModal'
import { ProductListDtoStatusEnum } from 'backend-api';

// 产品状态枚举
const PRODUCT_STATUS = {
  [ProductListDtoStatusEnum.ACTIVE]: { text: '上架', color: 'green' },
  [ProductListDtoStatusEnum.INACTIVE]: { text: '下架', color: 'red' },
  [ProductListDtoStatusEnum.DRAFT]: { text: '草稿', color: 'orange' }
} as const

// 操作按钮定义
const actions = defineActions([
  {
    name: 'view',
    icon: <EyeOutlined />,
  },
  {
    name: 'edit',
    icon: <EditOutlined />,
  },
  {
    name: 'attributes',
    icon: <SettingOutlined />,
    text: '管理规格',
    collapsed: true,
  },
  {
    name: 'add_attributes',
    icon: <PlusOutlined />, 
    text: '添加规格',
    collapsed: true,
  },
  {
    type: 'divider',
    collapsed: true,
  },
  {
    name: 'media',
    icon: <UploadOutlined />,
    text: '媒体',
    collapsed: true,
  },
  {
    name: 'delete',
    icon: <DeleteOutlined />,
    text: '删除',
    collapsed: true,
    danger: true,
  }
])

export default function ProductList() {
  const tableRef = useRef<ProTableRef>(null)
  const { openProductModal } = useProductModal(tableRef)
  const { openAttributeModal } = useProductAttributeModal()
  const openAttributeManager = useProductAttributeManager()

  // 产品列表列定义
  const columns = defineColumns([
    {
      title: '产品名称',
      dataIndex: 'name',
      searchDefaultValue: '',
      render: (text: string, record: any) => (
        <div className="flex items-center space-x-2">
          {record.media?.[0]?.url && (
            <Image
              src={record.media[0].url}
              alt={text}
              width={40}
              height={40}
              className="rounded object-cover"
            />
          )}
          <div>
            <div className="font-medium">{text}</div>
            {record.sku && <div className="text-xs text-gray-500">SKU: {record.sku}</div>}
          </div>
        </div>
      )
    },
    {
      title: '价格',
      dataIndex: 'price',
      searchDefaultValue: '',
      render: (price: number, record: any) => (
        <div>
          <div className="font-medium text-red-500">¥{price}</div>
          {record.original_price && record.original_price > price && (
            <div className="text-xs text-gray-400 line-through">¥{record.original_price}</div>
          )}
        </div>
      )
    },
    {
      title: '库存',
      dataIndex: 'stock',
      searchDefaultValue: '',
      render: (stock: number, record: any) => (
        <div>
          <div className={stock <= (record.min_stock || 0) ? 'text-red-500' : ''}>
            {stock}
          </div>
          {record.min_stock && (
            <div className="text-xs text-gray-400">预警: {record.min_stock}</div>
          )}
        </div>
      )
    },
    {
      title: '分类',
      dataIndex: 'category',
      searchDefaultValue: '',
      render: (category: any) => category?.name || '-'
    },
    {
      title: '规格',
      dataIndex: 'attributes',
      searchDefaultValue: '',
      render: (attributes: any[]) => {
        if (!attributes || attributes.length === 0) return '-';
        return (
          <div className="space-y-1">
            {attributes.slice(0, 2).map((attr, index) => (
              <div key={index} className="text-xs">
                <span className="text-gray-500">{attr.name}:</span>
                <span className="ml-1">{attr.value}</span>
              </div>
            ))}
            {attributes.length > 2 && (
              <div className="text-xs text-gray-400">+{attributes.length - 2} 更多</div>
            )}
          </div>
        );
      }
    },
    {
      title: '状态',
      dataIndex: 'status',
      searchType: 'Select',
      searchProps: {
        options: Object.keys(PRODUCT_STATUS).map(status => ({ label: PRODUCT_STATUS[status].text, value: status })),
      },
      render: (status: keyof typeof PRODUCT_STATUS) => (
        <Tag color={PRODUCT_STATUS[status]?.color}>
          {PRODUCT_STATUS[status]?.text}
        </Tag>
      )
    },
    {
      title: '销量',
      dataIndex: 'sales_count',
      searchDefaultValue: '',
      render: (count: number) => count || 0
    },
    {
      title: '浏览量',
      dataIndex: 'view_count',
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

  // 处理操作
  const handleAction = useCallback(async (action: string, record: any) => {
    switch (action) {
      case 'view':
        // 查看产品详情
        try {
          const response = await API.product.productControllerGetProductDetail(record.id)
          console.log('产品详情:', response.data)
          // 这里可以打开详情弹窗或跳转到详情页
        } catch (error) {
          $message.error('获取产品详情失败')
        }
        break
      case 'edit':
        // 编辑产品
        openProductModal(record)
        break
      case 'attributes':
        // 管理产品规格
        openAttributeManager(record.id, record.name, () => {
          tableRef.current?.refresh()
        })
        break
      case 'add_attributes':
        // 管理产品规格
        openAttributeModal({ product_id: record.id }, () => {
          tableRef.current?.refresh()
        })
        break
      case 'media':
        // 管理媒体文件
        // setSelectedProduct(record)
        // setMediaModalVisible(true)
        break
      case 'delete':
        // 删除产品
        try {
          const res = await API.product.productControllerDeleteProduct(record.id)
          if (res.code === 0) {
            tableRef.current?.refresh()
          } else {
            $message.error(res.message)
          }
        } catch (error) {
          $message.error('删除产品失败')
        }
        break
      default:
        console.warn('未知操作:', action, record)
    }
  }, [])

  return (
    <ProTable
      columns={columns}
      actions={actions}
      handleAction={handleAction}
      request={API.product.productControllerGetProductList}
      pagination={{
        showSizeChanger: true,
        showQuickJumper: true,
        showTotal: (total) => `共 ${total} 条记录`
      }}
      searchRight={<Button 
        type="primary" 
        icon={<PlusOutlined />}
        onClick={() => openProductModal()}
      >
        新增产品
      </Button>}
      ref={tableRef}
    />
  )
}
