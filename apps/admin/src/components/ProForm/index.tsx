import { Form } from 'antd';
import { ProFormProps } from './interface';
import { Components } from './interface'
import { useRef } from 'react';
import type { FormInstance } from 'antd';

export const ProForm = (props: ProFormProps) => {
  const { schemas, children, ...rest } = props;
  const [formRef] = Form.useForm<FormInstance>()
  return <Form form={formRef} {...rest}>
    {schemas.map((item, index) => {
      const { component, render, componentProps, ...formItemRest } = item;
      const Comp = typeof render === 'function' ? render(formRef) : Components[component];
      const CompProps = typeof componentProps === 'function' ? componentProps(formRef) : componentProps
      return <Form.Item {...formItemRest} key={index}>
        <Comp {...CompProps as any} />
      </Form.Item>
    })}
    {children}
  </Form>
}

export const useSchemas = (schemas: ProFormProps['schemas']) => {
  return schemas
}