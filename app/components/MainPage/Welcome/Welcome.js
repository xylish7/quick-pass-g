import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { remote } from 'electron';
import type { ThemeMode } from '../../../actions/menu';

import styles from './Welcome.css';

import { Button } from 'react-bulma-components';
import appIcon from '../../../../resources/icons/256x256.png';

type Props = {
  themeMode: ThemeMode
};

function Welcome(props: Props) {
  const createNewVault = (): void => {
    const pathToVault: string = remote.dialog.showSaveDialog();
    console.log('TCL: createNewVault -> pathToVault', pathToVault);
  };

  return (
    <div className={styles.container}>
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
          onClick={createNewVault}
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
