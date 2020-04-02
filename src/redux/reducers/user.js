import { SET_CURRENT_USER } from "../actions/actionTypes";

const initialState = {
  user: null
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        user: payload
      };
    default:
      return state;
  }
};

export default reducer;
