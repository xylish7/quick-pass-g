// @flow
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Split from 'react-split';

import styles from './Vault.css';

import VaultGroups from './VaultGroups/VaultGroups';
import VaultEntities from './VaultEntities/VaultEntities';

type Props = {
  selectedVault: Object
};

function Vault(props: Props) {
  const { selectedVault } = props;

  return (
    <div className={styles.root}>
      <Split
        className={styles.split}
        sizes={[25, 75]}
        minSize={200}
        expandToMin={false}
        gutterSize={8}
        gutterAlign="center"
        snapOffset={5}
        dragInterval={1}
        direction="horizontal"
        cursor="e-resize"
      >
        <VaultGroups selectedVault={selectedVault} />
        <VaultEntities />
      </Split>
    </div>
  );
}

Vault.propTypes = {
  selectedVault: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  selectedVault: state.vault.selectedVault
});

export default connect(mapStateToProps)(Vault);
