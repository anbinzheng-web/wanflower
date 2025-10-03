import { message, Modal } from 'antd'
import dayjs from 'dayjs'

// 全局属性
declare global {
  var $message: typeof message
  var $modal: typeof Modal
  var $dayjs: typeof dayjs
  var $formatDate: (date: string) => string
}