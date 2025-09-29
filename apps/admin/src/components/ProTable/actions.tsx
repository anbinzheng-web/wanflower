import { useState } from 'react';
import { ActionsProps } from './interface';
import { Space, Button } from 'antd';

export const Actions = (props: ActionsProps) => {
  const { record, handleAction: handleActionProps, actions } = props;
  const [buttonLoading, setButtonLoading] = useState({});

  const handleAction: ActionsProps['handleAction'] = async (name, record) => {
    setButtonLoading((map) => {
      map[name] = true
      return { ...map }
    })
    try {
      await handleActionProps(name, record)
    } finally {
      setButtonLoading((map) => {
        map[name] = false;
        return { ...map }
      })
    }
  }

  return <Space>
    {actions.map(item => {
      return <Button 
        key={item.name}
        type='text' 
        {...item.props}
        icon={item.icon} 
        loading={buttonLoading[item.name]}
        onClick={() => handleAction(item.name, record)} 
      >{item.text}</Button>
    })}
  </Space>
}