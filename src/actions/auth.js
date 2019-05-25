import * as actionTypes from "./actionTypes";
import axios from "axios";
import { toast } from "react-toastify";

import history from "../utils/history";

export const signup = data => {
  return (dispatch, getState) => {
    dispatch({ type: actionTypes.SIGNUP_REQUEST });
    toast.dismiss();
    const authData = { ...data, returnSecureToken: true };
    axios
      .post(
        "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyBJbRkoeBXhAc7e8Lomil3urtG7vZ2NSVc",
        authData
      )
      .then(res => {
        const setCheckoutPath = getState().order.burgerReady;
        const date = new Date(
          new Date().setHours(new Date().getHours() + res.data.expiresIn / 3600)
        );
        if (setCheckoutPath) history.replace("/checkout");
        else history.replace("/builder");
        localStorage.setItem("token", res.data.idToken);
        localStorage.setItem("expiresDate", date);
        dispatch({ type: actionTypes.SIGNUP_SUCCESS, payload: res.data });
      })
      .catch(err => {
        toast.error(err.response.data.error.message, { autoClose: 5000 });
        dispatch({
          type: actionTypes.SIGNUP_FAILURE,
          payload: err.response.data.error.message
        });
      });
  };
};

export const login = data => {
  return (dispatch, getState) => {
    dispatch({ type: actionTypes.LOGIN_REQUEST });
    toast.dismiss();
    const authData = { ...data, returnSecureToken: true };
    axios
      .post(
        "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyBJbRkoeBXhAc7e8Lomil3urtG7vZ2NSVc",
        authData
      )
      .then(result => {
        const setCheckoutPath = getState().order.burgerReady;
        const date = new Date(
          new Date().setHours(
            new Date().getHours() + result.data.expiresIn / 3600
          )
        );
        localStorage.setItem("token", result.data.idToken);
        localStorage.setItem("expiresDate", date);
        if (setCheckoutPath) history.replace("/checkout");
        else history.replace("/builder");
        dispatch({ type: actionTypes.LOGIN_SUCCESS, payload: result.data });
      })
      .catch(err => {
        toast.error(err.response.data.error.message, { autoClose: 5000 });
        dispatch({
          type: actionTypes.LOGIN_FAILURE,
          payload: err.response.data.error.message
        });
      });
  };
};

export const logout = () => {
  return dispatch => {
    localStorage.removeItem("token");
    localStorage.removeItem("expiresDate");
    history.replace("/login");
    dispatch({ type: actionTypes.LOGOUT });
  };
};

export const recieveAuth = () => {
  return dispatch => {
    const token = localStorage.getItem("token");
    const expiresDate = localStorage.getItem("expiresDate");
    if (token) {
      if (new Date() > new Date(expiresDate)) {
        dispatch(logout());
      }
    }
  };
};
