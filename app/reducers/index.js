// @flow
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import menu from './menu';
import vault from './vault';

export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    menu,
    vault
  });
}
