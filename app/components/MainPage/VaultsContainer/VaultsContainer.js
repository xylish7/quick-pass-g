// @flow
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Popup from 'reactjs-popup';
import type { ThemeMode } from '../../actions/menu';
import type { Vault } from '../../actions/vault';

import styles from './VaultsContainer.css';

import AddVaultButton from './AddVaultButton/AddVaultButton';
import OpenVaultButton from './OpenVaultButton/OpenVaultButton';
import OpenVaultModal from '../../../ui_components/OpenVaultModal/OpenVaultModal';

type Props = {
  themeMode: ThemeMode,
  vaults: Array<Vault>
};

function VaultsContainer(props: Props) {
  const { themeMode, vaults } = props;

  const [showOpenVaultModal, setOpenCreateVaultModal] = useState(false);
  const [pathToVault, setPathToVault] = useState('');
  const [vaultName, setVaultName] = useState('');

  const openVault = (vaultName: string, pathToVault: string): void => {
    setVaultName(vaultName);
    setPathToVault(pathToVault);
    setOpenCreateVaultModal(true);
  };

  return (
    <div
      className={`${
        themeMode === 'light'
          ? 'has-background-grey-lighter'
          : 'has-background-grey-darker'
      } ${styles.vaultsContainer}`}
    >
      {vaults.map((vault: Vault) => (
        <div key={vault.path} onClick={() => openVault(vault.name, vault.path)}>
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
            trigger={OpenVaultButton}
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
        vaultName={vaultName}
        pathToVault={pathToVault}
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
  vaults: state.vault.vaults
});

export default connect(mapStateToProps)(VaultsContainer);
