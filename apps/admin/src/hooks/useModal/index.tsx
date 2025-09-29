import { Modal } from 'antd';
import { ModalFunc } from 'antd/es/modal/confirm';

const { confirm } = Modal;

export const useModal = () => {
  const showModal: ModalFunc = (props) => {
    return confirm({
      icon: null,
      ...props
    })
  }
  return showModal;
}