import React, { useState } from 'react';
import Button from '../../../components/UI/Button/Button';
import { connect } from 'react-redux';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';

const setInput = (etype, type, placeholder, value, r, v, min, max, touch) => {
  return {
    elementType: etype,
    elementConfig: {
      type: type,
      placeholder: placeholder,
    },
    value: value,
    validation: {
      required: r,
      minLength: min,
      maxLength: max,
    },
    valid: v,
    touched: touch,
  };
};

const ContactData = (props) => {
  let [name, setName] = useState(' ');
  let [email, setEmail] = useState(' ');
  let [address, setAddress] = useState({
    street: ' ',
    postalCode: ' ',
  });
  let [formIsValid, setformIsValid] = useState(false);
  let [loading, setLoading] = useState(false);
  let [price, setPrice] = useState(0);
  let [orderForm, setOrderForm] = useState({
    name: setInput('input', 'text', 'Your Name', '', true, false, 0, 50, false),
    street: setInput(
      'input',
      'text',
      'Your Street',
      '',
      true,
      false,
      0,
      50,
      false
    ),
    zipcode: setInput(
      'input',
      'text',
      'Your Zipcode',
      '',
      true,
      false,
      2,
      5,
      false
    ),
    country: setInput(
      'input',
      'text',
      'Your Country',
      '',
      true,
      false,
      0,
      50,
      false
    ),
    email: setInput(
      'input',
      'text',
      'Your Email',
      '',
      true,
      false,
      0,
      50,
      false
    ),
    deliveryMethod: {
      elementType: 'select',
      elementConfig: {
        options: [
          { value: 'fastest', displayValue: 'Fastest' },
          { value: 'cheapest', displayValue: 'Cheapest' },
        ],
      },
      value: 'fastest',
      valid: true,
      touched: false,
    },
  });

  const orderHandler = (event) => {
    event.preventDefault();
    const formData = {};
    for (let formElementIdentifier in orderForm) {
      formData[formElementIdentifier] = orderForm[formElementIdentifier].value;
    }
    setLoading(true);

    const order = {
      ingredients: props.ings,
      price: props.pr,
      orderData: formData,
    };
    axios
      .post('order.json', order)
      .then((res) => {
        setLoading(false);
        props.history.push('/');
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const checkValidity = (value, rules) => {
    let isValid = true;

    if (rules) {
      if (rules.required) {
        isValid = value.trim() !== '' && isValid;
      }

      if (rules.minLength) {
        isValid = value.length >= rules.minLength && isValid;
      }

      if (rules.maxLength) {
        isValid = value.length <= rules.maxLength && isValid;
      }
    }

    console.log(isValid);

    return isValid;
  };

  const inputChangeHandler = (event, inputIdentifier) => {
    const updatedOrderForm = {
      ...orderForm,
    };
    let updatedFormElement = {
      ...updatedOrderForm[inputIdentifier],
    };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedFormElement.touched = true;
    updatedOrderForm[inputIdentifier] = updatedFormElement;
    let FormisValid = true;
    for (let inputIdentifier in updatedOrderForm) {
      FormisValid = updatedOrderForm[inputIdentifier].valid && FormisValid;
    }
    setOrderForm(updatedOrderForm);
    setformIsValid(FormisValid);
  };

  let formElementsArray = [];
  for (let key in orderForm) {
    formElementsArray.push({
      id: key,
      config: orderForm[key],
    });
  }

  return (
    <div className={classes.ContactData}>
      <h4>ENTER YOUR CONTACT DATA</h4>
      <form onSubmit={orderHandler}>
        {formElementsArray.map((formElement) => {
          return (
            <Input
              key={formElement.id}
              elementtype={formElement.config.elementType}
              elementConfig={formElement.config.elementConfig}
              value={formElement.config.value}
              invalid={!formElement.config.valid}
              shouldValidate={formElement.config.validation}
              touched={formElement.config.touched}
              changed={(event) => inputChangeHandler(event, formElement.id)}
            />
          );
        })}

        <Button btnType="Success" disabled={!formIsValid}>
          ORDER
        </Button>
      </form>
    </div>
  );
};

const mapStatetoProps = (State) => {
  return {
    ings: State.ingredients,
    pr: State.totalPrice,
  };
};

export default connect(mapStatetoProps)(ContactData);
