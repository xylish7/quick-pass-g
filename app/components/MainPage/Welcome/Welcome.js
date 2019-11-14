import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { remote } from 'electron';
import type { ThemeMode } from '../../../actions/menu';
import { Archive, Datasources, Credentials } from 'buttercup';

import styles from './Welcome.css';

import { Button, Modal, Section } from 'react-bulma-components';
import appIcon from '../../../../resources/icons/256x256.png';

import CreatePassword from '../../../ui_components/CreatePassword/CreatePassword';

type Props = {
  themeMode: ThemeMode
};

function Welcome(props: Props) {
  const [pathToVault, setPathToVault] = useState(undefined);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  /**
   * Get the path to where the vault should be created
   */
  const getVaultPath = (): void => {
    const pathToVault: string = remote.dialog.showSaveDialog();

    if (pathToVault) {
      setPathToVault(pathToVault);
      setShowPasswordModal(true);
    } else setPathToVault(undefined);
  };

  /**
   * When the modal with the password creation is closed
   * check to see if there was a [password] provided. If
   * [password] exists then create the vault to the
   * selected path.
   *
   * @param {string} password
   */
  const handleModalClose = (password: string): void => {
    setShowPasswordModal(false);
    if (password) {
      const { FileDatasource } = Datasources;

      const fileDatasource = new FileDatasource(pathToVault);
      const archive = Archive.createWithDefaults();
      const credentials = Credentials.fromPassword(password);
      fileDatasource.save(archive.getHistory(), credentials);
    }
  };

  return (
    <div className={styles.container}>
      <CreatePassword
        show={showPasswordModal}
        onClose={handleModalClose}
        modal={{ closeOnBlur: true, showClose: false }}
      />
      {/* Title */}
      <h1 className={`has-text-primary ${styles.title}`} align="center">
        Emerald Lock
      </h1>

      {/* App icon */}
      <img className={styles.appIcon} src={appIcon} />

      {/* Welcome text */}
      <p className={`has-text-grey-light ${styles.welcomeText}`} align="center">
        Welcome to your cool emerald password keeper
      </p>
      <p className={`has-text-grey-light ${styles.welcomeText}`} align="center">
        It seems like you don't have any emerald vaults at this time
      </p>

      {/* Action buttons */}
      <div className={styles.buttonsGroup}>
        <Button
          className={styles.button}
          rounded
          color={props.themeMode === 'light' ? 'light' : 'dark'}
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
          onClick={getVaultPath}
        >
          <span className="icon">
            <i className="fas fa-plus" />
          </span>
          <span> Create new vault</span>
        </Button>
      </div>
    </div>
  );
}

Welcome.propTypes = {
  themeMode: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  themeMode: state.menu.themeMode
});

export default connect(mapStateToProps)(Welcome);
