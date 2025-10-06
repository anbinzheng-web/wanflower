import { useState, useEffect, useRef } from 'react';
import { ProTable, defineColumns, ProTableRef } from '@/components/ProTable';
import { Tag, Modal, Statistic, Row, Col, Card, Tooltip } from 'antd';
import { EyeOutlined, DeleteOutlined, DollarOutlined } from '@ant-design/icons';
import { API } from '@/api';
import { useModal } from '@/hooks/useModal';

// 支付方式映射
const PAYMENT_METHOD_MAP = {
  CASH: { text: '现金', color: 'green' },
  BANK_TRANSFER: { text: '银行转账', color: 'blue' },
  WIRE_TRANSFER: { text: '电汇', color: 'purple' },
  CHECK: { text: '支票', color: 'orange' },
  STRIPE: { text: 'Stripe支付', color: 'cyan' },
  PAYPAL: { text: 'PayPal支付', color: 'magenta' },
  ALIPAY: { text: '支付宝', color: 'blue' },
  WECHAT_PAY: { text: '微信支付', color: 'green' },
  OTHER: { text: '其他', color: 'default' },
};

// 支付状态映射
const PAYMENT_STATUS_MAP = {
  PENDING: { text: '待支付', color: 'orange' },
  PAID: { text: '已支付', color: 'green' },
  FAILED: { text: '支付失败', color: 'red' },
  REFUNDED: { text: '已退款', color: 'default' },
  CANCELLED: { text: '已取消', color: 'red' },
};

