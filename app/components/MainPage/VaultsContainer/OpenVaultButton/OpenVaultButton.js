// @flow
import React from 'react';
import PropTypes from 'prop-types';

import styles from './OpenVaultButton.css';

import type { VaultType } from '../../../../actions/vault';
import type { ThemeColor } from '../../../../actions/menu';

type Props = {
  themeColor: ThemeColor,
  vault: VaultType,
  openedVaults: Array
};

const OpenVaultButton = React.forwardRef((props: Props, ref) => {
  const { openedVaults, vault, themeColor, ...other } = props;

  // Check to see if the vault is open
  const isOpen = openedVaults.some(
    openedVault => Object.keys(openedVault)[0] === vault.id
  );

  return (
    <div
      className={`vault-button open-vault ${styles.openVaultButton}`}
      ref={ref}
      {...other}
    >
      {isOpen ? (
        <i className={`has-text-${themeColor} fas fa-unlock`} />
      ) : (
        <i className={`has-text-${themeColor} fas fa-lock `} />
      )}
    </div>
  );
});

OpenVaultButton.propTypes = {
  themeColor: PropTypes.string.isRequired,
  vault: PropTypes.object.isRequired,
  openedVaults: PropTypes.array.isRequired
};

export default OpenVaultButton;
