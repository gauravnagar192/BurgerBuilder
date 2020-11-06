import React, { useEffect, useState } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../HOC/withErrorHandler/withErrorHandler';

const Orders = () => {
    let [loading, setLoading] = useState(true);
    let [orders, setOrders] = useState([]);


    useEffect(() => {
        axios.get('/order.json')
            .then(res => {
                setLoading(false);
                let fetchedOrders = [];	
                for(let key in res.data) {
                    fetchedOrders.push({
                        ...res.data[key],
                        id : key
                    });
                }
                let o = [...fetchedOrders];
                o.forEach((e,i) => {
                    orders.push(e)
                })
                console.log(orders);
            })
            .catch(err => {
                setLoading(false);
            })
    },[])



    return (
        <div>
            {
                // orders.map(order => {
                //     console.log("orders");
                //     <Order key={order.id} ingredients={order.ingredients} price={order.price} />
                // })
                console.log(orders)
            }
        </div>
    );
}

export default withErrorHandler(Orders, axios);