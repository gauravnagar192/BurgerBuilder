import React, { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

const Checkout = (props) => {
  const [state, setState] = useState({
    ingredients: {
      salad: 1,
      cheese: 1,
      bacon: 1,
      meat: 1,
    },
  });

  const CheckoutCancelled = () => {
    props.history.goBack();
  };

  const CheckoutContinue = () => {
    props.history.replace('/checkout/contact-data');
  };

  return (
    <div>
      <CheckoutSummary
        ingredients={props.ings}
        onCheckoutCancelled={CheckoutCancelled}
        onCheckoutContinue={CheckoutContinue}
      />
      <Route
        path={props.match.path + '/contact-data'}
        component={ContactData}
      />
    </div>
  );
};

const mapStatetoProps = (State) => {
  return {
    ings: State.ingredients,
    pr: State.totalPrice,
  };
};

export default connect(mapStatetoProps)(Checkout);
