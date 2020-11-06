import React, { useState } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';

const setInput = (etype ,  type , placeholder , value, r, v,min,max) => {
  return {
    elementType: etype,
    elementConfig: {
      type: type,
      placeholder: placeholder
    },
    value: value,
    validation: {
      required: r,
      minLength: min,
      maxLength: max
    },
    valid: v
  }
}

const ContactData = (props) => {
    let [name , setName] = useState(' ');
    let [email , setEmail] = useState(' ');
    let [address , setAddress] = useState({
        street : ' ',
        postalCode : ' '
    });
    let [loading , setLoading] = useState(false);
    let [price , setPrice] = useState(0);
    let [orderForm, setOrderForm] = useState({
      name : setInput('input','text','Your Name','',true,false,0,50),
      street: setInput('input','text','Your Street','',true,false,0,50),
      zipcode: setInput('input','text','Your Zipcode','',true,false,2,5),
      country: setInput('input','text','Your Country','',true,false,0,50),
      email: setInput('input','text','Your Email','',true,false,0,50),
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            {value: 'fastest', displayValue: 'Fastest'},
            {value: 'cheapest', displayValue: 'Cheapest'}
          ]
        },
        value: '',
        validation: {
          required: true
        },
        valid: false
      } ,
    })

    const orderHandler = (event) => {
        event.preventDefault()
        const formData = {};
        for(let formElementIdentifier in orderForm) {
          formData[formElementIdentifier] = orderForm[formElementIdentifier].value;
        }
        setLoading(true)

      
    const order = {
      ingredients : props.ingredients ,
      price : props.price , 
      orderData : formData
    }
    axios.post('order.json', order)
    .then(res => {
      setLoading(false);
      console.log(res);
    })
    .catch(err => {
      setLoading(false);
      console.log(err);
    })
    }


    const checkValidity = (value, rules) => {
      let isValid = true;

      if(rules.required) {
        isValid = value.trim() !== '' && isValid;
      }

      if(rules.minLength) {
        isValid = value.length >= rules.minLength && isValid;
      }

      if(rules.maxLength) {
        isValid = value.length <= rules.maxLength && isValid;
      }

      console.log(isValid);

      return isValid;

    }

    const inputChangeHandler = (event, inputIdentifier) => {
      const updatedOrderForm = {
        ...orderForm
      };
      let updatedFormElement = {
        ...updatedOrderForm[inputIdentifier]
      };
      updatedFormElement.value = event.target.value;
      updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation);
      console.log(updatedFormElement);
      updatedOrderForm[inputIdentifier] = updatedFormElement;
      setOrderForm(updatedOrderForm);
    }

    let formElementsArray = [];
    for (let key in orderForm) {
      formElementsArray.push({
        id:key,
        config: orderForm[key]
      });
    }

    return(
        <div className={classes.ContactData}>
            <h4>ENTER YOUR CONTACT DATA</h4>
            <form onSubmit={orderHandler}>
              {
                formElementsArray.map(formElement => {
                  return <Input 
                    key={formElement.id}
                    elementtype={formElement.config.elementType} 
                    elementConfig={formElement.config.elementConfig} 
                    value={formElement.config.value}
                    invalid = {!formElement.config.valid}
                    shouldValidate = {formElement.config.validation}
                    changed={(event) => inputChangeHandler(event, formElement.id)}
                  />
                })
              }

                <Button btnType="Success">ORDER</Button>
            </form>
        </div>

    )

}

export default ContactData;

