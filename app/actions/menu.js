// @flow
import type { Dispatch } from '../reducers/types';
import { USER_PREFERENCES } from '../constants/local-stores';
import LocalStore from '../utils/local-store';

export type ThemeMode = 'light' | 'dark';
export type ThemeColor = 'primary' | 'info' | 'warning' | 'danger';

export const SET_THEME_MODE = 'SET_THEME_MODE';
export const GET_THEME_MODE = 'GET_THEME_MODE';
export const SET_THEME_COLOR = 'SET_THEME_COLOR';
export const GET_THEME_COLOR = 'GET_THEME_COLOR';

/**
 * Set the theme mode of the app
 *
 * @param {ThemeMode} themeMode
 */
export const setThemeMode = (themeMode: ThemeMode) => (
  dispatch: Dispatch
): void => {
  const userPreferencesStore = new LocalStore(USER_PREFERENCES.store);

  // Set the atribute [data-theme] of the document to the received [themeMode]
  document.documentElement.setAttribute('data-theme', themeMode);

  // Save theme theme themeMode to store
  userPreferencesStore.set(USER_PREFERENCES.values.themeMode, themeMode);

  dispatch({
    type: SET_THEME_MODE,
    themeMode
  });
};

/**
 * Get the prefered theme mode from the store
 */
export const getThemeMode = () => (dispatch: Dispatch): void => {
  const userPreferencesStore = new LocalStore(USER_PREFERENCES.store);

  // Get the theme themeMode from the store
  const themeMode = userPreferencesStore.get(USER_PREFERENCES.values.themeMode);

  // Set the atribute [data-theme] of the document to [themeMode]
  document.documentElement.setAttribute('data-theme', themeMode);

  dispatch({
    type: GET_THEME_MODE,
    themeMode
  });
};

/**
 * Set the theme color of the app
 *
 * @param {ThemeColor} themeColor
 */
export const setThemeColor = (themeColor: ThemeColor) => (
  dispatch: Dispatch
): void => {
  const userPreferencesStore = new LocalStore(USER_PREFERENCES.store);

  // Save theme theme themeColor to store
  userPreferencesStore.set(USER_PREFERENCES.values.themeColor, themeColor);

  dispatch({
    type: SET_THEME_COLOR,
    themeColor
  });
};

/**
 * Get the prefered theme color from the store
 */
export const getThemeColor = () => (dispatch: Dispatch): void => {
  const userPreferencesStore = new LocalStore(USER_PREFERENCES.store);

  // Get the theme themeColor from the store
  const themeColor = userPreferencesStore.get(
    USER_PREFERENCES.values.themeColor
  );

  dispatch({
    type: GET_THEME_COLOR,
    themeColor
  });
};
