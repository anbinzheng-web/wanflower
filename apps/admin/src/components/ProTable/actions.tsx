import { useState, useMemo } from 'react';
import { ActionsProps } from './interface';
import { Space, Button, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';

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

  const showActions = useMemo(() => actions.filter(item => !item.hide?.(record)), [actions, record])

  const dropdownItems = useMemo(() => {
    return showActions.filter(item => item.collapsed).map(item => ({
      key: item.name,
      label: item.text,
      icon: item.icon,
      onClick: () => handleAction(item.name, record)
    }))
  }, [showActions])

  return <Space>
    {showActions.filter(item => !item.collapsed).map(item => {
      return <Button 
        shape="circle"
        key={item.name}
        type='text' 
        {...item.props}
        icon={item.icon} 
        loading={buttonLoading[item.name]}
        onClick={() => handleAction(item.name, record)} 
      >{item.text}</Button>
    })}
    {
      dropdownItems.length > 0 ? <Dropdown menu={{ items: dropdownItems }}>
        <Button type='text' icon={<DownOutlined />} />
      </Dropdown> : null
    }
  </Space>
}

export const defineActions = (actions: ActionsProps['actions']) => {
  return actions;
}