import { useFullModal } from '../useFullModal';
import { Button, Space } from 'antd';
import { ProForm, type ProFormProps } from '@/components/ProForm';
import { FullModalProps } from '../useFullModal';
import clsx from 'clsx';

interface FullFormModalProps extends Omit<FullModalProps, 'content'> {
  schemas?: ProFormProps['schemas']
  proFormProps?: ProFormProps
  onOk?: (values: any) => Promise<void>
  onCancel?: () => void
  contentClasses?: string
}

export const FullFormModalContent = ({ 
  destroy, 
  schemas, 
  onCancel: onCancelProps, 
  onOk: onOkProps, 
  proFormProps, 
  contentClasses 
}: FullFormModalProps & { destroy: () => void }) => {
  const onCancel = () => {
    onCancelProps?.();
    destroy();
  }
  const onOk = async (values: any) => {
    await onOkProps?.(values);
    destroy();
  }
  return <ProForm schemas={schemas} className='w-full' {...proFormProps} onFinish={onOk}>{(formItems, _formRef) => {
    return <>
      <div className={clsx('py-10 min-h-screen', contentClasses)}>
        {formItems}
      </div>
      <div className='fixed w-full bottom-0 left-0 h-16 bg-white px-16 flex items-center justify-end shadow-[0_-2px_6px_0px_rgba(0,0,0,0.05)]'>
        <Space>
          <Button onClick={onCancel}>取消</Button>
          <Button type='primary' htmlType='submit'>确定</Button>
        </Space>
      </div>
    </>
  }}</ProForm>
}

export const useFullFormModal = () => {
  const showFullModal = useFullModal();

  const showFormModal = (props: FullFormModalProps) => {
    showFullModal({
      content: ({ destroy }) => <FullFormModalContent {...props} destroy={destroy} />
    })
  }

  return showFormModal;
}