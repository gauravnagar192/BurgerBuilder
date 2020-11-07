import React, { useEffect, useState } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../HOC/withErrorHandler/withErrorHandler';

const Orders = () => {
  let [loading, setLoading] = useState(true);
  let [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get('/order.json')
      .then((res) => {
        setLoading(false);
        let fetchedOrders = [];
        for (let key in res.data) {
          fetchedOrders.push({
            ...res.data[key],
            id: key,
          });
        }
        setOrders(fetchedOrders);
      })
      .catch((err) => {
        setLoading(false);
      });
  }, []);

  return (
    <div>
      {orders.map((order) => {
        return (
          <Order
            key={order.id}
            ingredients={order.ingredients}
            price={Number.parseFloat(order.price).toFixed(2)}
          />
        );
      })}
    </div>
  );
};

export default withErrorHandler(Orders, axios);
