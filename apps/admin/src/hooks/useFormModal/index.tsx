import { useModal } from '../useModal';
import { Button, Form, FormInstance, Space } from 'antd';
import { ModalFuncProps } from 'antd/es/modal/interface';
import { ProForm } from '@/components/ProForm';
import { ProFormProps } from '@/components/ProForm/interface';
import { ModalFunc } from 'antd/es/modal/confirm';

interface FormModalProps extends Omit<ModalFuncProps, 'content' | 'footer'> {
  schemas?: ProFormProps['schemas']
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
      ...rest 
    } = props;
    const hideModal = () => modal.destroy();
    const onFinish = async (formdata) => {
      // modal.update({
      //   okButtonProps: { loading: true },
      //   cancelButtonProps: { disabled: true }
      // })
      await onOkProps?.(formdata);
      // modal.update({
      //   okButtonProps: { loading: false },
      //   cancelButtonProps: { disabled: false }
      // })
      hideModal();
    }
    modal = showModal({
      ...rest,
      // footer: null,
      modalRender: (dom) => {
        return <ProForm schemas={schemas} onFinish={onFinish}>{dom}</ProForm>
      },
      content: <div>
        123123
        {/* <ProForm schemas={schemas} onFinish={onFinish}>
          <Form.Item noStyle>
            <Space className="w-full justify-end">
              <Button onClick={hideModal} {...cancelButtonProps}>{cancelText}</Button>
              <Button type="primary" htmlType="submit" {...okButtonProps}>{okText}</Button>
            </Space>
          </Form.Item>
        </ProForm> */}
      </div>
    })

    return modal
  }
  return showFormModal;
}