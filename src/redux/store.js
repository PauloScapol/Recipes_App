import { legacy_createStore as createStore } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';

const INITIAL_STATE = { count: 0 };
const reducer = (state = INITIAL_STATE) => state;

const store = createStore(reducer, composeWithDevTools());
if (window.Cypress) {
  window.store = store;
}

export default store;