export default function PaymentList() {
  const [stats, setStats] = useState(null);
  const showModal = useModal();
  const tableRef = useRef<ProTableRef>(null);

  // 获取支付统计
  const fetchStats = async () => {
    try {
      const response = await API.payment.paymentControllerGetPaymentStats();
      if (response.code === 0) {
        setStats(response.data);
      }
    } catch (error) {
      console.error('获取支付统计失败:', error);
    }
  };

  // 查看支付详情
  const handleView = async (record: any) => {
    try {
      const response = await API.payment.paymentControllerGetPaymentDetail(record.id);
      if (response.code === 0) {
        const payment = response.data;
        showModal({
          title: '支付详情',
          content: (<div className="space-y-4">
            <Row gutter={16}>
              <Col span={12}>
                <Card size="small" title="基本信息">
                  <div className="space-y-2">
                    <div><strong>支付ID:</strong> {payment.id}</div>
                    <div><strong>订单号:</strong> {payment.order.order_number}</div>
                    <div><strong>支付方式:</strong> 
                      <Tag color={PAYMENT_METHOD_MAP[payment.payment_method]?.color} className="ml-2">
                        {PAYMENT_METHOD_MAP[payment.payment_method]?.text}
                      </Tag>
                    </div>
                    <div><strong>支付金额:</strong> 
                      <span className="text-green-600 font-semibold">¥{payment.amount}</span>
                    </div>
                    <div><strong>支付时间:</strong> {globalThis.$formatDate(payment.paid_at)}</div>
                  </div>
                </Card>
              </Col>
              <Col span={12}>
                <Card size="small" title="用户信息">
                  <div className="space-y-2">
                    <div><strong>用户ID:</strong> {payment.order.user.id}</div>
                    <div><strong>用户名:</strong> {payment.order.user.username}</div>
                    <div><strong>邮箱:</strong> {payment.order.user.email}</div>
                    <div><strong>订单状态:</strong> 
                      <Tag color={PAYMENT_STATUS_MAP[payment.order.status]?.color} className="ml-2">
                        {PAYMENT_STATUS_MAP[payment.order.status]?.text}
                      </Tag>
                    </div>
                  </div>
                </Card>
              </Col>
            </Row>
            
            {payment.payment_notes && (
              <Card size="small" title="支付备注">
                <div>{payment.payment_notes}</div>
              </Card>
            )}
            
            {(payment.transaction_reference || payment.bank_name || payment.account_last_four) && (
              <Card size="small" title="交易信息">
                <div className="space-y-2">
                  {payment.transaction_reference && (
                    <div><strong>交易凭证号:</strong> {payment.transaction_reference}</div>
                  )}
                  {payment.bank_name && (
                    <div><strong>银行名称:</strong> {payment.bank_name}</div>
                  )}
                  {payment.account_last_four && (
                    <div><strong>账户后四位:</strong> {payment.account_last_four}</div>
                  )}
                </div>
              </Card>
            )}
            
            <Card size="small" title="管理员信息">
              <div className="space-y-2">
                <div><strong>确认管理员:</strong> {payment.admin.username}</div>
                <div><strong>管理员邮箱:</strong> {payment.admin.email}</div>
                <div><strong>确认时间:</strong> {globalThis.$formatDate(payment.created_at)}</div>
              </div>
            </Card>
          </div>),
          width: 800
        });
      }
    } catch (error) {
      globalThis.$message.error('获取支付详情失败');
    }
  };

  // 删除支付记录
  const handleDelete = async (record: any) => {
    Modal.confirm({
      title: '确认删除',
      content: '确定要删除这条支付记录吗？删除后无法恢复。',
      onOk: async () => {
        try {
          const response = await API.payment.paymentControllerDeletePayment(record.id);
          if (response.code === 0) {
            globalThis.$message.success('删除成功');
            tableRef.current?.refresh();
          }
        } catch (error) {
          globalThis.$message.error('删除失败');
        }
      }
    });
  };

  // 处理操作事件
  const handleAction = async (name: string, record: any) => {
    switch (name) {
      case 'view':
        await handleView(record);
        break;
      case 'delete':
        await handleDelete(record);
        break;
      default:
        console.warn('未知操作:', name, record);
    }
  };

  // 定义表格列
  const columns = defineColumns([
    {
      title: 'ID',
      dataIndex: 'id',
      sorter: true,
      width: 80
    },
    {
      title: '订单号',
      dataIndex: ['order', 'order_number'],
      searchType: 'Input',
      searchProps: {
        placeholder: '请输入订单号'
      },
      render: (text: string) => (
        <span className="font-mono text-blue-600">{text}</span>
      )
    },
    {
      title: '用户邮箱',
      dataIndex: ['order', 'user', 'email'],
      searchType: 'Input',
      searchProps: {
        placeholder: '请输入用户邮箱'
      },
      render: (text: string) => (
        <span className="text-gray-600">{text}</span>
      )
    },
    {
      title: '支付方式',
      dataIndex: 'payment_method',
      searchType: 'Select',
      searchProps: {
        options: Object.entries(PAYMENT_METHOD_MAP).map(([value, config]) => ({
          label: config.text,
          value
        }))
      },
      render: (method: string) => (
        <Tag color={PAYMENT_METHOD_MAP[method]?.color}>
          {PAYMENT_METHOD_MAP[method]?.text}
        </Tag>
      )
    },
    {
      title: '支付金额',
      dataIndex: 'amount',
      sorter: true,
      searchType: 'InputNumber',
      searchProps: {
        placeholder: '请输入金额',
        style: { width: '100%' }
      },
      render: (amount: number) => (
        <span className="text-green-600 font-semibold">¥{amount.toFixed(2)}</span>
      )
    },
    {
      title: '支付状态',
      dataIndex: ['order', 'payment_status'],
      searchType: 'Select',
      searchProps: {
        options: Object.entries(PAYMENT_STATUS_MAP).map(([value, config]) => ({
          label: config.text,
          value
        }))
      },
      render: (status: string) => (
        <Tag color={PAYMENT_STATUS_MAP[status]?.color}>
          {PAYMENT_STATUS_MAP[status]?.text}
        </Tag>
      )
    },
    {
      title: '支付时间',
      dataIndex: 'paid_at',
      sorter: true,
      searchType: 'DateRange',
      searchProps: {
        placeholder: ['开始日期', '结束日期']
      },
      render: (date: string) => globalThis.$formatDate(date)
    },
    {
      title: '第三方支付ID',
      dataIndex: 'payment_id',
      searchType: 'Input',
      searchProps: {
        placeholder: '请输入支付ID'
      },
      render: (text: string) => text ? (
        <Tooltip title={text}>
          <span className="font-mono text-gray-500 truncate max-w-32 inline-block">
            {text}
          </span>
        </Tooltip>
      ) : <>-</>
    },
    {
      title: '交易凭证号',
      dataIndex: 'transaction_reference',
      searchType: 'Input',
      searchProps: {
        placeholder: '请输入交易凭证号'
      },
      render: (text: string) => text ? (
        <span className="font-mono text-gray-600">{text}</span>
      ) : <>-</>
    },
    {
      title: '创建时间',
      dataIndex: 'created_at',
      sorter: true,
      render: (date: string) => globalThis.$formatDate(date)
    }
  ]);

  // 定义操作按钮
  const actions = [
    {
      name: 'view',
      icon: <EyeOutlined />,
    },
    {
      name: 'delete',
      icon: <DeleteOutlined />,
      text: '删除',
      danger: true,
      collapsed: true
    }
  ];

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="p-6">
      {/* 统计卡片 */}
      {stats && (
        <Row gutter={16} className="mb-6">
          <Col span={6}>
            <Card>
              <Statistic
                title="总支付记录"
                value={stats.total_payments}
                prefix={<DollarOutlined />}
                valueStyle={{ color: '#1890ff' }}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="总支付金额"
                value={stats.total_amount}
                prefix="¥"
                precision={2}
                valueStyle={{ color: '#52c41a' }}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="今日支付"
                value={stats.today_payments}
                prefix={<DollarOutlined />}
                valueStyle={{ color: '#faad14' }}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card>
              <Statistic
                title="今日金额"
                value={stats.today_amount}
                prefix="¥"
                precision={2}
                valueStyle={{ color: '#f5222d' }}
              />
            </Card>
          </Col>
        </Row>
      )}

      {/* 支付记录表格 */}
      <ProTable
        ref={tableRef}
        columns={columns}
        actions={actions}
        handleAction={handleAction}
        request={API.payment.paymentControllerGetPaymentList}
        rowKey="id"
      />
    </div>
  );
}
