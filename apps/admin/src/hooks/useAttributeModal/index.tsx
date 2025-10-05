import { useModal } from '@/hooks/useModal';
import { ProForm } from '@/components/ProForm';
import { defineSchemas } from '@/components/ProForm';
import { API } from '@/api';
import { useState } from 'react';

interface AttributeModalProps {
  productId: number;
  productName: string;
  onSuccess?: () => void;
  editData?: any;
}

export const useAttributeModal = () => {
  const showModal = useModal();

  // 属性表单配置
  const attributeSchemas = defineSchemas([
    { name: 'id', hide: true },
    { name: 'product_id', hide: true },
    { name: 'name', label: '属性名称', component: 'Input', required: true, componentProps: { placeholder: '如：颜色、尺寸、材质等' } },
    { name: 'value', label: '属性值', component: 'Input', required: true, componentProps: { placeholder: '如：红色、XL、纯棉等' } },
    { name: 'sort_order', label: '排序权重', component: 'InputNumber', componentProps: { min: 0, defaultValue: 0, placeholder: '数字越小排序越靠前' } }
  ]);

  const AttributeModal = ({ productId, productName, onSuccess, editData }: AttributeModalProps) => {
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (values: any) => {
      setLoading(true);
      try {
        let response;
        if (editData) {
          // 编辑属性
          response = await API.product.productControllerUpdateProductAttribute({
            id: editData.id,
            ...values
          });
        } else {
          // 新增属性
          response = await API.product.productControllerCreateProductAttribute({
            product_id: productId,
            ...values
          });
        }

        if (response.code === 0) {
          $message.success(editData ? '更新成功' : '添加成功');
          onSuccess?.();
          return true;
        } else {
          $message.error(response.message);
          return false;
        }
      } catch (error) {
        $message.error(editData ? '更新失败' : '添加失败');
        return false;
      } finally {
        setLoading(false);
      }
    };

    return (
      <div className="p-4">
        <div className="mb-4">
          <h3 className="text-lg font-medium">
            {editData ? '编辑规格' : '新增规格'} - {productName}
          </h3>
        </div>
        <ProForm
          schemas={attributeSchemas}
          onFinish={handleSubmit}
          initialValues={editData || { product_id: productId, sort_order: 0 }}
        />
      </div>
    );
  };

  const openAttributeModal = (productId: number, productName: string, onSuccess?: () => void, editData?: any) => {
    showModal({
      title: editData ? '编辑规格' : '新增规格',
      content: <AttributeModal productId={productId} productName={productName} onSuccess={onSuccess} editData={editData} />,
      width: 650,
      footer: null
    });
  };

  return { openAttributeModal };
};
