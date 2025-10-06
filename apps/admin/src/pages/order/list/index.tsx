import { useState, useEffect, useRef } from 'react';
import { ProTable, defineColumns, ProTableRef } from '@/components/ProTable';
import { Tag, Modal, Statistic, Row, Col, Card, Button, Space } from 'antd';
import { EditOutlined, DeleteOutlined, EyeOutlined, PlusOutlined, UserOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { API } from '@/api';
import { useFormModal } from '@/hooks/useFormModal';
import { defineSchemas } from '@/components/ProForm';

// 订单状态映射
const ORDER_STATUS_MAP = {
  PENDING: { text: '待付款', color: 'orange' },
  PAID: { text: '已付款', color: 'blue' },
  PROCESSING: { text: '处理中', color: 'purple' },
  SHIPPED: { text: '已发货', color: 'cyan' },
  DELIVERED: { text: '已送达', color: 'green' },
  COMPLETED: { text: '已完成', color: 'success' },
  CANCELLED: { text: '已取消', color: 'red' },
  REFUNDED: { text: '已退款', color: 'default' },
};

// 支付状态映射
const PAYMENT_STATUS_MAP = {
  PENDING: { text: '待支付', color: 'orange' },
  PAID: { text: '已支付', color: 'green' },
  FAILED: { text: '支付失败', color: 'red' },
  REFUNDED: { text: '已退款', color: 'default' },
  CANCELLED: { text: '已取消', color: 'red' },
};

export default function Order() {
  const [stats, setStats] = useState(null);
  const showFormModal = useFormModal();
  const tableRef = useRef<ProTableRef>(null);

  // 获取订单统计
  const fetchStats = async () => {
    try {
      const response = await API.order.orderControllerGetOrderStats();
      if (response.code === 0) {
        setStats(response.data);
      }
    } catch (error) {
      console.error('获取订单统计失败:', error);
    }
  };

  // 验证用户邮箱
  const validateUserEmail = async (email: string) => {
    try {
      const response = await API.users.userManagementControllerGetUserByEmail(email);
      if (response.code === 0) {
        return response.data;
      }
      return null;
    } catch (error) {
      console.error('验证用户邮箱失败:', error);
      return null;
    }
  };

  // 验证产品SKU
  const validateProductSku = async (sku: string) => {
    try {
      const response = await API.product.productControllerGetProductBySku(sku);
      if (response.code === 0) {
        return response.data;
      }
      return null;
    } catch (error) {
      console.error('验证产品SKU失败:', error);
      return null;
    }
  };

  // 更新订单状态
  const handleUpdateOrder = async (order: any, values: any) => {
    try {
      const updateData: any = {};
      
      if (values.status && values.status !== order.status) {
        updateData.status = values.status;
      }
      
      if (values.payment_status && values.payment_status !== order.payment_status) {
        updateData.payment_status = values.payment_status;
      }
      
      if (values.payment_id) {
        updateData.payment_id = values.payment_id;
      }
      
      if (values.tracking_number) {
        updateData.tracking_number = values.tracking_number;
      }
      
      if (values.shipping_method) {
        updateData.shipping_method = values.shipping_method;
      }
      
      if (values.admin_notes) {
        updateData.admin_notes = values.admin_notes;
      }

      // 根据状态设置相应的时间字段
      if (values.status === 'PAID' && order.status !== 'PAID') {
        updateData.paid_at = new Date().toISOString();
      }
      
      if (values.status === 'SHIPPED' && order.status !== 'SHIPPED') {
        updateData.shipped_at = new Date().toISOString();
      }
      
      if (values.status === 'DELIVERED' && order.status !== 'DELIVERED') {
        updateData.delivered_at = new Date().toISOString();
      }

      const response = await API.order.orderControllerUpdateOrder(order.id, updateData);
      
      if (response.code === 0) {
        globalThis.$message.success('订单更新成功');
        fetchStats();
        tableRef.current?.refresh();
        return true;
      } else {
        globalThis.$message.error(response.message || '更新失败');
        return false;
      }
    } catch (error) {
      globalThis.$message.error('更新订单失败');
      return false;
    }
  };

  // 代用户下单schemas
  const createOrderSchemas = defineSchemas([
    {
      name: 'user_email',
      label: '用户邮箱',
      component: 'Input',
      componentProps: {
        placeholder: '请输入用户邮箱地址',
        type: 'email'
      },
      rules: [
        { required: true, message: '请输入用户邮箱' },
        { type: 'email', message: '请输入有效的邮箱地址' },
        {
          validator: async (_, value) => {
            if (!value) return Promise.resolve();
            const user = await validateUserEmail(value);
            if (!user) {
              return Promise.reject(new Error('用户不存在，请检查邮箱地址'));
            }
            return Promise.resolve();
          }
        }
      ]
    },
    {
      name: 'items',
      label: '商品列表',
      component: 'Textarea',
      componentProps: {
        placeholder: '请输入商品信息，格式：SKU:数量，多个商品用换行分隔\n例如：\nPROD-001:2\nPROD-002:1',
        rows: 6
      },
      rules: [
        { required: true, message: '请输入商品信息' },
        {
          validator: async (_, value) => {
            if (!value) return Promise.resolve();
            const lines = value.split('\n').filter(line => line.trim());
            for (const line of lines) {
              const [sku, quantity] = line.split(':').map(s => s.trim());
              if (!sku || !quantity || isNaN(parseInt(quantity))) {
                return Promise.reject(new Error('商品格式错误，请使用 SKU:数量 格式'));
              }
              const product = await validateProductSku(sku);
              if (!product) {
                return Promise.reject(new Error(`SKU "${sku}" 不存在，请检查商品SKU`));
              }
            }
            return Promise.resolve();
          }
        }
      ]
    },
    {
      name: 'shipping_name',
      label: '收货人姓名',
      component: 'Input',
      componentProps: {
        placeholder: '请输入收货人姓名'
      },
      rules: [{ required: true, message: '请输入收货人姓名' }]
    },
    {
      name: 'shipping_phone',
      label: '收货人电话',
      component: 'Input',
      componentProps: {
        placeholder: '请输入收货人电话'
      },
      rules: [{ required: true, message: '请输入收货人电话' }]
    },
    {
      name: 'shipping_company',
      label: '公司名称',
      component: 'Input',
      componentProps: {
        placeholder: '请输入公司名称（可选）'
      }
    },
    {
      name: 'shipping_country',
      label: '国家',
      component: 'Input',
      componentProps: {
        placeholder: '请输入国家代码，如：CN'
      },
      rules: [{ required: true, message: '请输入国家' }]
    },
    {
      name: 'shipping_province',
      label: '省/州',
      component: 'Input',
      componentProps: {
        placeholder: '请输入省/州'
      },
      rules: [{ required: true, message: '请输入省/州' }]
    },
    {
      name: 'shipping_city',
      label: '城市',
      component: 'Input',
      componentProps: {
        placeholder: '请输入城市'
      },
      rules: [{ required: true, message: '请输入城市' }]
    },
    {
      name: 'shipping_district',
      label: '区/县',
      component: 'Input',
      componentProps: {
        placeholder: '请输入区/县（可选）'
      }
    },
    {
      name: 'shipping_postal_code',
      label: '邮政编码',
      component: 'Input',
      componentProps: {
        placeholder: '请输入邮政编码（可选）'
      }
    },
    {
      name: 'shipping_address_line_1',
      label: '详细地址',
      component: 'Input',
      componentProps: {
        placeholder: '请输入详细地址'
      },
      rules: [{ required: true, message: '请输入详细地址' }]
    },
    {
      name: 'shipping_address_line_2',
      label: '地址第二行',
      component: 'Input',
      componentProps: {
        placeholder: '请输入地址第二行（可选）'
      }
    },
    {
      name: 'shipping_address_line_3',
      label: '地址第三行',
      component: 'Input',
      componentProps: {
        placeholder: '请输入地址第三行（可选）'
      }
    },
    {
      name: 'customer_notes',
      label: '管理员备注',
      component: 'Textarea',
      componentProps: {
        placeholder: '请输入管理员备注（可选）',
      }
    }
  ]);

  // 订单状态更新schemas
  const schemas = defineSchemas([
    {
      name: 'status',
      label: '订单状态',
      component: 'Select',
      componentProps: {
        placeholder: '请选择订单状态',
        options: Object.entries(ORDER_STATUS_MAP).map(([key, value]) => ({
          label: value.text,
          value: key
        }))
      },
      rules: [{ required: true, message: '请选择订单状态' }]
    },
    {
      name: 'payment_status',
      label: '支付状态',
      component: 'Select',
      componentProps: {
        placeholder: '请选择支付状态',
        options: Object.entries(PAYMENT_STATUS_MAP).map(([key, value]) => ({
          label: value.text,
          value: key
        }))
      },
      rules: [{ required: true, message: '请选择支付状态' }]
    },
    {
      name: 'payment_id',
      label: '第三方支付ID',
      component: 'Input',
      componentProps: {
        placeholder: '请输入第三方支付ID'
      }
    },
    {
      name: 'shipping_method',
      label: '物流方式',
      component: 'Input',
      componentProps: {
        placeholder: '请输入物流方式'
      }
    },
    {
      name: 'tracking_number',
      label: '物流单号',
      component: 'Input',
      componentProps: {
        placeholder: '请输入物流单号'
      }
    },
    {
      name: 'admin_notes',
      label: '管理员备注',
      component: 'Input',
      componentProps: {
        placeholder: '请输入管理员备注',
        maxLength: 500,
        showCount: true,
        type: 'textarea',
      }
    }
  ])

  // 确认线下支付
  const handleConfirmPayment = async (order: any, values: any) => {
    try {
      const paymentData = {
        payment_method: values.payment_method,
        amount: parseFloat(values.amount),
        payment_id: values.payment_id,
        paid_at: values.paid_at,
        payment_notes: values.payment_notes,
        transaction_reference: values.transaction_reference,
        bank_name: values.bank_name,
        account_last_four: values.account_last_four
      };

      const response = await API.order.orderControllerConfirmOfflinePayment(order.id, paymentData);
      
      if (response.code === 0) {
        globalThis.$message.success('支付确认成功');
        fetchStats();
        tableRef.current?.refresh();
        return true;
      } else {
        globalThis.$message.error(response.message || '支付确认失败');
        return false;
      }
    } catch (error) {
      globalThis.$message.error('支付确认失败');
      return false;
    }
  };

  // 支付确认schemas
  const getPaymentConfirmSchemas = (order: any) => defineSchemas([
    {
      name: 'payment_method',
      label: '支付方式',
      component: 'Select',
      componentProps: {
        placeholder: '请选择支付方式',
        options: [
          { label: '现金', value: 'CASH' },
          { label: '银行转账', value: 'BANK_TRANSFER' },
          { label: '电汇', value: 'WIRE_TRANSFER' },
          { label: '支票', value: 'CHECK' },
          { label: 'Stripe', value: 'STRIPE' },
          { label: 'PayPal', value: 'PAYPAL' },
          { label: '支付宝', value: 'ALIPAY' },
          { label: '微信支付', value: 'WECHAT_PAY' },
          { label: '其他', value: 'OTHER' }
        ]
      },
      rules: [{ required: true, message: '请选择支付方式' }]
    },
    {
      name: 'amount',
      label: '支付金额',
      component: 'Input',
      componentProps: {
        placeholder: '请输入支付金额',
        type: 'number',
        step: 0.01
      },
      rules: [
        { required: true, message: '请输入支付金额' },
        { 
          validator: (_, value) => {
            if (value && Math.abs(value - parseFloat(order.total_amount)) > 0.01) {
              return Promise.reject(new Error(`支付金额与订单金额 ${order.total_amount} 不匹配`));
            }
            return Promise.resolve();
          }
        }
      ]
    },
    {
      name: 'payment_id',
      label: '第三方支付ID',
      component: 'Input',
      componentProps: {
        placeholder: '请输入第三方支付ID（如Stripe Payment Intent ID）'
      }
    },
    {
      name: 'paid_at',
      label: '支付时间',
      component: 'Input',
      componentProps: {
        type: 'datetime-local'
      },
      rules: [{ required: true, message: '请选择支付时间' }]
    },
    {
      name: 'payment_notes',
      label: '支付备注',
      component: 'Textarea',
      componentProps: {
        placeholder: '请输入支付备注（如银行转账交易号）',
        rows: 3
      }
    },
    {
      name: 'transaction_reference',
      label: '交易凭证号',
      component: 'Input',
      componentProps: {
        placeholder: '请输入交易凭证号'
      }
    },
    {
      name: 'bank_name',
      label: '银行名称',
      component: 'Input',
      componentProps: {
        placeholder: '请输入银行名称（银行转账时使用）'
      }
    },
    {
      name: 'account_last_four',
      label: '账户后四位',
      component: 'Input',
      componentProps: {
        placeholder: '请输入账户后四位（银行转账时使用）',
        maxLength: 4
      }
    }
  ]);

  // 代用户下单
  const handleCreateOrderForUser = async (values: any) => {
    try {
      // 验证用户邮箱
      const user = await validateUserEmail(values.user_email);
      if (!user) {
        globalThis.$message.error('用户不存在，请检查邮箱地址');
        return false;
      }

      // 解析商品列表并验证SKU
      const items = [];
      const lines = values.items.split('\n').filter((line: string) => line.trim());
      
      for (const line of lines) {
        const [sku, quantity] = line.split(':').map(s => s.trim());
        const product = await validateProductSku(sku);
        if (!product) {
          globalThis.$message.error(`SKU "${sku}" 不存在，请检查商品SKU`);
          return false;
        }
        items.push({
          product_id: product.id,
          quantity: parseInt(quantity)
        });
      }

      const orderData = {
        user_id: user.id,
        items: items,
        shipping_address: {
          name: values.shipping_name,
          phone: values.shipping_phone,
          company: values.shipping_company,
          country: values.shipping_country,
          province: values.shipping_province,
          city: values.shipping_city,
          district: values.shipping_district,
          postal_code: values.shipping_postal_code,
          address_line_1: values.shipping_address_line_1,
          address_line_2: values.shipping_address_line_2,
          address_line_3: values.shipping_address_line_3,
        },
        customer_notes: values.admin_notes || '管理员代下单'
      };

      const response = await API.order.orderControllerCreateOrder(orderData);
      
      if (response.code === 0) {
        globalThis.$message.success(`代用户下单成功！订单号：${response.data.order_number}`);
        fetchStats();
        tableRef.current?.refresh();
        return true;
      } else {
        globalThis.$message.error(response.message || '下单失败');
        return false;
      }
    } catch (error) {
      globalThis.$message.error('代用户下单失败');
      return false;
    }
  };

  useEffect(() => {
    fetchStats();
  }, [])

  // 表格列定义
  const columns = defineColumns([
    {
      title: '订单号',
      dataIndex: 'order_number',
      key: 'order_number',
      render: (text) => (
        <div className='flex items-center space-x-2'>
          <div className='w-2 h-2 bg-blue-500 rounded-full'></div>
          <span className='font-mono font-semibold text-gray-900 text-sm'>
            {text}
          </span>
        </div>
      ),
      searchType: 'Input'
    },
    {
      title: '用户信息',
      key: 'user_info',
      render: (_, record) => (
        <div className='flex items-center space-x-3'>
          <div className='w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm'>
            {(record.user?.username || record.user?.email || 'U').charAt(0).toUpperCase()}
          </div>
          <div>
            <div className='font-medium text-gray-900 text-sm'>
              {record.user?.username || record.user?.email}
            </div>
            <div className='text-xs text-gray-500'>
              {record.user?.first_name} {record.user?.last_name}
            </div>
          </div>
        </div>
      ),
    },
    {
      title: '订单状态',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        const statusInfo = ORDER_STATUS_MAP[status] || { text: status, color: 'default' };
        const colorMap = {
          'orange': 'bg-orange-100 text-orange-800 border-orange-200',
          'blue': 'bg-blue-100 text-blue-800 border-blue-200',
          'purple': 'bg-purple-100 text-purple-800 border-purple-200',
          'cyan': 'bg-cyan-100 text-cyan-800 border-cyan-200',
          'green': 'bg-green-100 text-green-800 border-green-200',
          'red': 'bg-red-100 text-red-800 border-red-200',
          'default': 'bg-gray-100 text-gray-800 border-gray-200'
        };
        return (
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${colorMap[statusInfo.color] || colorMap.default}`}>
            {statusInfo.text}
          </span>
        );
      },
      searchType: 'Select',
      searchProps: {
        options: Object.entries(ORDER_STATUS_MAP).map(([key, value]) => ({ label: value.text, value: key })),
      },
    },
    {
      title: '支付状态',
      dataIndex: 'payment_status',
      key: 'payment_status',
      render: (status) => {
        const statusInfo = PAYMENT_STATUS_MAP[status] || { text: status, color: 'default' };
        const colorMap = {
          'orange': 'bg-orange-100 text-orange-800 border-orange-200',
          'green': 'bg-green-100 text-green-800 border-green-200',
          'red': 'bg-red-100 text-red-800 border-red-200',
          'default': 'bg-gray-100 text-gray-800 border-gray-200'
        };
        return (
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${colorMap[statusInfo.color] || colorMap.default}`}>
            {statusInfo.text}
          </span>
        );
      },
      searchType: 'Select',
      searchProps: {
        options: Object.entries(PAYMENT_STATUS_MAP).map(([key, value]) => ({ label: value.text, value: key })),
      },
    },
    {
      title: '订单金额',
      key: 'amount',
      render: (_, record) => (
        <div className='text-right'>
          <div className='text-lg font-bold text-gray-900'>
            ¥{record.total_amount}
          </div>
          <div className='text-xs text-gray-500 space-y-1'>
            <div>商品: ¥{record.subtotal}</div>
            {record.shipping_fee > 0 && (
              <div>运费: ¥{record.shipping_fee}</div>
            )}
          </div>
        </div>
      )
    },
    {
      title: '收货地址',
      key: 'shipping_address',
      render: (_, record) => {
        const addr = record.shipping_address;
        if (!addr) return <span className='text-gray-400'>-</span>;
        return (
          <div className='text-sm'>
            <div className='font-medium text-gray-900 mb-1'>
              {addr.name} {addr.phone}
            </div>
            <div className='text-gray-600 space-y-1'>
              <div>{addr.address_line_1}</div>
              {addr.address_line_2 && <div>{addr.address_line_2}</div>}
              <div className='text-xs text-gray-500'>
                {addr.city}, {addr.province}, {addr.country}
              </div>
            </div>
          </div>
        );
      },
    },
    {
      title: '商品数量',
      key: 'item_count',
      render: (_, record) => (
        <div className='text-center'>
          <div className='inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-medium'>
            {record.items?.length || 0} 件
          </div>
        </div>
      ),
    },
    {
      title: '创建时间',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (text) => (
        <div className='text-sm text-gray-600'>
          {globalThis.$formatDate(text)}
        </div>
      )
    },
  ]);

  // 操作按钮
  const actions = [
    {
      name: 'view',
      icon: <EyeOutlined />,
      text: '查看详情',
      collapsed: true
    },
    {
      name: 'update',
      icon: <EditOutlined />,
      text: '编辑订单',
      collapsed: true
    },
    {
      name: 'confirm_payment',
      icon: <CheckCircleOutlined />,
      text: '确认支付',
      hide: (record) => record.status !== 'PENDING' || record.payment_status !== 'PENDING',
      collapsed: true
    },
    {
      name: 'cancel',
      icon: <DeleteOutlined />,
      text: '取消订单',
      danger: true,
      hide: (record) => record.status !== 'PENDING',
      collapsed: true
    },
  ];

  // 处理操作
  const handleAction = async (name: string, record: any) => {
    switch (name) {
      case 'view':
        Modal.info({
          title: (
            <div className='flex items-center space-x-3'>
              <div className='w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center'>
                <EyeOutlined className='text-blue-600' />
              </div>
              <div>
                <div className='text-lg font-semibold text-gray-900'>订单详情</div>
                <div className='text-sm text-gray-500 font-mono'>{record.order_number}</div>
              </div>
            </div>
          ),
          width: 900,
          content: (
            <div className='space-y-6'>
              {/* 基本信息 */}
              <div className='bg-gray-50 rounded-lg p-4'>
                <h4 className='text-lg font-semibold text-gray-900 mb-4 flex items-center'>
                  <div className='w-1 h-6 bg-blue-500 rounded-full mr-3'></div>
                  基本信息
                </h4>
                <div className='grid grid-cols-2 gap-4'>
                  <div className='space-y-3'>
                    <div className='flex justify-between'>
                      <span className='text-gray-600'>订单号:</span>
                      <span className='font-mono font-semibold text-gray-900'>{record.order_number}</span>
                    </div>
                    <div className='flex justify-between'>
                      <span className='text-gray-600'>订单状态:</span>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        record.status === 'PENDING' ? 'bg-orange-100 text-orange-800' :
                        record.status === 'PAID' ? 'bg-blue-100 text-blue-800' :
                        record.status === 'COMPLETED' ? 'bg-green-100 text-green-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {ORDER_STATUS_MAP[record.status]?.text}
                      </span>
                    </div>
                  </div>
                  <div className='space-y-3'>
                    <div className='flex justify-between'>
                      <span className='text-gray-600'>支付状态:</span>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        record.payment_status === 'PENDING' ? 'bg-orange-100 text-orange-800' :
                        record.payment_status === 'PAID' ? 'bg-green-100 text-green-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {PAYMENT_STATUS_MAP[record.payment_status]?.text}
                      </span>
                    </div>
                    <div className='flex justify-between'>
                      <span className='text-gray-600'>总金额:</span>
                      <span className='text-lg font-bold text-green-600'>¥{record.total_amount}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* 收货信息 */}
              <div className='bg-gray-50 rounded-lg p-4'>
                <h4 className='text-lg font-semibold text-gray-900 mb-4 flex items-center'>
                  <div className='w-1 h-6 bg-green-500 rounded-full mr-3'></div>
                  收货信息
                </h4>
                <div className='space-y-3'>
                  <div className='flex justify-between'>
                    <span className='text-gray-600'>收货人:</span>
                    <span className='font-medium text-gray-900'>{record.shipping_address?.name}</span>
                  </div>
                  <div className='flex justify-between'>
                    <span className='text-gray-600'>电话:</span>
                    <span className='font-medium text-gray-900'>{record.shipping_address?.phone}</span>
                  </div>
                  <div className='space-y-2'>
                    <span className='text-gray-600 block'>地址:</span>
                    <div className='bg-white rounded-lg p-3 border border-gray-200'>
                      <div className='text-gray-900'>{record.shipping_address?.address_line_1}</div>
                      {record.shipping_address?.address_line_2 && (
                        <div className='text-gray-700 mt-1'>{record.shipping_address.address_line_2}</div>
                      )}
                      <div className='text-sm text-gray-500 mt-2'>
                        {record.shipping_address?.city}, {record.shipping_address?.province}, {record.shipping_address?.country}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 商品信息 */}
              <div className='bg-gray-50 rounded-lg p-4'>
                <h4 className='text-lg font-semibold text-gray-900 mb-4 flex items-center'>
                  <div className='w-1 h-6 bg-purple-500 rounded-full mr-3'></div>
                  商品信息
                </h4>
                <div className='space-y-3'>
                  {record.items?.map((item, index) => (
                    <div key={index} className='bg-white rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow'>
                      <div className='flex justify-between items-start'>
                        <div className='flex-1'>
                          <h5 className='font-medium text-gray-900 mb-2'>
                            {item.product_snapshot?.name || item.product?.name}
                          </h5>
                          <div className='grid grid-cols-3 gap-4 text-sm text-gray-600'>
                            <div>
                              <span className='text-gray-500'>数量:</span>
                              <span className='ml-2 font-medium'>{item.quantity}</span>
                            </div>
                            <div>
                              <span className='text-gray-500'>单价:</span>
                              <span className='ml-2 font-medium'>¥{item.unit_price}</span>
                            </div>
                            <div>
                              <span className='text-gray-500'>小计:</span>
                              <span className='ml-2 font-bold text-green-600'>¥{item.total_price}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ),
        });
        break;
      case 'update':
        showFormModal({
          title: `更新订单状态 - ${record.order_number}`,
          schemas: schemas,
          initialValues: {
            status: record.status,
            payment_status: record.payment_status,
            payment_id: record.payment_id,
            tracking_number: record.tracking_number,
            shipping_method: record.shipping_method,
            customer_notes: record.admin_notes,
          },
          onOk: async (values) => {
            return await handleUpdateOrder(record, values);
          },
          width: 600,
        });
        break;
      case 'confirm_payment':
        showFormModal({
          title: `确认线下支付 - ${record.order_number}`,
          schemas: getPaymentConfirmSchemas(record),
          initialValues: {
            amount: record.total_amount,
            paid_at: new Date().toISOString().slice(0, 16) // 当前时间，格式为 YYYY-MM-DDTHH:mm
          },
          onOk: async (values) => {
            return await handleConfirmPayment(record, values);
          },
          width: 600,
          okText: '确认支付',
          cancelText: '取消'
        });
        break;
      case 'cancel':
        Modal.confirm({
          title: '确认取消订单',
          content: `确定要取消订单 ${record.order_number} 吗？`,
          onOk: async () => {
            try {
              const response = await API.order.orderControllerCancelOrder(record.id);
              if (response.code === 0) {
                globalThis.$message.success('订单取消成功');
                fetchStats();
                tableRef.current?.refresh();
              }
            } catch (error) {
              globalThis.$message.error('取消订单失败');
            }
          },
        });
        break;
      default:
        console.warn('未知操作:', name, record);
    }
  };

  // 统计卡片
  const StatsPanel = () => {
    if (!stats) return null;
    
    const statCards = [
      {
        title: '总订单数',
        value: stats.total_orders,
        icon: '📊',
        color: 'blue',
        bgColor: 'bg-blue-50',
        borderColor: 'border-blue-200',
        textColor: 'text-blue-600'
      },
      {
        title: '总金额',
        value: `¥${stats.total_amount?.toFixed(2) || '0.00'}`,
        icon: '💰',
        color: 'green',
        bgColor: 'bg-green-50',
        borderColor: 'border-green-200',
        textColor: 'text-green-600'
      },
      {
        title: '待付款',
        value: stats.pending_orders,
        icon: '⏳',
        color: 'orange',
        bgColor: 'bg-orange-50',
        borderColor: 'border-orange-200',
        textColor: 'text-orange-600'
      },
      {
        title: '已完成',
        value: stats.completed_orders,
        icon: '✅',
        color: 'emerald',
        bgColor: 'bg-emerald-50',
        borderColor: 'border-emerald-200',
        textColor: 'text-emerald-600'
      }
    ];
    
    return (
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
        {statCards.map((card, index) => (
          <div
            key={index}
            className={`${card.bgColor} ${card.borderColor} border rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}
          >
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm font-medium text-gray-600 mb-2'>{card.title}</p>
                <p className={`text-3xl font-bold ${card.textColor}`}>{card.value}</p>
              </div>
              <div className={`text-4xl opacity-20`}>
                {card.icon}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className='flex flex-col gap-4'>
      {/* 统计卡片 */}
      <div>
        <StatsPanel />
      </div>

      {/* 订单表格 */}
      <div>
        <ProTable
          columns={columns}
          actions={actions}
          handleAction={handleAction}
          rowKey="id"
          request={API.order.orderControllerGetOrders}
          className='bg-white rounded-lg shadow-sm border border-gray-200'
          ref={tableRef}
          toolBar={
            <Button
              type="primary"
              icon={<PlusOutlined />}
              className='bg-blue-600 hover:bg-blue-700 border-blue-600 hover:border-blue-700 shadow-lg'
              onClick={() => {
                showFormModal({
                  title: '代用户下单',
                  schemas: createOrderSchemas,
                  onOk: async (values) => {
                    return await handleCreateOrderForUser(values);
                  },
                  width: 800,
                  okText: '创建订单',
                  cancelText: '取消'
                });
              }}
            >
              代用户下单
            </Button>
          }
        />
      </div>
    </div>
  );
}