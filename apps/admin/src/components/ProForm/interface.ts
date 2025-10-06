import { Input, InputNumber, Select, Upload, TreeSelect, TimePicker, Switch, Slider, Rate, Radio, Mentions, DatePicker, ColorPicker, Checkbox, AutoComplete } from 'antd'
import type { FormProps, FormItemProps, FormInstance, RowProps, ColProps } from 'antd'
import React from 'react'

export const Components = {
  Input,
  InputNumber,
  Textarea: Input.TextArea,
  Select,
  Upload,
  TreeSelect,
  TimePicker,
  Switch,
  Slider,
  Rate,
  Radio,
  Mentions,
  DatePicker,
  ColorPicker,
  Checkbox,
  AutoComplete,
}

export type ComponentType = keyof typeof Components

type ComponentPropsFunction<T extends ComponentType> = (formRef: FormInstance) => React.ComponentProps<(typeof Components)[T]>

export type FormSchema<T extends ComponentType = ComponentType> = 
  T extends ComponentType
    ? (FormItemProps & {
        component?: T
        componentProps?: React.ComponentProps<(typeof Components)[T]> | ComponentPropsFunction<T>
        render?: (formRef: FormInstance) => any
        colProps?: ColProps
        hide?: boolean | ((formRef: FormInstance) => boolean)
      })
    : never

export interface ProFormProps extends Omit<FormProps, 'children'> {
  schemas?: FormSchema[]
  children?: React.ReactNode | ((formItems: React.ReactNode[], formRef: FormInstance) => React.ReactNode)
  rowProps?: RowProps
}
