// @flow
import {
  SET_THEME_MODE,
  GET_THEME_MODE,
  SET_THEME_COLOR,
  GET_THEME_COLOR
} from '../actions/menu';
import type { Action } from './types';
import type { ThemeMode, ThemeColor } from '../actions/menu';
import updateObject from '../utils/update-object';

export type MenuState = {
  themeMode: ThemeMode,
  themeColor: ThemeColor
};

const defaultState: MenuState = {
  themeMode: 'light',
  themeColor: 'primary'
};

export default function counter(
  state: MenuState = defaultState,
  action: Action
) {
  switch (action.type) {
    case SET_THEME_MODE:
      return updateObject(state, { themeMode: action.themeMode });
    case GET_THEME_MODE:
      return updateObject(state, { themeMode: action.themeMode });
    case SET_THEME_COLOR:
      return updateObject(state, { themeColor: action.themeColor });
    case GET_THEME_COLOR:
      return updateObject(state, { themeColor: action.themeColor });
    default:
      return state;
  }
}
