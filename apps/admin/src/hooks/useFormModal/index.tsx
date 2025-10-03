import { useModal } from '../useModal';
import { Button, Form, Space } from 'antd';
import { ModalFuncProps } from 'antd/es/modal/interface';
import { ProForm } from '@/components/ProForm';
import { ProFormProps } from '@/components/ProForm/interface';
import { ModalFunc } from 'antd/es/modal/confirm';
import { cloneElement, ReactElement } from 'react';

interface FormModalProps extends Omit<ModalFuncProps, 'content' | 'footer'> {
  schemas?: ProFormProps['schemas']
  initialValues?: Record<string, any>
}

export const useFormModal = () => {
  const showModal = useModal();
  const showFormModal = (props: FormModalProps): ReturnType<ModalFunc> => {
    let modal: ReturnType<ModalFunc>
    const { 
      schemas, 
      onOk: onOkProps, 
      onCancel, 
      okButtonProps, 
      cancelButtonProps, 
      okText = "确定", 
      cancelText = "取消", 
      title,
      initialValues,
      ...rest 
    } = props;
    const hideModal = () => modal.destroy();
    const onFinish = async (formdata) => {
      await onOkProps?.(formdata);
      hideModal();
    }
    modal = showModal({
      ...rest,
      modalRender: (dom) => {
        return cloneElement(dom as ReactElement, null, <div>
          <div className='text-lg font-bold mb-4'>{title}</div>
          <ProForm schemas={schemas} onFinish={onFinish} initialValues={initialValues}>
            <Form.Item noStyle>
              <Space className="w-full justify-end">
                <Button onClick={hideModal} {...cancelButtonProps}>{cancelText}</Button>
                <Button type="primary" htmlType="submit" {...okButtonProps}>{okText}</Button>
              </Space>
            </Form.Item>
          </ProForm>
        </div>)
      },
    })

    return modal
  }
  return showFormModal;
}