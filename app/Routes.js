import React from 'react';
import { Switch, Route } from 'react-router';
import * as customTitlebar from 'custom-electron-titlebar';
import routes from './constants/routes';
import App from './containers/App';
import HomePage from './containers/HomePage';

/* eslint-disable no-new */
new customTitlebar.Titlebar({
  backgroundColor: customTitlebar.Color.fromHex('#444'),
  maximizable: false
});

export default () => (
  <App>
    <Switch>
      <Route path={routes.HOME} component={HomePage} />
    </Switch>
  </App>
);
