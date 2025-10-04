import { useState, useCallback, useEffect } from 'react'
import { ProTable, defineColumns, defineActions } from '@/components/ProTable'
import { API } from '@/api'
// 使用全局属性
declare global {
  var $message: typeof import('antd').message
}
import { DeleteOutlined, UploadOutlined, DownloadOutlined, EyeOutlined } from '@ant-design/icons'
import { Button, Space, Image, Upload, Modal, Form, Input, Select, InputNumber, message } from 'antd'
import type { UploadFile } from 'antd'

// 媒体类型枚举
const MEDIA_TYPE = {
  IMAGE: { text: '图片', color: 'blue' },
  VIDEO: { text: '视频', color: 'green' }
} as const

// 媒体分类枚举
const MEDIA_CATEGORY = {
  MAIN: { text: '主图', color: 'red' },
  GALLERY: { text: '画廊', color: 'blue' },
  DETAIL: { text: '详情', color: 'green' }
} as const

// 媒体列表列定义
const columns = defineColumns([
  {
    title: '预览',
    dataIndex: 'url',
    searchDefaultValue: '',
    render: (url: string, record: any) => (
      <div className="w-16 h-16">
        {record.type === 'IMAGE' ? (
          <Image
            src={url}
            alt={record.alt_text || '媒体文件'}
            className="w-full h-full object-cover rounded"
            preview={{
              mask: <EyeOutlined />
            }}
          />
        ) : (
          <video
            src={url}
            className="w-full h-full object-cover rounded"
            controls
          />
        )}
      </div>
    )
  },
  {
    title: '文件名',
    dataIndex: 'filename',
    searchDefaultValue: '',
    render: (filename: string) => (
      <div className="max-w-32 truncate" title={filename}>
        {filename}
      </div>
    )
  },
  {
    title: '类型',
    dataIndex: 'type',
    searchDefaultValue: '',
    render: (type: keyof typeof MEDIA_TYPE) => (
      <span className={`px-2 py-1 rounded text-xs ${MEDIA_TYPE[type]?.color === 'blue' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'}`}>
        {MEDIA_TYPE[type]?.text}
      </span>
    )
  },
  {
    title: '分类',
    dataIndex: 'media_category',
    searchDefaultValue: '',
    render: (category: keyof typeof MEDIA_CATEGORY) => (
      <span className={`px-2 py-1 rounded text-xs ${
        category === 'MAIN' ? 'bg-red-100 text-red-600' :
        category === 'GALLERY' ? 'bg-blue-100 text-blue-600' :
        'bg-green-100 text-green-600'
      }`}>
        {MEDIA_CATEGORY[category]?.text}
      </span>
    )
  },
  {
    title: '文件大小',
    dataIndex: 'file_size',
    searchDefaultValue: '',
    render: (size: number) => {
      if (!size) return '-'
      const units = ['B', 'KB', 'MB', 'GB']
      let unitIndex = 0
      let fileSize = size
      
      while (fileSize >= 1024 && unitIndex < units.length - 1) {
        fileSize /= 1024
        unitIndex++
      }
      
      return `${fileSize.toFixed(1)} ${units[unitIndex]}`
    }
  },
  {
    title: '排序权重',
    dataIndex: 'sort_order',
    searchDefaultValue: '',
    render: (order: number) => order || 0
  },
  {
    title: '替代文本',
    dataIndex: 'alt_text',
    searchDefaultValue: '',
    render: (text: string) => text || '-'
  },
  {
    title: '上传时间',
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
    icon: <UploadOutlined />,
    text: '编辑'
  },
  {
    name: 'download',
    icon: <DownloadOutlined />,
    text: '下载'
  },
  {
    name: 'delete',
    icon: <DeleteOutlined />,
    text: '删除'
  }
])

interface MediaManagementProps {
  productId?: number
  productName?: string
}

