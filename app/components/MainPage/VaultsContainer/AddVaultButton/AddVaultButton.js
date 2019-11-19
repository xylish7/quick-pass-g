// @flow
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { remote } from 'electron';

import PropTypes from 'prop-types';

import GrowMenu from '../../../../ui_components/GrowMenu/GrowMenu';
import GrowMenuItem from '../../../../ui_components/GrowMenu/GrowMenuItem/GrowMenuItem';
import CreateVaultModal from '../../../../ui_components/CreateVaultModal/CreateVaultModal';
import { setVault } from '../../../../actions/vault';

type Props = {
  setVault: (vaultPath: string) => void
};

function AddVaultButton(props: Props) {
  const { setVault } = props;

  const [pathToVault, setPathToVault] = useState(undefined);
  const [showGrowMenu, setShowGrowMenu] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  /**
   * Get the path to where the vault should be created
   */
  const createVaultPath = (): void => {
    const path: string = remote.dialog.showSaveDialog();

    if (path) {
      setPathToVault(path);
      // Open the modal to enter the password for the vault wich
      // will be created
      setShowPasswordModal(true);
    } else setPathToVault(undefined);
  };

  /**
   * Open an alredy created vault
   */
  const openVaultPath = (): void => {
    const path: Array<string> = remote.dialog.showOpenDialog();
    if (path) setVault(path[0]);
  };

  const renderAddVaultButton = (
    <div
      className="vault-button add-vault"
      onClick={() => setShowGrowMenu(true)}
    >
      <i className="fas fa-plus" />
    </div>
  );

  return (
    <React.Fragment>
      {renderAddVaultButton}
      <GrowMenu open={showGrowMenu} onClose={() => setShowGrowMenu(false)}>
        <GrowMenuItem text="Create new vault" onClick={createVaultPath}>
          <i className="fas fa-plus" style={{ marginLeft: 3 }} />
        </GrowMenuItem>
        <GrowMenuItem text="Add existing vault" onClick={openVaultPath}>
          <i className="fas fa-box-open" />
        </GrowMenuItem>
      </GrowMenu>
      <CreateVaultModal
        show={showPasswordModal}
        pathToVault={pathToVault}
        onClose={() => setShowPasswordModal(false)}
      />
    </React.Fragment>
  );
}

AddVaultButton.propTypes = {
  setVault: PropTypes.func.isRequired
};

const mapDispatchToPropss = dispatch => ({
  setVault: vaulthPath => dispatch(setVault(vaulthPath))
});

export default connect(
  null,
  mapDispatchToPropss
)(AddVaultButton);
