import { TableProps, ButtonProps } from 'antd';
import { ColumnType } from 'antd/es/table/interface'
import { ReactNode, RefObject } from 'react';
import { ComponentType } from '@/components/ProForm/interface';

type ActionItem = {
  name?: string
  icon?: ReactNode
  text?: ReactNode
  props?: Omit<ButtonProps, 'children' | 'loading' | 'onClick'>
  collapsed?: boolean
  isPopconfirm?: boolean
  tooltipContent?: ReactNode
  hide?: (record: any) => boolean
  danger?: boolean
  type?: 'divider'
  disabled?: boolean
  children?: ActionItem[]
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

export interface SearchItem {
  type: ComponentType
  props?: any
  defaultValue?: any
  filed?: string
}

type PrefixedSearch<T> = {
  [K in keyof T as `search${Capitalize<string & K>}`]?: T[K]
}

export interface ProColumnsProps extends ColumnType<any>, PrefixedSearch<any> { }

export interface ProTableRef {
  refresh: () => void
}

export interface ProTableProps extends Omit<TableProps, 'columns' | 'noDataElement' | 'loading'> {
  columns?: ProColumnsProps[]
  request?: (params: any) => Promise<any>
  handleAction?: ActionsProps['handleAction']
  actions?: ActionsProps['actions']
  renderAction?: ColumnType['render']
  toolBar?: ReactNode
  ref?: RefObject<ProTableRef>
}