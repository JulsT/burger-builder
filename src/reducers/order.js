import * as actionTypes from "../actions/actionTypes";

const initialState = {
  isLoading: false,
  error: null,
  burgerReady: false
};

const order = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SUBMIT_ORDER_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case actionTypes.SUBMIT_ORDER_SUCCESS: {
      return {
        ...state,
        isLoading: false
      };
    }
    case actionTypes.SUBMIT_ORDER_FAILURE: {
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    }
    case actionTypes.PURCHASE_ORDER:
      return {
        ...state,
        error: null,
        burgerReady: true
      };
    default:
      return state;
  }
};

export default order;
