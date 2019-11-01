// @flow
import type { GetState, Dispatch } from '../reducers/types';

export type ThemeMode = 'light' | 'dark';

export const SET_THEME_MODE = 'SET_THEME_MODE';

export function setThemeMode(mode: ThemeMode) {
  return {
    type: SET_THEME_MODE,
    mode
  };
}
