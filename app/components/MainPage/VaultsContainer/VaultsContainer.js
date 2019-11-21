// @flow
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Popup from 'reactjs-popup';
import type { ThemeMode, ThemeColor } from '../../actions/menu';
import type { VaultType } from '../../actions/vault';

import styles from './VaultsContainer.css';

import AddVaultButton from './AddVaultButton/AddVaultButton';
import OpenVaultButton from './OpenVaultButton/OpenVaultButton';
import OpenVaultModal from '../../../ui_components/OpenVaultModal/OpenVaultModal';

type Props = {
  themeMode: ThemeMode,
  themeColor: ThemeColor,
  vaults: Array<VaultType>,
  openedVaults: Array
};

function VaultsContainer(props: Props) {
  const { themeMode, vaults, openedVaults, themeColor } = props;

  const [showOpenVaultModal, setOpenCreateVaultModal] = useState(false);
  const [vault, setVault] = useState({});

  const openOrSelect = (vault: VaultType): void => {
    // Check to see if the vault is open
    const isOpen = openedVaults.some(
      openedVault => Object.keys(openedVault)[0] === vault.id
    );
    if (isOpen) {
      console.log('select vault');
    } else {
      setVault(vault);
      setOpenCreateVaultModal(true);
    }
  };

  return (
    <div
      className={`${
        themeMode === 'light'
          ? 'has-background-grey-lighter'
          : 'has-background-grey-darker'
      } ${styles.vaultsContainer}`}
    >
      {vaults.map((vault: VaultType) => (
        <div key={vault.path} onClick={() => openOrSelect(vault)}>
          <Popup
            on="hover"
            mouseEnterDelay={0}
            mouseLeaveDelay={0}
            contentStyle={{
              border: 'none',
              boxShadow: 'none',
              width: 'max-content',
              fontWeight: 'lighter',
              fontSize: '12px',
              padding: '5px 15px'
            }}
            arrowStyle={{
              boxShadow: 'none'
            }}
            offsetX={10}
            trigger={() => (
              <OpenVaultButton
                openedVaults={openedVaults}
                vault={vault}
                themeColor={themeColor}
              />
            )}
            position="right center"
            closeOnDocumentClick
          >
            <span> {vault.name} </span>
          </Popup>
        </div>
      ))}

      <AddVaultButton />
      <OpenVaultModal
        show={showOpenVaultModal}
        vault={vault}
        onClose={() => setOpenCreateVaultModal(false)}
      />
    </div>
  );
}

VaultsContainer.propTypes = {
  themeMode: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  themeMode: state.menu.themeMode,
  themeColor: state.menu.themeColor,
  vaults: state.vault.vaults,
  openedVaults: state.vault.openedVaults
});

export default connect(mapStateToProps)(VaultsContainer);
