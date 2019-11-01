// @flow
import { SET_THEME_MODE } from '../actions/menu';
import type { Action } from './types';
import type { ThemeMode } from '../actions/menu';

type State = {
  themeMode: ThemeMode
};

const defaultState: State = {
  themeMode: 'light'
};

export default function counter(state: State = defaultState, action: Action) {
  switch (action.type) {
    case SET_THEME_MODE:
      return { ...state, themeMode: action.mode };
    default:
      return state;
  }
}
