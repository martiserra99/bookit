import {
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  CLEAR_ERRORS,
} from "../constants/userConstants";

export const authReducer = (state = { user: null }, action) => {
  switch (action.type) {
    case REGISTER_USER_REQUEST:
      return {
        loading: true,
      };

    case REGISTER_USER_SUCCESS:
      return {
        loading: false,
        success: true,
      };

    case REGISTER_USER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const loadedUserReducer = (
  state = { user: null, loading: false },
  action
) => {
  switch (action.type) {
    case LOAD_USER_REQUEST:
      return { loading: true };
    case LOAD_USER_SUCCESS:
      return { isAuthenticated: true, user: action.payload };
    case LOAD_USER_FAIL:
      return { error: action.payload };
    default:
      return state;
  }
};
