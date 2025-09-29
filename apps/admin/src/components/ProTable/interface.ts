import { TableProps, ButtonProps } from 'antd';
import { ColumnType } from 'antd/es/table/interface'
import { ReactNode } from 'react';
import { ComponentType } from '@/components/ProForm/interface';

type ActionItem = {
  name: string
  icon?: ReactNode
  text?: ReactNode
  props?: Omit<ButtonProps, 'children' | 'loading' | 'onClick'>
}

export interface ActionsProps {
  record: any
  actions: ActionItem[]
  handleAction?: (name: string, record) => Promise<any> | void;
}

export interface SearchProps {
  columns?: ProColumnsProps[]
  right?: ReactNode
}

export interface ProColumnsProps extends ColumnType<any> {
  searchType?: ComponentType
  searchProps?: any
  searchDefaultValue?: any
  searchFiled?: string
}

export interface ProTableProps extends Omit<TableProps, 'columns' | 'noDataElement' | 'loading'> {
  columns?: ProColumnsProps[]
  request?: (params: any) => Promise<any>
  handleAction?: ActionsProps['handleAction']
  actions?: ActionsProps['actions']
  renderAction?: ColumnType['render']
  searchRight?: ReactNode
}