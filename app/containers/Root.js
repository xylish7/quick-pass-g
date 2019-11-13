// @flow
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

import type { Store } from '../reducers/types';
import Routes from '../Routes';

type Props = {
  store: Store,
  history: {}
};

function Root(props: Props) {
  const { store, history } = props;

  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Routes />
      </ConnectedRouter>
    </Provider>
  );
}

export default Root;
