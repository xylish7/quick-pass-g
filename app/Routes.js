// @flow
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import * as customTitlebar from 'custom-electron-titlebar';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router';

import routes from './constants/routes';
import appIcon from '../resources/icons/64x64.png';
import App from './containers/App';
import MainPage from './containers/MainPage';
import { getThemeMode, getThemeColor } from './actions/menu';

type Props = {
  getThemeMode: () => void,
  getThemeColor: () => void
};

function Routes(props: Props) {
  // Initialize the app by fetching the saved user preferences for the app
  // and set them
  useEffect(() => {
    props.getThemeMode();
    props.getThemeColor();

    // Set custom titlebar
    const titlebar = new customTitlebar.Titlebar({
      backgroundColor: customTitlebar.Color.fromHex('#444'),
      icon: appIcon
      // maximizable: false
    });

    return () => {
      titlebar.dispose();
    };
  }, []);

  return (
    <App>
      <Switch>
        <Route path={routes.HOME} component={MainPage} />
      </Switch>
    </App>
  );
}

Routes.propTypes = {
  getThemeMode: PropTypes.func.isRequired,
  getThemeColor: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  getThemeMode: () => dispatch(getThemeMode()),
  getThemeColor: () => dispatch(getThemeColor())
});

export default connect(
  null,
  mapDispatchToProps
)(Routes);
