import React, { useState } from 'react';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Burger from '../../components/Burger/Burger';
import OrderSummary from '../../components/OrderSummary/OrderSummary';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../../HOC/Auxilary';

const INGRDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

const BurgerBuilder = () => {
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

  const purchaseHandler = () => {
    const ingredients = state.ingredients;
    const totalPrice = state.totalPrice;
    const purchaseable = state.purchaseable;
    setState({ ingredients, totalPrice, purchaseable, purchasing: true });
  };

  const purchaseContinuehandler = () => {
    alert('You Continue!');
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

    setState({
      ingredients: ingredients,
      totalPrice: updatedPrice,
      purchaseable: sum > 0,
    });
  };

  const addIngredientHandler = (type) => {
    const oldCount = state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredient = {
      ...state.ingredients,
    };
    updatedIngredient[type] = updatedCount;
    const priceAddition = INGRDIENT_PRICES[type];
    const oldPrice = state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    setState({ ingredients: updatedIngredient, totalPrice: newPrice });
    updatePurchaseState(updatedIngredient, newPrice);
  };

  const removeIngredientHandler = (type) => {
    const oldCount = state.ingredients[type];
    if (oldCount <= 0) {
      return;
    }
    const updatedCount = oldCount - 1;
    const updatedIngredient = {
      ...state.ingredients,
    };
    updatedIngredient[type] = updatedCount;
    const priceAddition = INGRDIENT_PRICES[type];
    const oldPrice = state.totalPrice;
    const newPrice = oldPrice - priceAddition;
    setState({ ingredients: updatedIngredient, totalPrice: newPrice });
    updatePurchaseState(updatedIngredient, newPrice);
  };

  const disabledInfo = {
    ...state.ingredients,
  };
  for (let key in disabledInfo) {
    disabledInfo[key] = disabledInfo[key] <= 0;
  }
  return (
    <Aux>
      <Modal show={state.purchasing} modalClosed={purchaseCancelHandler}>
        <OrderSummary
          ingredients={state.ingredients}
          purchaseContinue={purchaseContinuehandler}
          purchaseCancel={purchaseCancelHandler}
          price={state.totalPrice.toFixed(2)}
        />
      </Modal>
      <Burger ingredients={state.ingredients} />
      <BuildControls
        ingredientAdded={addIngredientHandler}
        ingredientRemove={removeIngredientHandler}
        disabled={disabledInfo}
        price={state.totalPrice}
        purchaseable={state.purchaseable}
        ordered={purchaseHandler}
      />
    </Aux>
  );
};

export default BurgerBuilder;
