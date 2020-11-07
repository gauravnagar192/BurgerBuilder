import * as actionType from './action';

const initialState = {
    ingredients : {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0,
    },
    totalPrice : 4
}

const INGRDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7,
  };

const reducer = (state = initialState , action) => {
    console.log(action);
    switch(action.type) {
        case actionType.ADD_INGREDIENTS :
            return {
                ...state,
                ingredients : {
                    ...state.ingredients,
                    [action.ingredientName] : state.ingredients[action.ingredientName] + 1
                },
                totalPrice : state.totalPrice + INGRDIENT_PRICES[action.ingredientName]
            };
        case actionType.REMOVE_INGREDIENTS :
            return {
                ...state,
                ingredients : {
                    ...state.ingredients,
                    [action.ingredientName] : state.ingredients[action.ingredientName] - 1
                },
                totalPrice : state.totalPrice - INGRDIENT_PRICES[action.ingredientName]
            };
    }
    return state;
}

export default reducer;