import { useFullFormModal } from '@/hooks/useFullFormModal';
import { ProTableRef } from '@/components/ProTable';
import { useState, useCallback, useEffect } from 'react';
import { defineSchemas } from '@/components/ProForm';
import { API } from '@/api';

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
      contentClasses: "w-[600px] mx-auto",
      proFormProps: {
        layout: 'horizontal',
        initialValues: record,
        labelCol: { span: 6 },
        wrapperCol: { span: 18 },
      },
      onOk: async (values) => {
        try {
          let res;
          if (values.id) {
            res = await API.product.productControllerUpdateProduct(values)
          } else {
            res = await API.product.productControllerCreateProduct(values)
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