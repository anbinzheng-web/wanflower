import { SearchProps } from './interface';
import { Button, Form, FormInstance, Space, Row, Col } from 'antd';
import { Components } from '@/components/ProForm/interface';
import { useProTableContext } from './context';

export const Search = (props: SearchProps) => {
  const [form] = Form.useForm<FormInstance>();
  const { request } = useProTableContext();

  const searchList = props.columns?.filter(col => col.searchType);
  const initialValues = searchList.reduce((prev, curr) => {
    if (curr.searchDefaultValue) {
      prev[curr.searchFiled || curr.dataIndex] = curr.searchDefaultValue;
    }
    return prev;
  }, {})
  
  return <div className='flex justify-between items-start w-full'>
    <Form initialValues={initialValues} form={form} onFinish={request} wrapperCol={{ span: 24 }} className="w-full">
      <Row gutter={16} className={"flex-1"}>
        {searchList.map((item, index) => {
          const Search = Components[item.searchType] as any
          return <Col span={4} key={index}>
            <Form.Item name={item.searchFiled || item.dataIndex} style={{ marginBottom: 16 }}>
              <Search placeholder={item.title as string} {...item.searchProps} />
            </Form.Item>
          </Col>
        })}
        {searchList.length > 0 ? <Col span={4}>
          <Space>
            <Button type="primary" htmlType='submit'>查询</Button>
            <Button onClick={() => form.resetFields()}>重置</Button>
          </Space>
        </Col> : null}
      </Row>
    </Form>
    <Space className='mb-4'>{props.right}</Space>
  </div>
}