import { useFormModal } from '@/hooks/useFormModal';
import { ProTableRef } from '@/components/ProTable';
import { useState, useCallback, useEffect } from 'react';
import { API } from '@/api';
import { defineSchemas } from '@/components/ProForm';

export const useProductModal = (tableRef: React.RefObject<ProTableRef>) => {
  const showFormModal = useFormModal();
  const [categories, setCategories] = useState<any[]>([])

  // 产品表单配置
  const productSchemas = defineSchemas([
    { fieldId: 'name', label: '产品名称', component: 'Input', required: true },
    { fieldId: 'description', label: '产品描述', component: 'Input', required: true },
    { fieldId: 'short_desc', label: '简短描述', component: 'Input' },
    { fieldId: 'price', label: '价格', component: 'InputNumber', required: true, componentProps: { min: 0, precision: 2 } },
    { fieldId: 'original_price', label: '原价', component: 'InputNumber', componentProps: { min: 0, precision: 2 } },
    { fieldId: 'stock', label: '库存', component: 'InputNumber', required: true, componentProps: { min: 0 } },
    { fieldId: 'min_stock', label: '最小库存预警', component: 'InputNumber', componentProps: { min: 0 } },
    { fieldId: 'weight', label: '重量(kg)', component: 'InputNumber', componentProps: { min: 0, precision: 3 } },
    { fieldId: 'sku', label: 'SKU编码', component: 'Input' },
    { fieldId: 'barcode', label: '条形码', component: 'Input' },
    { fieldId: 'status', label: '状态', component: 'Select', required: true, componentProps: { 
      options: [
        { label: '上架', value: 'ACTIVE' },
        { label: '下架', value: 'INACTIVE' },
        { label: '草稿', value: 'DRAFT' }
      ]
    }},
    { fieldId: 'category_id', label: '分类', component: 'Select', componentProps: { 
      options: categories.map(cat => ({ label: cat.name, value: cat.id })),
      placeholder: '请选择分类'
    }},
    { fieldId: 'sort_order', label: '排序权重', component: 'InputNumber', componentProps: { min: 0 } },
    { fieldId: 'seo_title', label: 'SEO标题', component: 'Input' },
    { fieldId: 'seo_description', label: 'SEO描述', component: 'Input' },
    { fieldId: 'seo_keywords', label: 'SEO关键词', component: 'Select', componentProps: { 
      mode: 'tags',
      placeholder: '输入关键词后按回车添加'
    }}
  ])

  // 产品表单弹窗
  const showProductModal = useFormModal()

  // 打开产品表单
  const openProductModal = (record?: any) => {
    showProductModal({
      title: record ? '编辑产品' : '新增产品',
      schemas: productSchemas,
      initialValues: record,
      formProps: {
        labelCol: { span: 6 },
        wrapperCol: { span: 18 },
      },
      onOk: async (values) => {
        try {
          if (values.id) {
            await API.product.productControllerUpdateProduct(values)
            $message.success('产品更新成功')
          } else {
            await API.product.productControllerCreateProduct(values)
            $message.success('产品创建成功')
          }
          // 刷新列表
          tableRef.current?.refresh()
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