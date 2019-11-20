// @flow
import React from 'react';
import PropTypes from 'prop-types';

import type { VaultType } from '../../../../actions/vault';

type Props = {
  vault: VaultType,
  openedVaults: Array
};

const OpenVaultButton = React.forwardRef((props, ref) => {
  const { openedVaults, vault, ...other } = props;

  // Check to see if the vault is open
  const isOpen = openedVaults.some(
    openedVault => Object.keys(openedVault)[0] === vault.id
  );

  return (
    <div className="vault-button open-vault" ref={ref} {...other}>
      {isOpen ? (
        <i className="fas fa-lock-open" />
      ) : (
        <i className="fas fa-lock" />
      )}
    </div>
  );
});

OpenVaultButton.propTypes = {
  vault: PropTypes.object.isRequired,
  openedVaults: PropTypes.array.isRequired
};

export default OpenVaultButton;
