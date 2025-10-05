import { useEffect, useRef } from 'react';
import { createRoot, Root } from 'react-dom/client';
import { CloseOutlined } from '@ant-design/icons';
import { Button, theme } from 'antd';

export interface FullModalProps {
  title?: string
  content: (props: { destroy: () => void }) => React.ReactNode
}

export const useFullModal = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const rootRef = useRef<Root | null>(null);
  const { token } = theme.useToken();

  const destroy = () => {
    rootRef.current?.unmount();
    containerRef.current && document.body.removeChild(containerRef.current);
    rootRef.current = null;
    containerRef.current = null;
  }

  function showFullModal(props: FullModalProps) {
    if (rootRef.current) {
      // 如果已经存在，则不重复创建
      return;
    }

    const container = document.createElement('div');
    container.className = 'fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center';
    container.style.zIndex = String(token.zIndexPopupBase + 1);
    document.body.appendChild(container);
    containerRef.current = container;

    const root = createRoot(container);
    root.render(<div className='w-full h-screen overflow-auto bg-white relative'>
      <div onClick={destroy} className='w-auto fixed top-6 right-6 flex justify-end'>
        <Button icon={<CloseOutlined />} type="text" shape="circle" />
      </div>
      <div className='h-full overflow-auto p-16'>
        {props.content({ destroy })}
      </div>
    </div>);
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