// @flow
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import type { ThemeMode } from '../../actions/menu';

import styles from './VaultsContainer.css';

import AddVaultButton from '../AddVaultButton/AddVaultButton';

type Props = {
  themeMode: ThemeMode
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
      <AddVaultButton />
    </div>
  );
}

VaultsContainer.propTypes = {
  themeMode: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  themeMode: state.menu.themeMode
});

export default connect(mapStateToProps)(VaultsContainer);
