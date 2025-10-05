import { ProTableRef } from '@/components/ProTable';
import { useCallback, useRef } from 'react';
import { ProTable, defineColumns, defineActions } from '@/components/ProTable';
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { useFormModal } from '@/hooks/useFormModal';
import { useFullModal } from '@/hooks/useFullModal';
import { Button } from 'antd';
import { API } from '@/api';

// 属性列表列定义
const attributeColumns = defineColumns([
  {
    title: '属性名称',
    dataIndex: 'name',
    searchDefaultValue: '',
  },
  {
    title: '属性值',
    dataIndex: 'value',
    searchDefaultValue: '',
  },
  {
    title: '排序权重',
    dataIndex: 'sort_order',
    searchDefaultValue: '',
    render: (sort_order: number) => sort_order || 0
  }
]);

// 操作按钮定义
const attributeActions = defineActions([
  {
    name: 'edit',
    icon: <EditOutlined />,
  },
  {
    name: 'delete',
    icon: <DeleteOutlined />,
    danger: true,
  }
]);

export const useProductAttributeModal = () => {
  const showFormModal = useFormModal();
  // 打开属性管理弹窗
  const openAttributeModal = useCallback((record: any, callback: () => void) => {
    showFormModal({
      title: `编辑产品规格`,
      schemas: [
        { name: 'id', hide: true },
        { name: 'product_id', hide: true },
        { name: 'name', label: '属性名称', component: 'Input', required: true },
        { name: 'value', label: '属性值', component: 'Input', required: true },
        { name: 'sort_order', label: '排序权重', component: 'InputNumber', componentProps: { min: 0, defaultValue: 0 } }
      ],
      initialValues: record,
      width: 500,
      onOk: async (values) => {
        let res;
        // 新增属性
        if (!values.id) {
          res = await API.product.productControllerCreateProductAttribute(values);
        } else {
          delete values.product_id;
          res = await API.product.productControllerUpdateProductAttribute(values);
        }

        if (res.code === 0) {
          $message.success('操作成功');
          callback();
        } else {
          $message.error(res.message);
        }
      }
    });
  }, [showFormModal]);
  return { openAttributeModal };
};

interface ProductAttributeModalProps {
  productId: number;
  productName: string;
  callback: () => void;
}

const ProductAttributeModal = ({ productId, productName, callback }: ProductAttributeModalProps) => {
  const attributeTableRef = useRef<ProTableRef>(null);
  const { openAttributeModal } = useProductAttributeModal();

  // 处理属性操作
  const handleAttributeAction = useCallback(async (action: string, record: any) => {
    switch (action) {
      case 'edit':
        // 编辑属性
        openAttributeModal(record, () => {
          attributeTableRef?.current?.refresh();
        });
        break;
      case 'delete':
        // 删除属性
        try {
          const response = await API.product.productControllerDeleteProductAttribute(record.id);
          if (response.code === 0) {
            $message.success('删除成功');
            attributeTableRef?.current?.refresh();
          } else {
            $message.error(response.message);
          }
        } catch (error) {
          $message.error('删除失败');
        }
        break;
      default:
        console.warn('未知操作:', action, record);
    }
  }, [attributeTableRef, openAttributeModal, productId, productName]);

  // 新增属性
  const handleAddAttribute = useCallback(() => {
    openAttributeModal({ product_id: productId }, () => {
      attributeTableRef.current?.refresh();
    });
  }, [openAttributeModal, productId, productName, attributeTableRef]);

  return (
    <ProTable
      columns={attributeColumns}
      actions={attributeActions}
      handleAction={handleAttributeAction}
      request={async (params) => {
        const res = await API.product.productControllerGetProductAttributes({ 
          ...params,
          product_id: productId 
        });
        return {
          code: 0,
          message: 'success',
          data: {
            records: res.data,
            total: 0,
            page: 1,
            page_size: 20
          }
        }
      }}
      pagination={false}
      ref={attributeTableRef}
      searchRight={<Button 
        type="primary" 
        icon={<PlusOutlined />}
        onClick={handleAddAttribute}
      >
        新增规格
      </Button>}
    />
  );
};

export const useProductAttributeManager = () => {
  const showFullModal = useFullModal();
  return function (productId: number, productName: string, callback: () => void) {
    showFullModal({
      content: ({ destroy }) => <ProductAttributeModal productId={productId} productName={productName} callback={callback} />
    })
  } 
}