import { Col, Form, Row } from 'antd';
import { ProFormProps } from './interface';
import { Components } from './interface'
import { useState } from 'react';
import type { FormInstance } from 'antd';

export const ProForm = (props: ProFormProps) => {
  const { schemas, children, rowProps, ...rest } = props;
  const [formRef] = Form.useForm<FormInstance>()
  const formItems = schemas.map((item, index) => {
    const { component, render, componentProps, colProps, hide, ...formItemRest } = item;
    const Comp = typeof render === 'function' ? render(formRef) : Components[component];
    const CompProps = typeof componentProps === 'function' ? componentProps(formRef) : componentProps;
    let hideItem = false;
    if (typeof hide === 'function') {
      hideItem = hide(formRef);
    } else if (hide) {
      hideItem = hide;
    }
    return <Col span={hideItem ? 0 : 24} key={index} {...colProps}>
      <Form.Item {...formItemRest} noStyle={hideItem} key={index}>
        { !hideItem ? <Comp {...CompProps as any} /> : null }
      </Form.Item>
    </Col>
  })
  return <Form form={formRef} {...rest}>
    <Row {...rowProps}>
      { typeof children === 'function' ? children(formItems, formRef) : <>
        {formItems}
        {children}
      </>}
    </Row>
  </Form>
}

export const defineSchemas = (schemas: ProFormProps['schemas']) => {
  return schemas
}

export const useSchemas = (__schemas: ProFormProps['schemas']) => {
  return useState<ProFormProps['schemas']>(__schemas);
}

export * from './interface';