import { useState } from 'react';
import { ProTable, defineColumns } from '@/components/ProTable';
import { Tag, Modal, Card, Row, Col, Statistic, Divider, Avatar, Typography, Space } from 'antd';
import { UserOutlined, ShoppingCartOutlined, DollarOutlined, ShoppingOutlined } from '@ant-design/icons';
import { API } from '@/api';

const { Title, Text } = Typography;

export default function AdminCart() {
  const columns = defineColumns([
    {
      title: '用户信息',
      key: 'user_info',
      render: (_, record) => {
        const user = record.user;
        return (
          <div>
            <div style={{ fontWeight: 'bold' }}>
              {user.first_name} {user.last_name}
            </div>
            <div style={{ fontSize: '12px', color: '#666' }}>
              {user.email}
            </div>
            <div style={{ fontSize: '12px', color: '#999' }}>
              ID: {user.id}
            </div>
          </div>
        );
      }
    },
    {
      title: '商品信息',
      key: 'product_info',
      render: (_, record) => {
        const items = record.items || [];
        if (items.length === 0) {
          return <Tag color="default">空购物车</Tag>;
        }
        return (
          <div>
            {items.slice(0, 2).map((item, index) => {
              const product = item.product;
              const media = product?.media?.[0];
              return (
                <div key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
                  {media && (
                    <img
                      src={media.cdn_url || media.local_path}
                      alt={product.name}
                      style={{ width: 40, height: 40, objectFit: 'cover', marginRight: 8, borderRadius: 4 }}
                    />
                  )}
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '12px', fontWeight: 'bold' }}>{product.name}</div>
                    <div style={{ fontSize: '11px', color: '#666' }}>
                      数量: {item.quantity} | ¥{product.price}
                    </div>
                  </div>
                </div>
              );
            })}
            {items.length > 2 && (
              <div style={{ fontSize: '11px', color: '#999' }}>
                还有 {items.length - 2} 个商品...
              </div>
            )}
          </div>
        );
      }
    },
    {
      title: '统计信息',
      key: 'statistics',
      render: (_, record) => {
        const stats = record.statistics;
        return (
          <div>
            <div style={{ fontSize: '12px' }}>
              <Tag color="blue">商品: {stats.total_items}</Tag>
            </div>
            <div style={{ fontSize: '12px' }}>
              <Tag color="green">数量: {stats.total_quantity}</Tag>
            </div>
            <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#e74c3c' }}>
              ¥{stats.total_value.toFixed(2)}
            </div>
          </div>
        );
      }
    },
    {
      title: '创建时间',
      dataIndex: 'created_at',
      render: (date) => globalThis.$formatDate(date),
      sorter: true
    },
    {
      title: '更新时间',
      dataIndex: 'updated_at',
      render: (date) => globalThis.$formatDate(date),
      sorter: true
    }
  ]);

  // 操作按钮
  const actions = [
    {
      name: 'view',
      icon: <UserOutlined />
    }
  ];

  const handleAction = async (name: string, record: any) => {
    switch (name) {
      case 'view':
        // 查看逻辑
        Modal.info({
          title: (
            <Space>
              <ShoppingCartOutlined style={{ color: '#1890ff' }} />
              <span>购物车详情</span>
            </Space>
          ),
          width: 900,
          content: (
            <div style={{ padding: '8px 0' }}>
              {/* 用户信息卡片 */}
              <Card 
                size="small" 
                style={{ marginBottom: 16, background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}
                bodyStyle={{ padding: '16px' }}
              >
                <Row gutter={16} align="middle">
                  <Col>
                    <Avatar size={48} icon={<UserOutlined />} style={{ backgroundColor: 'rgba(255,255,255,0.2)' }} />
                  </Col>
                  <Col flex={1}>
                    <Title level={4} style={{ color: 'white', margin: 0 }}>
                      {record.user.first_name} {record.user.last_name}
                    </Title>
                    <Text style={{ color: 'rgba(255,255,255,0.8)' }}>
                      {record.user.email}
                    </Text>
                    <br />
                    <Text style={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px' }}>
                      用户ID: {record.user.id}
                    </Text>
                  </Col>
                </Row>
              </Card>

              {/* 购物车统计信息 */}
              <Card size="small" style={{ marginBottom: 16 }}>
                <Title level={5} style={{ marginBottom: 16 }}>
                  <ShoppingCartOutlined style={{ marginRight: 8, color: '#1890ff' }} />
                  购物车统计
                </Title>
                <Row gutter={16}>
                  <Col span={6}>
                    <Statistic
                      title="购物车ID"
                      value={record.id}
                      prefix={<ShoppingCartOutlined />}
                    />
                  </Col>
                  <Col span={6}>
                    <Statistic
                      title="商品种类"
                      value={record.statistics.total_items}
                      prefix={<ShoppingOutlined />}
                    />
                  </Col>
                  <Col span={6}>
                    <Statistic
                      title="商品总数量"
                      value={record.statistics.total_quantity}
                    />
                  </Col>
                  <Col span={6}>
                    <Statistic
                      title="总价值"
                      value={record.statistics.total_value}
                      precision={2}
                      prefix="¥"
                      valueStyle={{ color: '#e74c3c' }}
                    />
                  </Col>
                </Row>
              </Card>

              {/* 商品列表 */}
              <Card size="small">
                <Title level={5} style={{ marginBottom: 16 }}>
                  <ShoppingOutlined style={{ marginRight: 8, color: '#52c41a' }} />
                  商品列表 ({record.items.length} 件商品)
                </Title>
                <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                  {record.items.map((item, index) => {
                    const product = item.product;
                    const media = product?.media?.[0];
                    const subtotal = item.quantity * product.price;
                    
                    return (
                      <Card
                        key={index}
                        size="small"
                        style={{ 
                          marginBottom: 12, 
                          border: '1px solid #f0f0f0',
                          borderRadius: '8px',
                          transition: 'all 0.3s ease'
                        }}
                        bodyStyle={{ padding: '12px' }}
                        hoverable
                      >
                        <Row gutter={12} align="middle">
                          <Col>
                            {media ? (
                              <img
                                src={media.cdn_url || media.local_path}
                                alt={product.name}
                                style={{
                                  width: 60,
                                  height: 60,
                                  objectFit: 'cover',
                                  borderRadius: '6px',
                                  border: '1px solid #f0f0f0'
                                }}
                              />
                            ) : (
                              <div
                                style={{
                                  width: 60,
                                  height: 60,
                                  backgroundColor: '#f5f5f5',
                                  borderRadius: '6px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  color: '#999'
                                }}
                              >
                                无图片
                              </div>
                            )}
                          </Col>
                          <Col flex={1}>
                            <div style={{ marginBottom: 8 }}>
                              <Title level={5} style={{ margin: 0, fontSize: '14px' }}>
                                {product.name}
                              </Title>
                              <Text type="secondary" style={{ fontSize: '12px' }}>
                                SKU: {product.sku || '-'}
                              </Text>
                            </div>
                            <Row gutter={8}>
                              <Col>
                                <Tag color="blue">数量: {item.quantity}</Tag>
                              </Col>
                              <Col>
                                <Tag color="green">单价: ¥{product.price}</Tag>
                              </Col>
                              <Col>
                                <Tag color="red">小计: ¥{subtotal.toFixed(2)}</Tag>
                              </Col>
                            </Row>
                            <div style={{ marginTop: 4 }}>
                              <Text type="secondary" style={{ fontSize: '11px' }}>
                                库存: {product.stock} 件 | 状态: 
                                <Tag 
                                  color={product.status === 'ACTIVE' ? 'green' : 'red'} 
                                  style={{ marginLeft: 4 }}
                                >
                                  {product.status === 'ACTIVE' ? '正常' : '已下架'}
                                </Tag>
                              </Text>
                            </div>
                          </Col>
                        </Row>
                      </Card>
                    );
                  })}
                </div>
              </Card>
            </div>
          )
        });
        break;
    }
  };

  return (
    <ProTable
      columns={columns}
      actions={actions}
      request={API.adminCart.adminCartControllerGetAllCarts}
      rowKey="id"
      handleAction={handleAction}
    />
  );
}
