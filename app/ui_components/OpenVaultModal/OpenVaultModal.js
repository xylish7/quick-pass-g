// @flow
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Archive, Datasources, Credentials } from 'buttercup';

import { Button, Modal, Form, Box } from 'react-bulma-components';
import styles from './OpenVaultModal.css';

import type { ThemeColor } from '../../actions/menu';
import type { VaultType } from '../../actions/valut';
import { getVaults, openVault } from '../../actions/vault';

type Props = {
  show: boolean,
  themeColor: ThemeColor,
  vault: VaultType,
  getVaults: () => void,
  openVault: (vault, vaultId: string, password: string) => void,
  onClose: () => void
};

function OpenVaultModal(props: Props) {
  const { show, themeColor, vault, onClose, getVaults, openVault } = props;

  const [error, setError] = useState({
    hasError: false,
    message: '',
    errNo: 0
  });
  const [password, setPassword] = useState('');
  const [openingVault, setOpeningVault] = useState(false);

  /**
   * Ran when open vault button is pressed
   *
   * @param {Event} e
   */
  const handleOpenVault = (e): void => {
    e.preventDefault();
    const { FileDatasource } = Datasources;
    const fileDatasource = new FileDatasource(vault.path);
    const credentials = Credentials.fromPassword(password);
    setOpeningVault(true);
    fileDatasource
      .load(credentials)
      .then(Archive.createFromHistory)
      .then(archive => {
        setOpeningVault(false);
        openVault(archive, vault.id, password);
        setPassword('');
        onClose();
      })
      .catch(err => {
        setOpeningVault(false);
        handleErrors(err.toString());
      });
  };

  /**
   * Handle errors regarding the opening of the vault
   *
   * @param {String} err
   */
  const handleErrors = (err: string): void => {
    if (err.includes('no such file or directory'))
      setError({
        hasError: true,
        message:
          'The vault no longer exists. It was moved or deleted from the original place',
        errNo: 1
      });
    if (err.includes('Authentication failed'))
      setError({
        hasError: true,
        message: 'Wrong password. Please try again!',
        errNo: 2
      });

    if (err.includes('Password must be provided'))
      setError({
        hasError: true,
        message: 'Please provide a password to unlock the vault',
        errNo: 3
      });
  };

  /**
   * Ran when the modal is closed
   */
  const handleCloseModal = (): void => {
    setPassword('');
    onClose();
    // Refetch the vaults in case the opened vault no longer exists
    if (error.errNo === 1) getVaults();
    setError({ hasError: false, message: '', errNo: 0 });
  };

  /**
   * Ran when remove vault button is pressed
   */
  const handleRemoveVault = (): void => {
    setPassword('');
    onClose();
    getVaults();
  };

  return (
    <div>
      <Modal
        show={show}
        onClose={handleCloseModal}
        closeOnBlur
        showClose={false}
      >
        <Modal.Content className={styles.modalContent}>
          <Box className={styles.box}>
            <h1 className="title" align="center">
              Unlock {vault.name}
            </h1>
            <form>
              <Form.Field className={styles.password}>
                <Form.Control>
                  <Form.Input
                    autoFocus
                    color={themeColor}
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                </Form.Control>
                {error.hasError && (
                  <Form.Help color={themeColor}>{error.message}</Form.Help>
                )}
              </Form.Field>

              {error.errNo === 1 ? (
                <Button
                  color={themeColor}
                  rounded
                  fullwidth
                  onClick={handleRemoveVault}
                >
                  REMOVE VAULT FROM EMERALD LOCK
                </Button>
              ) : (
                <Button
                  color={themeColor}
                  rounded
                  fullwidth
                  disabled={openingVault}
                  loading={openingVault}
                  onClick={handleOpenVault}
                >
                  OPEN VAULT
                </Button>
              )}
            </form>
          </Box>
        </Modal.Content>
      </Modal>
    </div>
  );
}

OpenVaultModal.propTypes = {
  show: PropTypes.bool.isRequired,
  themeColor: PropTypes.string.isRequired,
  vault: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  getVaults: PropTypes.func.isRequired,
  openVault: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  themeColor: state.menu.themeColor
});

const mapDispatchToProps = dispatch => ({
  getVaults: () => dispatch(getVaults()),
  openVault: (vault, vaultId, password) =>
    dispatch(openVault(vault, vaultId, password))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OpenVaultModal);
