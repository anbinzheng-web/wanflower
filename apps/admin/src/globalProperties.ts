import { message, Modal } from 'antd'
import dayjs from 'dayjs';

export function registerGlobalProperties() {
    globalThis.$message = message;
    globalThis.$modal = Modal;
    globalThis.$dayjs = dayjs;
    globalThis.$formatDate = (date: string) => $dayjs(date).format('YYYY-MM-DD HH:mm:ss')
}