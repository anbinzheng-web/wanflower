import { ProForm, useSchemas } from '@/components/ProForm'

export default function() {
  const schemas = useSchemas([
    {
      field: 'name',
      label: '名称',
      component: 'Input',
    },
    {
      field: 'pro',
      label: '平台',
      component: 'Select'
    },
    {
      field: 'price',
      label: '价格',
      component: 'InputNumber'
    }
  ])
  return <div>
    <ProForm schemas={schemas}>

    </ProForm>
  </div>
}