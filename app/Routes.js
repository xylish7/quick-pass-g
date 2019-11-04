// @flow
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router';
import routes from './constants/routes';
import App from './containers/App';
import HomePage from './containers/HomePage';
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
  }, []);

  return (
    <App>
      <Switch>
        <Route path={routes.HOME} component={HomePage} />
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
