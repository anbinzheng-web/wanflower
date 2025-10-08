import { useState, useRef, useCallback } from 'react';
import { ProTable, defineColumns, defineActions, ProTableRef } from '@/components/ProTable';
import { Button, Image, Upload, Tag } from 'antd';
import { EditOutlined, DeleteOutlined, EyeOutlined, DownloadOutlined, UploadOutlined } from '@ant-design/icons';
import { API } from '@/api';
import type { UploadFile } from 'antd';
import { Video } from '@/components/Video';
import { useFormModal } from '@/hooks/useFormModal';

// 业务类型枚举
const BUSINESS_TYPE = {
  PRODUCT: { text: '产品', color: 'blue' },
  BLOG: { text: '博客', color: 'green' },
  REVIEW: { text: '评论', color: 'orange' },
  USER: { text: '用户', color: 'purple' },
  GENERAL: { text: '通用', color: 'gray' }
} as const;

// 媒体类型枚举
const MEDIA_TYPE = {
  IMAGE: { text: '图片', color: 'blue' },
  VIDEO: { text: '视频', color: 'green' }
} as const;

// 存储类型枚举
const STORAGE_TYPE = {
  LOCAL: { text: '本地', color: 'blue' },
  OSS: { text: 'OSS', color: 'green' },
  CDN: { text: 'CDN', color: 'purple' }
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
            src={url.startsWith('http') ? url : 'http://127.0.0.1:3000' + url}
            alt={record.alt_text || '媒体文件'}
            className="w-full h-full object-cover rounded"
            preview={{
              mask: <EyeOutlined />
            }}
          />
        ) : (
          <Video src={url.startsWith('http') ? url : 'http://127.0.0.1:3000' + url} className="w-full h-full object-cover rounded" />
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
    title: '业务类型',
    dataIndex: 'business_type',
    searchType: 'Select',
    searchProps: {
      options: Object.entries(BUSINESS_TYPE).map(([key, value]) => ({
        label: value.text,
        value: key
      }))
    },
    render: (type: keyof typeof BUSINESS_TYPE) => (
      <Tag color={BUSINESS_TYPE[type]?.color}>
        {BUSINESS_TYPE[type]?.text}
      </Tag>
    )
  },
  {
    title: '业务ID',
    dataIndex: 'business_id',
    searchDefaultValue: '',
    render: (id: number) => id || '-'
  },
  {
    title: '媒体类型',
    dataIndex: 'type',
    searchType: 'Select',
    searchProps: {
      options: Object.entries(MEDIA_TYPE).map(([key, value]) => ({
        label: value.text,
        value: key
      }))
    },
    render: (type: keyof typeof MEDIA_TYPE) => (
      <Tag color={MEDIA_TYPE[type]?.color}>
        {MEDIA_TYPE[type]?.text}
      </Tag>
    )
  },
  {
    title: '存储类型',
    dataIndex: 'storage_type',
    searchType: 'Select',
    searchProps: {
      options: Object.entries(STORAGE_TYPE).map(([key, value]) => ({
        label: value.text,
        value: key
      }))
    },
    render: (type: keyof typeof STORAGE_TYPE) => (
      <Tag color={STORAGE_TYPE[type]?.color}>
        {STORAGE_TYPE[type]?.text}
      </Tag>
    )
  },
  {
    title: '分类',
    dataIndex: 'category',
    searchDefaultValue: '',
    render: (category: string) => (
      <Tag color="blue">{category}</Tag>
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
    title: '尺寸',
    dataIndex: 'width',
    searchDefaultValue: '',
    render: (width: number, record: any) => {
      if (!width || !record.height) return '-';
      return `${width} × ${record.height}`;
    }
  },
  {
    title: '上传时间',
    dataIndex: 'created_at',
    searchType: 'DateRange',
    render: (date: string) => new Date(date).toLocaleString()
  }
]);

// 操作按钮定义
const mediaActions = defineActions([
  {
    name: 'edit',
    icon: <EditOutlined />,
    text: '编辑',
    collapsed: true
  },
  {
    name: 'download',
    icon: <DownloadOutlined />,
    text: '下载',
    collapsed: true
  },
  {
    name: 'delete',
    icon: <DeleteOutlined />,
    text: '删除',
    danger: true,
    collapsed: true
  }
]);

export default function MediaManagement() {
  const tableRef = useRef<ProTableRef>(null);
  const showFormModal = useFormModal();
  const [uploading, setUploading] = useState(false);

  // 处理媒体操作
  const handleMediaAction = useCallback(async (action: string, record: any) => {
    switch (action) {
      case 'edit':
        // 编辑媒体信息
        showFormModal({
          title: '编辑媒体信息',
          schemas: [
            { name: 'id', hide: true },
            { name: 'alt_text', label: '替代文本', component: 'Input' },
            { name: 'sort_order', label: '排序权重', component: 'InputNumber', componentProps: { min: 0, defaultValue: 0 } },
            { name: 'category', label: '分类', component: 'Input' }
          ],
          initialValues: record,
          width: 500,
          onOk: async (values) => {
            try {
              const res = await API.media.mediaControllerUpdateMedia(values);
              if (res.code === 0) {
                $message.success('更新成功');
                tableRef.current?.refresh();
              } else {
                $message.error(res.message);
              }
            } catch (error) {
              $message.error('更新失败');
            }
          }
        });
        break;

      case 'download':
        // 下载媒体文件
        const link = document.createElement('a');
        link.href = record.url.startsWith('http') ? record.url : 'http://127.0.0.1:3000' + record.url;
        link.download = record.filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        break;

      case 'delete':
        // 删除媒体文件
        try {
          const res = await API.media.mediaControllerDeleteMedia({ id: record.id });
          if (res.code === 0) {
            $message.success('删除成功');
            tableRef.current?.refresh();
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
  }, [showFormModal]);

  // 处理文件上传
  const handleUpload = useCallback(async (file: UploadFile) => {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file as any);
      formData.append('business_type', 'GENERAL');
      formData.append('type', file.type?.startsWith('video/') ? 'VIDEO' : 'IMAGE');
      formData.append('category', 'GENERAL');
      formData.append('sort_order', '0');

      const res = await API.media.mediaControllerUploadMedia(formData as any);
      if (res.code === 0) {
        $message.success('上传成功');
        tableRef.current?.refresh();
        return true;
      } else {
        $message.error(res.message);
        return false;
      }
    } catch (error) {
      console.error('上传错误:', error);
      $message.error('上传失败');
      return false;
    } finally {
      setUploading(false);
    }
  }, []);

  return (
    <ProTable
      columns={mediaColumns}
      actions={mediaActions}
      handleAction={handleMediaAction}
      request={API.media.mediaControllerGetMediaList}
      ref={tableRef}
      toolBar={<Upload
        beforeUpload={handleUpload}
        showUploadList={false}
        accept="image/*,video/*"
        disabled={uploading}
        multiple
      >
        <Button 
          type="primary" 
          icon={<UploadOutlined />}
          loading={uploading}
        >
          上传文件
        </Button>
      </Upload>}
    />
  );
}
