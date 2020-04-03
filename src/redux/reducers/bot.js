import { ACTIVATE_AZIZ, DEACTIVATE_AZIZ } from "../actions/actionTypes";

const initialState = {
  aziz: false
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ACTIVATE_AZIZ:
      return {
        ...state,
        aziz: true
      };
    case DEACTIVATE_AZIZ:
      return {
        ...state,
        aziz: false
      };
    default:
      return state;
  }
};

export default reducer;
