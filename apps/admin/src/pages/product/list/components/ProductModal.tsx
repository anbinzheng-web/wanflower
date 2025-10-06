import { useFullFormModal } from '@/hooks/useFullFormModal';
import { ProTableRef } from '@/components/ProTable';
import { useState, useCallback, useEffect } from 'react';
import { defineSchemas } from '@/components/ProForm';
import { API } from '@/api';
import { Divider } from 'antd';

export const useProductModal = (tableRef: React.RefObject<ProTableRef>) => {
  const [categories, setCategories] = useState<any[]>([])
  const showFullFormModal = useFullFormModal();

  // 产品表单配置
  const productSchemas = defineSchemas([
    { name: 'id', hide: true },
    { name: 'name', label: '产品名称', component: 'Input', required: true },
    { name: 'description', label: '产品描述', component: 'Input', required: true },
    { name: 'short_desc', label: '简短描述', component: 'Input' },
    { name: 'price', label: '价格', component: 'InputNumber', required: true, componentProps: { min: 0, precision: 2 } },
    { name: 'original_price', label: '原价', component: 'InputNumber', componentProps: { min: 0, precision: 2 } },
    { name: 'stock', label: '库存', component: 'InputNumber', required: true, componentProps: { min: 0 } },
    { name: 'min_stock', label: '最小库存预警', component: 'InputNumber', componentProps: { min: 0 } },
    { name: 'weight', label: '重量(kg)', component: 'InputNumber', componentProps: { min: 0, precision: 3 } },
    { name: 'sku', label: 'SKU编码', component: 'Input' },
    { name: 'barcode', label: '条形码', component: 'Input' },
    { name: 'status', label: '状态', component: 'Select', required: true, componentProps: { 
      options: [
        { label: '上架', value: 'ACTIVE' },
        { label: '下架', value: 'INACTIVE' },
        { label: '草稿', value: 'DRAFT' }
      ]
    }},
    { name: 'category_id', label: '分类', component: 'Select', componentProps: { 
      options: categories.map(cat => ({ label: cat.name, value: cat.id })),
      placeholder: '请选择分类'
    }},
    { name: 'sort_order', label: '排序权重', component: 'InputNumber', componentProps: { min: 0 } },

    // 尺寸信息分组
    { 
      name: 'dimensions_divider', 
      label: '', 
      render: () => <Divider orientation="left" plain>尺寸信息</Divider>,
      wrapperCol: { span: 24 }
    },
    { name: ['dimensions', 'length'], label: '长度(cm)', component: 'InputNumber', componentProps: { min: 0, precision: 1, placeholder: '请输入长度' } },
    { name: ['dimensions', 'width'], label: '宽度(cm)', component: 'InputNumber', componentProps: { min: 0, precision: 1, placeholder: '请输入宽度' } },
    { name: ['dimensions', 'height'], label: '高度(cm)', component: 'InputNumber', componentProps: { min: 0, precision: 1, placeholder: '请输入高度' } },
    { name: ['dimensions', 'unit'], label: '尺寸单位', component: 'Select', componentProps: { 
      options: [
        { label: '厘米(cm)', value: 'cm' },
        { label: '毫米(mm)', value: 'mm' },
        { label: '英寸(in)', value: 'in' }
      ],
      defaultValue: 'cm'
    }},

    // SEO信息分组
    { 
      name: 'seo_divider', 
      label: '', 
      render: () => <Divider orientation="left" plain>SEO信息</Divider>,
      wrapperCol: { span: 24 }
    },
    { name: 'seo_title', label: 'SEO标题', component: 'Input' },
    { name: 'seo_description', label: 'SEO描述', component: 'Input' },
    { name: 'seo_keywords', label: 'SEO关键词', component: 'Select', componentProps: { 
      mode: 'tags',
      placeholder: '输入关键词后按回车添加'
    }}
  ])

  // 打开产品表单
  const openProductModal = (record?: any) => {
    showFullFormModal({
      schemas: productSchemas,
      contentClasses: "w-[700px] mx-auto",
      proFormProps: {
        layout: 'horizontal',
        initialValues: record,
        labelCol: { span: 6 },
        wrapperCol: { span: 18 },
      },
      onOk: async (values) => {
        try {
          // 处理尺寸信息，确保 dimensions 对象结构正确
          const processedValues = {
            ...values,
            // 如果 dimensions 字段存在但为空对象，则删除它
            ...(values.dimensions && Object.values(values.dimensions).every(v => !v) 
              ? { dimensions: undefined } 
              : {}
            )
          }

          let res;
          if (processedValues.id) {
            res = await API.product.productControllerUpdateProduct(processedValues)
          } else {
            res = await API.product.productControllerCreateProduct(processedValues)
          }
          if (res.code === 0) {
            tableRef.current?.refresh()
          } else {
            $message.error(res.message)
          }
        } catch (error) {
          $message.error('操作失败')
        }
      }
    })
  }

  // 获取分类列表
  const fetchCategories = useCallback(async () => {
    try {
      const response = await API.product.productControllerGetCategoryList({})
      const categoryList = response.data.records || []
      setCategories(categoryList)
      return categoryList
    } catch (error) {
      console.error('获取分类列表失败:', error)
      return []
    }
  }, [])

  // 加载分类数据
  useEffect(() => {
    fetchCategories()
  }, [fetchCategories])

  return {
    openProductModal
  }
}