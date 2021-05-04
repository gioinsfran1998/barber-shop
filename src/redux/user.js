const defaultState = {
  user: null,
};

const userAction = (state = defaultState, action = {}) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload,
      };

    case 'LOGOUT_SUCCESS':
      return {
        ...state,
        user: null,
      };

    default:
      return state;
  }
};

export const loginUser = (value) => {
  return {
    type: 'LOGIN_SUCCESS',
    payload: value,
  };
};

export const logoutUser = (value) => {
  return {
    type: 'LOGOUT_SUCCESS',
    payload: null,
  };
};

export default userAction;
