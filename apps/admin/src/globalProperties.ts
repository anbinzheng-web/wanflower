import { message, Modal } from 'antd'

export function registerGlobalProperties() {
    globalThis.$message = message;
    globalThis.$modal = Modal;
}