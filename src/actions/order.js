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
        if (
          JSON.stringify(getState().auth.contactData) !== JSON.stringify(data)
        )
          axios
            .patch(
              `https://burger-builder-761b3.firebaseio.com/users/${
                order.userId
              }.json`,
              { contactData: data }
            )
            .then(res => {
              dispatch({ type: actionTypes.UPDATE_USER_DATA, payload: data });
            })
            .catch(e =>
              dispatch({
                type: actionTypes.SUBMIT_ORDER_FAILURE,
                payload: e.message
              })
            );
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
