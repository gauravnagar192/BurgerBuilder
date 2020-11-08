import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import * as actionType from '../../store/action';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Burger from '../../components/Burger/Burger';
import OrderSummary from '../../components/OrderSummary/OrderSummary';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../../HOC/Auxilary/Auxilary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../HOC/withErrorHandler/withErrorHandler';
import { element } from 'prop-types';

const BurgerBuilder = (props) => {
  const [state, setState] = useState({
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
    },
    totalPrice: 4,
    purchaseable: false,
    purchasing: false,
  });

  let [loading, setLoading] = useState(false);

  useEffect(() => {
    // CODE FOR READING INGREDIENTS DATA FROM FIREBASE & SETTING IT ON BURGER
    /*
      axios.get('https://react-myburger-c32d2.firebaseio.com/ingredients.json')
        .then(res => {
          const totalPrice = state.totalPrice;
          const purchaseable = state.purchaseable;
          const purchasing = state.purchasing;
          const salad = res.data.Salad;
          const bacon = res.data.Bacon;
          const cheese = res.data.Cheese;
          const meat = res.data.Meat;
          const ingredients = {
            salad : salad,
            bacon : bacon,
            cheese : cheese,
            meat : meat
          };
          const newState = {
            ingredients : ingredients,
            totalPrice : totalPrice,
            purchaseable : purchaseable,
            purchasing : purchasing
          };
          setState(newState);
        }) */
  }, []);

  const purchaseHandler = () => {
    const ingredients = state.ingredients;
    const totalPrice = state.totalPrice;
    const purchaseable = state.purchaseable;
    setState({ ingredients, totalPrice, purchaseable, purchasing: true });
  };

  const purchaseContinuehandler = () => {
    //alert('You Continue!');
    // setLoading(true)
    // const order = {
    //   ingredients : state.ingredients ,
    //   price : state.totalPrice ,
    //   customer : {
    //     name : 'gaurav nagar' ,
    //     address : {
    //       street : 'TestStreet 1' ,
    //       zipcode :   '41351' ,
    //       country : 'Germany'
    //     } ,
    //     email : 'gauravnagar11@gmail.com'
    //   },
    //   deliveryMethod : 'fastest'
    // }
    // axios.post('order.json', order)
    // .then(res => {
    //   setLoading(false);
    //   purchaseCancelHandler();
    //   console.log(res);
    // })
    // .catch(err => {
    //   setLoading(false);
    //   purchaseCancelHandler();
    //   console.log(err);
    // })

    props.history.push('/checkout');
  };

  const purchaseCancelHandler = () => {
    const ingredients = state.ingredients;
    const totalPrice = state.totalPrice;
    const purchaseable = state.purchaseable;
    setState({ ingredients, totalPrice, purchaseable, purchasing: false });
  };

  const updatePurchaseState = (ingredients, updatedPrice) => {
    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);

    return sum > 0;
  };

  // const addIngredientHandler = (type) => {
  //   const oldCount = state.ingredients[type];
  //   const updatedCount = oldCount + 1;
  //   const updatedIngredient = {
  //     ...state.ingredients,
  //   };
  //   updatedIngredient[type] = updatedCount;
  //   const priceAddition = INGRDIENT_PRICES[type];
  //   const oldPrice = state.totalPrice;
  //   const newPrice = oldPrice + priceAddition;
  //   setState({ ingredients: updatedIngredient, totalPrice: newPrice });
  //   updatePurchaseState(updatedIngredient, newPrice);
  // };

  // const removeIngredientHandler = (type) => {
  //   const oldCount = state.ingredients[type];
  //   if (oldCount <= 0) {
  //     return;
  //   }
  //   const updatedCount = oldCount - 1;
  //   const updatedIngredient = {
  //     ...state.ingredients,
  //   };
  //   updatedIngredient[type] = updatedCount;
  //   const priceAddition = INGRDIENT_PRICES[type];
  //   const oldPrice = state.totalPrice;
  //   const newPrice = oldPrice - priceAddition;
  //   setState({ ingredients: updatedIngredient, totalPrice: newPrice });
  //   updatePurchaseState(updatedIngredient, newPrice);
  // };

  const disabledInfo = {
    ...props.ings,
  };
  for (let key in disabledInfo) {
    disabledInfo[key] = disabledInfo[key] <= 0;
  }

  let orderSummary = (
    <OrderSummary
      ingredients={props.ings}
      purchaseContinue={purchaseContinuehandler}
      purchaseCancel={purchaseCancelHandler}
      price={props.pr.toFixed(2)}
    />
  );

  if (loading) {
    orderSummary = <Spinner />;
  }

  return (
    <Aux>
      <Modal show={state.purchasing} modalClosed={purchaseCancelHandler}>
        {orderSummary}
      </Modal>
      <Burger ingredients={props.ings} />
      <BuildControls
        ingredientAdded={props.onAddIngredients}
        ingredientRemove={props.onRemoveIngredients}
        disabled={disabledInfo}
        price={props.pr}
        purchaseable={updatePurchaseState(props.ings)}
        ordered={purchaseHandler}
      />
    </Aux>
  );
};

const mapStatetoProps = (State) => {
  return {
    ings: State.ingredients,
    pr: State.totalPrice,
  };
};

const mapDispatchtoProps = (Dispatch) => {
  return {
    onAddIngredients: (ingredient) =>
      Dispatch({
        type: actionType.ADD_INGREDIENTS,
        ingredientName: ingredient,
      }),
    onRemoveIngredients: (ingredient) =>
      Dispatch({
        type: actionType.REMOVE_INGREDIENTS,
        ingredientName: ingredient,
      }),
  };
};

export default connect(
  mapStatetoProps,
  mapDispatchtoProps
)(withErrorHandler(BurgerBuilder, axios));
