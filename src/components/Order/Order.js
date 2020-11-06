import React from 'react';
import classes from './Order.css';

const Order = (props) => {
    console.log(props);
    return(
        <div className={classes.Order}>
            <p>Ingredient: Salad (1)</p>
            <p>Price: <strong>USD {Number.parseFloat(props.price.toFixed(2))}</strong></p>
        </div>
    )
}

export default Order;