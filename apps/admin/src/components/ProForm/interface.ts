import { Input, InputNumber, Select, Upload, TreeSelect, TimePicker, Switch, Slider, Rate, Radio, Mentions, DatePicker, ColorPicker, Checkbox, AutoComplete } from 'antd'
import type { FormProps, FormItemProps, FormInstance } from 'antd'
import React from 'react'

export const Components = {
  Input,
  InputNumber,
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
  AutoComplete
}

export type ComponentType = keyof typeof Components

// export interface FormSchema extends FormItemProps {
//   component?: ComponentType
//   componentProps?: xxx
// }

type ComponentPropsFunction<T extends ComponentType> = (formRef: FormInstance) => React.ComponentProps<(typeof Components)[T]>

export type FormSchema<T extends ComponentType = ComponentType> = 
  T extends ComponentType
    ? (FormItemProps & {
        component: T
        componentProps?: React.ComponentProps<(typeof Components)[T]> | ComponentPropsFunction<T>
        render?: (formRef: FormInstance) => any
      })
    : never

export interface ProFormProps extends FormProps {
  schemas?: FormSchema[]
  children?: React.ReactNode
}
