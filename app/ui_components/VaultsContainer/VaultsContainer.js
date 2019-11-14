// @flow
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import type { ThemeMode } from '../../actions/menu';
import type { Vault } from '../../actions/vault';

import styles from './VaultsContainer.css';

import AddVaultButton from '../AddVaultButton/AddVaultButton';
import OpenVaultButton from '../OpenVaultButton/OpenVaultButton';

type Props = {
  themeMode: ThemeMode,
  vaults: Array<Vault>
};

function VaultsContainer(props: Props) {
  return (
    <div
      className={`${
        props.themeMode === 'light'
          ? 'has-background-grey-lighter'
          : 'has-background-grey-darker'
      } ${styles.vaultsContainer}`}
    >
      {props.vaults.map((vault: Vault, index: number) => (
        <OpenVaultButton key={index} />
      ))}

      <AddVaultButton />
    </div>
  );
}

VaultsContainer.propTypes = {
  themeMode: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  themeMode: state.menu.themeMode,
  vaults: state.vault.vaults
});

export default connect(mapStateToProps)(VaultsContainer);
