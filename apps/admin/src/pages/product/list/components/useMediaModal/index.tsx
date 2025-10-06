import { useFullModal } from '@/hooks/useFullModal';
import { ProTableRef } from '@/components/ProTable';
import { useCallback, useRef } from 'react';
import { ProTable, defineColumns, defineActions } from '@/components/ProTable';
import { EditOutlined, DeleteOutlined, PlusOutlined, EyeOutlined, DownloadOutlined } from '@ant-design/icons';
import { useFormModal } from '@/hooks/useFormModal';
import { Button, Space, Image, Upload, Modal, message } from 'antd';
import { API } from '@/api';
import type { UploadFile } from 'antd';
import { Video } from '@/components/Video';

// 媒体类型枚举
const MEDIA_TYPE = {
  IMAGE: { text: '图片', color: 'blue' },
  VIDEO: { text: '视频', color: 'green' }
} as const;

// 媒体分类枚举
const MEDIA_CATEGORY = {
  MAIN: { text: '主图', color: 'red' },
  GALLERY: { text: '画廊', color: 'blue' },
  DETAIL: { text: '详情', color: 'green' }
} as const;

// 媒体列表列定义
const mediaColumns = defineColumns([
  {
    title: '预览',
    dataIndex: 'url',
    searchDefaultValue: '',
    render: (url: string, record: any) => (
      <div className="w-16 h-16">
        {record.type === 'IMAGE' ? (
          <Image
            src={'http://127.0.0.1:3000' + url}
            alt={record.alt_text || '媒体文件'}
            className="w-full h-full object-cover rounded"
            preview={{
              mask: <EyeOutlined />
            }}
          />
        ) : (
          <Video src={'http://127.0.0.1:3000' + url} className="w-full h-full object-cover rounded" />
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
      if (!size) return '-';
      const units = ['B', 'KB', 'MB', 'GB'];
      let unitIndex = 0;
      let fileSize = size;
      
      while (fileSize >= 1024 && unitIndex < units.length - 1) {
        fileSize /= 1024;
        unitIndex++;
      }
      
      return `${fileSize.toFixed(1)} ${units[unitIndex]}`;
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
  }
]);

// 操作按钮定义
const mediaActions = defineActions([
  {
    name: 'edit',
    icon: <EditOutlined />,
  },
  {
    name: 'download',
    icon: <DownloadOutlined />,
  },
  {
    name: 'delete',
    icon: <DeleteOutlined />,
    danger: true,
  }
]);

export const useMediaModal = () => {
  const showFormModal = useFormModal();
  
  // 打开媒体编辑弹窗
  const openMediaEditModal = useCallback((record: any, callback: () => void) => {
    showFormModal({
      title: '编辑媒体信息',
      schemas: [
        { name: 'id', hide: true },
        { name: 'media_category', label: '媒体分类', component: 'Select', required: true, componentProps: { 
          options: [
            { label: '主图', value: 'MAIN' },
            { label: '画廊', value: 'GALLERY' },
            { label: '详情', value: 'DETAIL' }
          ]
        }},
        { name: 'sort_order', label: '排序权重', component: 'InputNumber', componentProps: { min: 0, defaultValue: 0 } },
        { name: 'alt_text', label: '替代文本', component: 'Input' }
      ],
      initialValues: record,
      width: 500,
      onOk: async (values) => {
        try {
          const res = await API.product.productControllerUpdateProductMedia(values);
          if (res.code === 0) {
            $message.success('更新成功');
            callback();
          } else {
            $message.error(res.message);
          }
        } catch (error) {
          $message.error('更新失败');
        }
      }
    });
  }, [showFormModal]);

  return { openMediaEditModal };
};

interface MediaModalProps {
  productId: number;
  productName: string;
  callback: () => void;
}

const MediaModal = ({ productId, productName, callback }: MediaModalProps) => {
  const mediaTableRef = useRef<ProTableRef>(null);
  const { openMediaEditModal } = useMediaModal();

  // 处理媒体操作
  const handleMediaAction = useCallback(async (action: string, record: any) => {
    switch (action) {
      case 'edit':
        // 编辑媒体信息
        openMediaEditModal(record, () => {
          mediaTableRef.current?.refresh();
        });
        break;

      case 'download':
        // 下载媒体文件
        const link = document.createElement('a');
        link.href = 'http://127.0.0.1:3000' + record.url;
        link.download = record.filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        break;

      case 'delete':
        // 删除媒体文件
        try {
          const res = await API.product.productControllerDeleteProductMedia({ id: record.id });
          if (res.code === 0) {
            $message.success('删除成功');
            mediaTableRef.current?.refresh();
          } else {
            $message.error(res.message);
          }
        } catch (error) {
          $message.error('删除失败');
        }
        break;

      default:
        console.warn('未知操作:', action, record);
    }
  }, [openMediaEditModal]);

  // 处理文件上传
  const handleUpload = useCallback(async (file: UploadFile) => {
    try {
      const formData = new FormData();
      formData.append('file', file as any);
      formData.append('product_id', productId.toString());
      formData.append('type', file.type?.startsWith('video/') ? 'VIDEO' : 'IMAGE');
      formData.append('media_category', 'GALLERY');
      formData.append('sort_order', '0');

      const res = await API.product.productControllerUploadProductMedia(formData as any);
      if (res.code === 0) {
        $message.success('上传成功');
        mediaTableRef.current?.refresh();
        return true;
      } else {
        $message.error(res.message);
        return false;
      }
    } catch (error) {
      $message.error('上传失败');
      return false;
    }
  }, [productId]);

  // 处理批量上传
  const handleBatchUpload = useCallback(async (fileList: UploadFile[]) => {
    try {
      const formData = new FormData();
      fileList.forEach(file => {
        formData.append('files', file as any);
      });
      formData.append('type', 'IMAGE');

      const res = await API.product.productControllerBatchUploadProductMedia(productId, formData as any);
      if (res.code === 0) {
        $message.success('批量上传成功');
        mediaTableRef.current?.refresh();
      } else {
        $message.error(res.message);
      }
    } catch (error) {
      $message.error('批量上传失败');
    }
  }, [productId]);

  return (
    <ProTable
      columns={mediaColumns}
      actions={mediaActions}
      handleAction={handleMediaAction}
      request={(params) => API.product.productControllerGetProductMedia(productId)}
      pagination={false}
      ref={mediaTableRef}
      toolBar={
        <Space>
          <Upload
            beforeUpload={handleUpload}
            showUploadList={false}
            accept="image/*,video/*"
          >
            <Button 
              type="primary" 
              icon={<PlusOutlined />}
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
              icon={<PlusOutlined />}
            >
              批量上传
            </Button>
          </Upload>
        </Space>
      }
    />
  );
};

export const useMediaManager = () => {
  const showFullModal = useFullModal();
  
  return function (productId: number, productName: string, callback: () => void) {
    showFullModal({
      title: `媒体管理 - ${productName}`,
      content: ({ destroy }) => <MediaModal productId={productId} productName={productName} callback={callback} />
    });
  };
};
