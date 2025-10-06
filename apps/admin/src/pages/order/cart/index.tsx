import { useState, useEffect } from 'react';
import { ProTable, defineColumns } from '@/components/ProTable';
import { Button, Tag, Modal, Card, Row, Col, Statistic, InputNumber } from 'antd';
import { DeleteOutlined, ShoppingCartOutlined, PlusOutlined, MinusOutlined } from '@ant-design/icons';
import { API } from '@/api';

export default function Cart() {
  const [loading, setLoading] = useState(false);
  const [cartData, setCartData] = useState(null);
  const [itemCount, setItemCount] = useState(0);

  // 获取购物车数据
  const fetchCart = async () => {
    setLoading(true);
    try {
      const response = await API.cart.cartControllerGetCart();
      if (response.code === 0) {
        setCartData(response.data);
        // 计算商品总数量
        const totalCount = response.data?.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;
        setItemCount(totalCount);
      }
    } catch (error) {
      globalThis.$message.error('获取购物车失败');
    } finally {
      setLoading(false);
    }
  };

  // 获取购物车商品数量
  const fetchCartCount = async () => {
    try {
      const response = await API.cart.cartControllerGetCartItemCount();
      if (response.code === 0) {
        setItemCount(response.data.count);
      }
    } catch (error) {
      console.error('获取购物车数量失败:', error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // 更新商品数量
  const updateQuantity = async (productId, newQuantity) => {
    try {
      const response = await API.cart.cartControllerUpdateCartItem(productId, { quantity: newQuantity });
      if (response.code === 0) {
        globalThis.$message.success('数量更新成功');
        fetchCart();
        fetchCartCount();
      }
    } catch (error) {
      globalThis.$message.error('更新数量失败');
    }
  };

  // 移除商品
  const removeItem = async (productId) => {
    Modal.confirm({
      title: '确认移除商品',
      content: '确定要从购物车中移除此商品吗？',
      onOk: async () => {
        try {
          const response = await API.cart.cartControllerRemoveFromCart(productId);
          if (response.code === 0) {
            globalThis.$message.success('商品移除成功');
            fetchCart();
            fetchCartCount();
          }
        } catch (error) {
          globalThis.$message.error('移除商品失败');
        }
      },
    });
  };

  // 清空购物车
  const clearCart = async () => {
    Modal.confirm({
      title: '确认清空购物车',
      content: '确定要清空购物车吗？此操作不可恢复。',
      onOk: async () => {
        try {
          const response = await API.cart.cartControllerClearCart();
          if (response.code === 0) {
            globalThis.$message.success('购物车已清空');
            fetchCart();
            fetchCartCount();
          }
        } catch (error) {
          globalThis.$message.error('清空购物车失败');
        }
      },
    });
  };

  // 表格列定义
  const columns = defineColumns([
    {
      title: '商品信息',
      key: 'product_info',
      width: 300,
      render: (_, record) => {
        const product = record.product;
        const media = product?.media?.[0];
        return (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {media && (
              <img
                src={media.cdn_url || media.local_path}
                alt={product.name}
                style={{ width: 60, height: 60, objectFit: 'cover', marginRight: 12, borderRadius: 4 }}
              />
            )}
            <div>
              <div style={{ fontWeight: 'bold', marginBottom: 4 }}>{product.name}</div>
              <div style={{ fontSize: '12px', color: '#666' }}>
                SKU: {product.sku || '-'}
              </div>
              <div style={{ fontSize: '12px', color: '#666' }}>
                库存: {product.stock} 件
              </div>
            </div>
          </div>
        );
      },
    },
    {
      title: '单价',
      key: 'unit_price',
      width: 100,
      render: (_, record) => {
        const product = record.product;
        return (
          <div>
            <div style={{ fontWeight: 'bold', color: '#e74c3c' }}>
              ¥{product.price}
            </div>
            {product.original_price && product.original_price > product.price && (
              <div style={{ fontSize: '12px', color: '#999', textDecoration: 'line-through' }}>
                ¥{product.original_price}
              </div>
            )}
          </div>
        );
      },
    },
    {
      title: '数量',
      key: 'quantity',
      width: 120,
      render: (_, record) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Button
            size="small"
            icon={<MinusOutlined />}
            onClick={() => {
              if (record.quantity > 1) {
                updateQuantity(record.product_id, record.quantity - 1);
              }
            }}
            disabled={record.quantity <= 1}
          />
          <InputNumber
            min={1}
            max={record.product.stock}
            value={record.quantity}
            onChange={(value) => {
              if (value && value !== record.quantity) {
                updateQuantity(record.product_id, value);
              }
            }}
            style={{ width: 60 }}
          />
          <Button
            size="small"
            icon={<PlusOutlined />}
            onClick={() => {
              if (record.quantity < record.product.stock) {
                updateQuantity(record.product_id, record.quantity + 1);
              }
            }}
            disabled={record.quantity >= record.product.stock}
          />
        </div>
      ),
    },
    {
      title: '小计',
      key: 'subtotal',
      width: 100,
      render: (_, record) => {
        const subtotal = Number(record.product.price) * record.quantity;
        return (
          <div style={{ fontWeight: 'bold', color: '#e74c3c' }}>
            ¥{subtotal.toFixed(2)}
          </div>
        );
      },
    },
    {
      title: '状态',
      key: 'status',
      width: 100,
      render: (_, record) => {
        const product = record.product;
        if (product.status !== 'ACTIVE') {
          return <Tag color="red">商品已下架</Tag>;
        }
        if (product.stock < record.quantity) {
          return <Tag color="orange">库存不足</Tag>;
        }
        return <Tag color="green">正常</Tag>;
      },
    },
    {
      title: '操作',
      key: 'actions',
      width: 100,
      render: (_, record) => (
        <Button
          type="text"
          danger
          icon={<DeleteOutlined />}
          onClick={() => removeItem(record.product_id)}
        >
          移除
        </Button>
      ),
    },
  ]);

  // 计算总金额
  const calculateTotal = () => {
    if (!cartData?.items) return 0;
    return cartData.items.reduce((total, item) => {
      return total + (Number(item.product.price) * item.quantity);
    }, 0);
  };

  // 统计面板
  const StatsPanel = () => (
    <Row gutter={16} style={{ marginBottom: 16 }}>
      <Col span={6}>
        <Card>
          <Statistic
            title="商品总数"
            value={itemCount}
            prefix={<ShoppingCartOutlined />}
            valueStyle={{ color: '#1890ff' }}
          />
        </Card>
      </Col>
      <Col span={6}>
        <Card>
          <Statistic
            title="商品种类"
            value={cartData?.items?.length || 0}
            valueStyle={{ color: '#52c41a' }}
          />
        </Card>
      </Col>
      <Col span={6}>
        <Card>
          <Statistic
            title="总金额"
            value={calculateTotal()}
            precision={2}
            prefix="¥"
            valueStyle={{ color: '#e74c3c' }}
          />
        </Card>
      </Col>
      <Col span={6}>
        <Card>
          <div style={{ textAlign: 'center' }}>
            <Button
              type="primary"
              danger
              icon={<DeleteOutlined />}
              onClick={clearCart}
              disabled={!cartData?.items?.length}
            >
              清空购物车
            </Button>
          </div>
        </Card>
      </Col>
    </Row>
  );

  return (
    <div>
      <StatsPanel />
      
      <ProTable
        columns={columns}
        dataSource={cartData?.items || []}
        request={API.cart.cartControllerGetCart}
        pagination={false}
        rowKey="id"
        scroll={{ x: 800 }}
        locale={{
          emptyText: '购物车为空',
        }}
      />
    </div>
  );
}
