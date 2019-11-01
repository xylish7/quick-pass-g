// @flow
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import * as customTitlebar from 'custom-electron-titlebar';
import type { Store } from '../reducers/types';
import Routes from '../Routes';
import appIcon from '../../resources/icons/64x64.png';

type Props = {
  store: Store,
  history: {}
};

/* eslint-disable no-new */
new customTitlebar.Titlebar({
  backgroundColor: customTitlebar.Color.fromHex('#444'),
  icon: appIcon,
  maximizable: false
});

export default class Root extends Component<Props> {
  render() {
    const { store, history } = this.props;
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Routes />
        </ConnectedRouter>
      </Provider>
    );
  }
}
