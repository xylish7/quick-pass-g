// @flow
import React from 'react';
import PropTypes from 'prop-types';
import type { VaultType } from '../../actions/vault';

import styles from './MainPage.css';

import Menu from '../../containers/Menu';
import VaultsContainer from './VaultsContainer/VaultsContainer';
import Welcome from '../../containers/Welcome';
import Vault from './Vault/Vault';

type Props = {
  vaults: Array<VaultType>,
  openedVaults: Array
};

function MainPage(props: Props) {
  const { vaults, openedVaults } = props;

  return (
    <React.Fragment>
      <div className={styles.root}>
        {vaults.length > 0 && <VaultsContainer />}
        {openedVaults.length > 0 ? <Vault /> : <Welcome />}
      </div>
      <Menu />
    </React.Fragment>
  );
}

MainPage.propTypes = {
  vaults: PropTypes.array.isRequired
};

export default MainPage;
