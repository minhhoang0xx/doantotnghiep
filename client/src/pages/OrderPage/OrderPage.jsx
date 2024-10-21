import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, List, message, Typography, Modal } from 'antd';
import { fetchAllOrder, cancelOrder, selectedOrder, removeAllOrderProduct} from '../../redux/slices/orderSlice';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

const OrderPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const orders = useSelector((state) => state.order.orderItems);
  const orderItemsSelected = useSelector((state) => state.order.orderItemsSlected);


  const handleViewDetail = (orderId) => {
    navigate(`/order/detail/${orderId}`);
  };

  const handleCancelOrder = (orderId) => {
    Modal.confirm({
      title: 'Are you sure you want to cancel this order?',
    });
  };

  const handleRemoveAllSelectedOrders = () => {
    const listChecked = orderItemsSelected.map(item => item.product);
    dispatch(removeAllOrderProduct({ listChecked }));
    message.success('Removed all selected orders successfully');
  };

  return (
    <div style={{ padding: '20px' }}>
      <Title level={2}>Your Orders</Title>
      {orders.length === 0 ? (
        <p>You have no orders yet.</p>
      ) : (
        <div>
          <Button 
            type="primary" 
            onClick={handleRemoveAllSelectedOrders} 
            disabled={orderItemsSelected.length === 0}
            style={{ marginBottom: '20px' }}
          >
            Remove Selected Orders
          </Button>
          <List
            itemLayout="horizontal"
            dataSource={orders}
            renderItem={(order) => (
              <List.Item
                actions={[
                  <Button type="link" onClick={() => handleViewDetail(order._id)}>
                    View Detail
                  </Button>,
                  <Button type="link" onClick={() => handleCancelOrder(order._id)}>
                    Cancel
                  </Button>,
                ]}
              >
                <List.Item.Meta
                  title={`Order ID: ${order._id}`}
                  description={`Total Price: $${order.totalPrice} - Status: ${order.isPaid ? 'Paid' : 'Pending'}`}
                />
              </List.Item>
            )}
          />
        </div>
      )}
    </div>
  );
};

export default OrderPage;
