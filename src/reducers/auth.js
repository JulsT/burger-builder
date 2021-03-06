import * as actionTypes from "../actions/actionTypes";

const token = localStorage.getItem("token");

const initialState = {
  userId: null,
  isAuthenticated: !!token,
  token,
  error: null,
  isLoading: false,
  contactData: null
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_REQUEST:
    case actionTypes.SIGNUP_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null
      };
    case actionTypes.LOGIN_SUCCESS:
    case actionTypes.SIGNUP_SUCCESS:
      return {
        ...state,
        isLoading: false,
        userId: action.payload.localId,
        token: action.payload.idToken,
        isAuthenticated: true
      };
    case actionTypes.ADD_USER:
    case actionTypes.FETCH_USER_DATA:
    case actionTypes.UPDATE_USER_DATA:
      return {
        ...state,
        contactData: action.payload
      };
    case actionTypes.LOGIN_FAILURE:
    case actionTypes.SIGNUP_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    case actionTypes.LOGOUT:
      return {
        ...state,
        userId: "",
        isAuthenticated: false,
        token: "",
        error: null,
        isLoading: false,
        contactData: null
      };
    default:
      return state;
  }
};
export default auth;
