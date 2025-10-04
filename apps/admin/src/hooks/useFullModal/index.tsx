import { useEffect, useRef, useState } from 'react';
import { createRoot, Root } from 'react-dom/client';
import { CloseOutlined } from '@ant-design/icons';
import { Button, Space } from 'antd';
import { ProForm, type ProFormProps } from '@/components/ProForm';

interface FullModalProps {
  schemas?: ProFormProps['schemas']
  proFormProps?: ProFormProps
  onOk?: (values: any) => Promise<void>
  onCancel?: () => void
}

export const FullModalContent = ({ destroy, schemas, onCancel: onCancelProps, onOk: onOkProps, proFormProps }: FullModalProps & { destroy: () => void }) => {
  const onCancel = () => {
    onCancelProps?.();
    destroy();
  }
  const onOk = async (values: any) => {
    await onOkProps?.(values);
    destroy();
  }
  return <ProForm schemas={schemas} className='w-full' {...proFormProps} onFinish={onOk}>{(formItems, _formRef) => {
    return <div className='w-full h-screen overflow-auto bg-white relative'>
    <div onClick={onCancel} className='w-auto sticky top-6 mr-6 flex justify-end'>
      <Button icon={<CloseOutlined />} type="text" shape="circle" />
    </div>
    <div className='px-16 py-10 min-h-screen'>
      {formItems}
    </div>
    <div className='sticky bottom-0 h-16 bg-white px-16 flex items-center justify-end shadow-[0_-2px_6px_0px_rgba(0,0,0,0.05)]'>
      <Space>
        <Button onClick={onCancel}>取消</Button>
        <Button type='primary' htmlType='submit'>确定</Button>
      </Space>
    </div>
  </div>
  }}</ProForm>
}

export const useFullModal = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const rootRef = useRef<Root | null>(null);

  const destroy = () => {
    rootRef.current?.unmount();
    document.body.removeChild(containerRef.current);
  }

  function showFullModal(props: FullModalProps) {
    const container = document.createElement('div');
    container.className = 'fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-1000';
    document.body.appendChild(container);
    containerRef.current = container;

    const root = createRoot(container);
    root.render(<FullModalContent destroy={destroy} {...props} />)
    rootRef.current = root;

    return {
      destroy
    };
  }

  useEffect(() => {
    return destroy;
  }, [])

  return showFullModal
}