import { message, Modal } from 'antd'

// 全局属性
declare global {
  var $message: typeof message
  var $modal: typeof Modal
}