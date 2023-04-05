import { SAVE_SEARCH } from '../actions';

const INITIAL_STATE = {
  searchApi: '', // string que armazena o email da pessoa usuária
};
const apiSearch = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_SEARCH: {
    return {
      ...state,
      searchApi: action.payload,
    };
  }
  default: return state;
  }
};

export default apiSearch;
