import React, { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

const Checkout = (props) => {
    const [state, setState] = useState({
        ingredients : {
            salad : 1,
            cheese : 1,
            bacon : 1,
            meat : 1
        }
    })

    const [price, setPrice] = useState(0);

    useEffect(() => {
        const query = new URLSearchParams(props.location.search);
        const ingredients = {};
        let price = 0;
        for(let param of query.entries()){
            if(!(param[0] === 'price')){
                ingredients[param[0]] = +param[1];
            } 
            if(param[0] === 'price') {
                price = param[1];
            }
        }
        setState({ingredients: ingredients});
        setPrice(price);
    },[])

    const CheckoutCancelled = () => {
        props.history.goBack();
    }

    const CheckoutContinue = () => {
        props.history.replace('/checkout/contact-data')
    }

    return(
        <div>
            <CheckoutSummary ingredients={state.ingredients} onCheckoutCancelled={CheckoutCancelled} onCheckoutContinue={CheckoutContinue} />
            <Route path={props.match.path + '/contact-data'} render={() => (<ContactData ingredients={state.ingredients} price={price} />)} />
        </div>
    )
}

export default Checkout;