export default function MediaManagement({ productId, productName }: MediaManagementProps) {
  const [uploading, setUploading] = useState(false)
  const [editModalVisible, setEditModalVisible] = useState(false)
  const [editingMedia, setEditingMedia] = useState<any>(null)
  const [form] = Form.useForm()

  // 获取媒体列表
  const fetchMedia = useCallback(async (params: any) => {
    if (!productId) {
      return { records: [], total: 0, page: 1, page_size: 10 }
    }
    
    try {
      const response = await API.product.productControllerGetProductMedia(productId)
      return {
        records: response.data || [],
        total: response.data?.length || 0,
        page: 1,
        page_size: 10
      }
    } catch (error) {
      throw new Error('获取媒体列表失败')
    }
  }, [productId])

  // 处理操作
  const handleAction = useCallback(async (action: string, record: any) => {
    switch (action) {
      case 'view':
        // 查看媒体文件
        if (record.type === 'IMAGE') {
          Modal.info({
            title: '图片预览',
            content: (
              <Image
                src={record.url}
                alt={record.alt_text || '媒体文件'}
                className="w-full"
              />
            ),
            width: '80%'
          })
        } else {
          Modal.info({
            title: '视频预览',
            content: (
              <video
                src={record.url}
                className="w-full"
                controls
                autoPlay
              />
            ),
            width: '80%'
          })
        }
        break

      case 'edit':
        // 编辑媒体信息
        setEditingMedia(record)
        form.setFieldsValue({
          media_category: record.media_category,
          sort_order: record.sort_order,
          alt_text: record.alt_text
        })
        setEditModalVisible(true)
        break

      case 'download':
        // 下载媒体文件
        const link = document.createElement('a')
        link.href = record.url
        link.download = record.filename
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        break

      case 'delete':
        // 删除媒体文件
        try {
          await API.product.productControllerDeleteProductMedia({ id: record.id })
          $message.success('媒体文件删除成功')
          // 刷新列表
          window.location.reload()
        } catch (error) {
          $message.error('删除媒体文件失败')
        }
        break

      default:
        console.warn('未知操作:', action, record)
    }
  }, [form])

  // 处理文件上传
  const handleUpload = useCallback(async (file: UploadFile) => {
    if (!productId) {
      $message.error('请先选择产品')
      return false
    }

    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file as any)
      formData.append('product_id', productId.toString())
      formData.append('type', file.type?.startsWith('video/') ? 'VIDEO' : 'IMAGE')
      formData.append('media_category', 'GALLERY')
      formData.append('sort_order', '0')

      await API.product.productControllerUploadProductMedia(formData as any)
      $message.success('文件上传成功')
      // 刷新列表
      window.location.reload()
      return true
    } catch (error) {
      $message.error('文件上传失败')
      return false
    } finally {
      setUploading(false)
    }
  }, [productId])

  // 处理批量上传
  const handleBatchUpload = useCallback(async (fileList: UploadFile[]) => {
    if (!productId) {
      $message.error('请先选择产品')
      return
    }

    setUploading(true)
    try {
      const formData = new FormData()
      fileList.forEach(file => {
        formData.append('files', file as any)
      })
      formData.append('type', 'IMAGE')

      await API.product.productControllerBatchUploadProductMedia(productId, formData as any)
      $message.success('批量上传成功')
      // 刷新列表
      window.location.reload()
    } catch (error) {
      $message.error('批量上传失败')
    } finally {
      setUploading(false)
    }
  }, [productId])

  // 保存媒体信息编辑
  const handleSaveEdit = useCallback(async () => {
    try {
      const values = await form.validateFields()
      await API.product.productControllerUpdateProductMedia({
        id: editingMedia.id,
        ...values
      })
      $message.success('媒体信息更新成功')
      setEditModalVisible(false)
      setEditingMedia(null)
      // 刷新列表
      window.location.reload()
    } catch (error) {
      $message.error('更新媒体信息失败')
    }
  }, [form, editingMedia])

  if (!productId) {
    return (
      <div className="p-4 text-center text-gray-500">
        请先选择产品以管理媒体文件
      </div>
    )
  }

  return (
    <div className="p-4">
      <div className="mb-4 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">媒体管理</h1>
          {productName && (
            <p className="text-gray-600">产品: {productName}</p>
          )}
        </div>
        <Space>
          <Upload
            beforeUpload={handleUpload}
            showUploadList={false}
            accept="image/*,video/*"
          >
            <Button 
              type="primary" 
              icon={<UploadOutlined />}
              loading={uploading}
            >
              上传文件
            </Button>
          </Upload>
          <Upload
            beforeUpload={() => false}
            onChange={({ fileList }) => handleBatchUpload(fileList)}
            multiple
            accept="image/*"
            showUploadList={false}
          >
            <Button 
              icon={<UploadOutlined />}
              loading={uploading}
            >
              批量上传
            </Button>
          </Upload>
        </Space>
      </div>

      <ProTable
        columns={columns}
        actions={actions}
        handleAction={handleAction}
        request={fetchMedia}
        pagination={{
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total) => `共 ${total} 条记录`
        }}
      />

      {/* 编辑媒体信息弹窗 */}
      <Modal
        title="编辑媒体信息"
        open={editModalVisible}
        onOk={handleSaveEdit}
        onCancel={() => {
          setEditModalVisible(false)
          setEditingMedia(null)
        }}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="media_category"
            label="媒体分类"
            rules={[{ required: true, message: '请选择媒体分类' }]}
          >
            <Select>
              <Select.Option value="MAIN">主图</Select.Option>
              <Select.Option value="GALLERY">画廊</Select.Option>
              <Select.Option value="DETAIL">详情</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="sort_order"
            label="排序权重"
          >
            <InputNumber min={0} className="w-full" />
          </Form.Item>
          <Form.Item
            name="alt_text"
            label="替代文本"
          >
            <Input placeholder="请输入替代文本" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}
