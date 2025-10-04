import { Form } from 'antd';
import { ProFormProps } from './interface';
import { Components } from './interface'
import { useState } from 'react';
import type { FormInstance } from 'antd';

export const ProForm = (props: ProFormProps) => {
  const { schemas, children, ...rest } = props;
  const [formRef] = Form.useForm<FormInstance>()
  const formItems = schemas.map((item, index) => {
    const { component, render, componentProps, ...formItemRest } = item;
    const Comp = typeof render === 'function' ? render(formRef) : Components[component];
    const CompProps = typeof componentProps === 'function' ? componentProps(formRef) : componentProps
    return <Form.Item {...formItemRest} key={index}>
      <Comp {...CompProps as any} />
    </Form.Item>
  })
  return <Form form={formRef} {...rest}>
    { typeof children === 'function' ? children(formItems, formRef) : <>
      {formItems}
      {children}
    </>}
  </Form>
}

export const defineSchemas = (schemas: ProFormProps['schemas']) => {
  return schemas
}

export const useSchemas = (__schemas: ProFormProps['schemas']) => {
  return useState<ProFormProps['schemas']>(__schemas);
}

export * from './interface';