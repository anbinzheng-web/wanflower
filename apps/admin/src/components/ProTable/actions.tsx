import { useState, useMemo } from 'react';
import { ActionsProps } from './interface';
import { Space, Button, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';

export const Actions = (props: ActionsProps) => {
  const { record, handleAction: handleActionProps, actions } = props;
  const [buttonLoading, setButtonLoading] = useState({});

  const handleAction: ActionsProps['handleAction'] = async (name, record) => {
    setButtonLoading((map) => {
      map[record.id] = true
      return { ...map }
    })
    try {
      await handleActionProps(name, record)
    } finally {
      setButtonLoading((map) => {
        map[record.id] = false;
        return { ...map }
      })
    }
  }

  const showActions = useMemo(() => actions.filter(item => !item.hide?.(record)), [actions, record])

  const formatDropdown = (item) => {
    return {
      key: item.name,
      label: item.text,
      icon: item.icon,
      type: item.type,
      danger: item.danger,
      disabled: item.disabled,
      onClick: () => handleAction(item.name, record),
      children: item.children?.map(formatDropdown)
    }
  }

  const dropdownItems = useMemo(() => showActions.filter(item => item.collapsed).map(formatDropdown), [showActions])

  return <Space>
    {showActions.filter(item => !item.collapsed).map(item => {
      return <Button 
        shape="circle"
        key={item.name}
        type='text' 
        danger={item.danger}
        icon={item.icon} 
        loading={buttonLoading[record.id]}
        onClick={() => handleAction(item.name, record)}
        {...item.props} 
      >{item.text}</Button>
    })}
    {
      dropdownItems.length > 0 ? <Dropdown menu={{ items: dropdownItems }}>
        <Button type='text' icon={<DownOutlined />}/>
      </Dropdown> : null
    }
  </Space>
}

export const defineActions = (actions: ActionsProps['actions']) => {
  return actions;
}

export const useActions = (actions: ActionsProps['actions']) => {
  return useState<ActionsProps['actions']>(actions)
}