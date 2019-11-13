// @flow
import React from 'react';
import PropTypes from 'prop-types';
import type { ThemeMode } from '../../actions/menu';

import styles from './MainPage.css';

import Menu from '../../containers/Menu';
import VaultsContainer from '../../ui_components/VaultsContainer/VaultsContainer';
import Welcome from './Welcome/Welcome';

type Props = {
  themeMode: ThemeMode
};

function MainPage(props: Props) {
  return (
    <React.Fragment>
      <div className={styles.root}>
        <VaultsContainer />
        <Welcome />
      </div>
      <Menu />
    </React.Fragment>
  );
}

MainPage.propTypes = {
  themeMode: PropTypes.string.isRequired
};

export default MainPage;
