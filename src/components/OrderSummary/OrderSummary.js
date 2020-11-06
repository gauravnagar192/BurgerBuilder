import React from 'react';
import Aux from '../../HOC/Auxilary/Auxilary';
import Button from '../UI/Button/Button';

const OrderSummary = (props) => {
  const ingredientsummary = Object.keys(props.ingredients).map((igKey) => {
    return (
      <li key={igKey}>
        <span style={{ textTransform: 'capitalize' }}>{igKey}</span> :{' '}
        {props.ingredients[igKey]}
      </li>
    );
  });
  return (
    <Aux>
      <h3>Your order</h3>
      <p>A delicious burger with the following ingredients : </p>
      <ul>{ingredientsummary}</ul>
      <p>continue to checkout ?</p>
      <p>
        Total Price: <strong>{props.price}</strong>
      </p>
      <Button clicked={props.purchaseCancel} btnType="Danger">
        CANCEL
      </Button>
      <Button clicked={props.purchaseContinue} btnType="Success">
        CONTINUE
      </Button>
    </Aux>
  );
};

export default OrderSummary;
