import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { remote } from 'electron';
import { Button } from 'react-bulma-components';
import type { ThemeMode } from '../../../actions/menu';
import type { VaultType } from '../../../actions/vault';

import styles from './Welcome.css';

import appIcon from '../../../../resources/icons/256x256.png';

import CreateVaultModal from '../../../ui_components/CreateVaultModal/CreateVaultModal';

type Props = {
  vaults: Array<VaultType>,
  themeMode: ThemeMode,
  setVault: (vaultPath: string) => void
};

function Welcome(props: Props) {
  const { vaults, themeMode, setVault } = props;

  const [pathToVault, setPathToVault] = useState(undefined);
  const [showCreateVaultModal, setShowCreateVaultModal] = useState(false);

  /**
   * Get the path to where the vault should be created
   */
  const createVaultPath = (): void => {
    const path: string = remote.dialog.showSaveDialog();

    if (path) {
      setPathToVault(path);
      // Open the modal to enter the password for the vault wich
      // will be created
      setShowCreateVaultModal(true);
    } else setPathToVault(undefined);
  };

  /**
   * Open an alredy created vault
   */
  const openVaultPath = (): void => {
    const path: Array<string> = remote.dialog.showOpenDialog();
    if (path) {
      setVault(path[0]);
    }
  };

  const renderWelcomeMessage = (
    <div>
      {/* No vault created message */}
      <p className={`has-text-grey-light ${styles.welcomeText}`} align="center">
        It seems like you don't have any emerald vaults at this time
      </p>

      {/* Action buttons */}
      <div className={styles.buttonsGroup}>
        <Button
          className={styles.button}
          rounded
          color={themeMode === 'light' ? 'light' : 'dark'}
          onClick={openVaultPath}
        >
          <span className="icon">
            <i className="fas fa-box-open" />
          </span>
          <span> Add existing vault</span>
        </Button>
        <Button
          className={styles.button}
          rounded
          color="primary"
          onClick={createVaultPath}
        >
          <span className="icon">
            <i className="fas fa-plus" />
          </span>
          <span> Create new vault</span>
        </Button>
      </div>
    </div>
  );

  return (
    <div className={styles.container}>
      <CreateVaultModal
        pathToVault={pathToVault}
        show={showCreateVaultModal}
        onClose={() => setShowCreateVaultModal(false)}
      />
      {/* Title */}
      <h1 className={`has-text-primary ${styles.title}`} align="center">
        Emerald Lock
      </h1>

      {/* App icon */}
      <img className={styles.appIcon} src={appIcon} alt="appIcon" />
      {/* Welcome text */}
      <p className={`has-text-grey-light ${styles.welcomeText}`} align="center">
        Welcome to your cool emerald password keeper
      </p>
      {vaults.length === 0 && renderWelcomeMessage}
    </div>
  );
}

Welcome.propTypes = {
  themeMode: PropTypes.string.isRequired,
  setVault: PropTypes.func.isRequired
};

export default Welcome;
