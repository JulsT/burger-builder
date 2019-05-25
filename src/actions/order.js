import * as actionTypes from "./actionTypes";
import axios from "../axios-orders";
import history from "../utils/history";

export const purchaseOrder = () => {
  return {
    type: actionTypes.PURCHASE_ORDER
  };
};

export const submitOrder = data => {
  return (dispatch, getState) => {
    const order = {
      ingredients: getState().burger.ingredients,
      price: getState().burger.totalPrice,
      customer: data,
      userId: getState().auth.userId
    };
    const token = getState().auth.token;
    dispatch({ type: actionTypes.SUBMIT_ORDER_REQUEST });
    return axios
      .post(`/orders.json?auth=${token}`, order)
      .then(resp => {
        dispatch({
          type: actionTypes.SUBMIT_ORDER_SUCCESS,
          payload: resp.data
        });
        history.replace("/orders");
      })
      .catch(e =>
        dispatch({ type: actionTypes.SUBMIT_ORDER_FAILURE, payload: e.message })
      );
  };
};
