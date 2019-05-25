import * as actionTypes from "../actions/actionTypes";

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

const initialState = {
  ingredients: {
    meat: 0,
    cheese: 0,
    bacon: 0,
    salad: 0
  },
  totalPrice: 4.0
};

const burger = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      let ing = Object.assign({}, state.ingredients);
      ing[action.payload] += 1;
      return {
        ...state,
        ingredients: ing,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.payload]
      };
    case actionTypes.DELETE_INGREDIENT:
      ing = Object.assign({}, state.ingredients);
      ing[action.payload] -= 1;
      return {
        ...state,
        ingredients: ing,
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.payload]
      };
    case actionTypes.SUBMIT_ORDER_SUCCESS:
    case actionTypes.LOGOUT:
      return initialState;

    default:
      return state;
  }
};
export default burger;
