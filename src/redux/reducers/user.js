import { SET_CURRENT_USER, SET_ERRORS } from "../actions/actionTypes";

const initialState = {
  user: null,
  errors: null // <--- I would prefer this was in the errors reducer rather than here - I don't even think you're using this
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        user: payload,
        errors: null
      };
    default:
      return state;
    case SET_ERRORS:
      return {
        ...state,
        error: payload
      };
  }
};

export default reducer;
