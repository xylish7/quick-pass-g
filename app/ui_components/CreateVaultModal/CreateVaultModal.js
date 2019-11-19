// @flow
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Archive, Datasources, Credentials } from 'buttercup';

import { Button, Modal, Form, Box } from 'react-bulma-components';
import styles from './CreateVaultModal.css';

import type { ThemeColor } from '../../actions/menu';
import useSubmitForm from '../../hooks/SubmitForm';
import { setVault } from '../../actions/vault';

type Props = {
  show: boolean,
  themeColor: ThemeColor,
  pathToVault: string,
  onClose: () => void,
  setVault: (vaultPath: string) => void
};

function CreateVaultModal(props: Props) {
  const { show, themeColor, pathToVault, onClose, setVault } = props;

  const [passCheck, setPassCheck] = useState({ message: '', isValid: false });
  /**
   * Check to see if the entered password is valid. If it is
   * valid it will send the password to the parrent component.
   * If it's not valid it will prompt a message
   */
  const handleCreateVault = (): void => {
    validatePassword(isValid => {
      if (isValid) {
        // Create the vault
        createVault();

        // Clear the inputs values so it won't remain visible on the next use
        clearInputs();

        // Close modal
        onClose();
      }
    });
  };

  /**
   * Check to see if the provided password is a strong one then
   * call the [callback]
   *
   * @param {Function} callback
   */
  const validatePassword = (callback: (isValid: string) => void): void => {
    let isValid: boolean = true;
    let message: string = '';

    if (inputs.password === '' && inputs.confirmPassword === '' && isValid) {
      message = 'Please enter a strong password to protect your emerald vault';
      isValid = false;
    } else if (inputs.password.length < 10) {
      message = 'Please enter a password which is at last 10 characters long';
      isValid = false;
    } else if (inputs.password !== inputs.confirmPassword && isValid) {
      message =
        'Make sure that you the password confirmation matches the initial one';
      isValid = false;
    } else {
      isValid = true;
      message = '';
    }
    setPassCheck({ message, isValid });

    callback(isValid);
  };

  /**
   * Create the vault using the provided password
   */
  const createVault = (): void => {
    if (pathToVault) {
      const { FileDatasource } = Datasources;

      const fileDatasource = new FileDatasource(pathToVault);
      const archive = Archive.createWithDefaults();
      const credentials = Credentials.fromPassword(inputs.password);
      fileDatasource.save(archive.getHistory(), credentials);
      setVault(pathToVault);
    }
  };

  const {
    inputs,
    handleInputChange,
    handleSubmit,
    clearInputs
  } = useSubmitForm(
    {
      password: '',
      confirmPassword: ''
    },
    handleCreateVault
  );

  return (
    <div>
      <Modal
        show={show}
        closeOnBlur
        showClose={false}
        onClose={() => {
          setPassCheck({ message: '', isValid: false });
          clearInputs();
          onClose();
        }}
      >
        <Modal.Content className={styles.modalContent}>
          <Box className={styles.box}>
            <h1 className="title" align="center">
              Secure your vault
            </h1>
            <form>
              <Form.Field>
                <Form.Label>Password</Form.Label>
                <Form.Control>
                  <Form.Input
                    autoFocus
                    color={themeColor}
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={inputs.password}
                    onChange={handleInputChange}
                  />
                </Form.Control>
              </Form.Field>

              <Form.Field className={styles.confirmPassword}>
                <Form.Label>Confirm password</Form.Label>
                <Form.Control>
                  <Form.Input
                    color={themeColor}
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm password"
                    value={inputs.confirmPassword}
                    onChange={handleInputChange}
                  />
                </Form.Control>
                {!passCheck.isValid && (
                  <Form.Help color={themeColor}>{passCheck.message}</Form.Help>
                )}
              </Form.Field>

              <Button
                color={themeColor}
                rounded
                fullwidth
                onClick={handleSubmit}
              >
                CREATE VAULT
              </Button>
            </form>
          </Box>
        </Modal.Content>
      </Modal>
    </div>
  );
}

CreateVaultModal.propTypes = {
  show: PropTypes.bool.isRequired,
  themeColor: PropTypes.string.isRequired,
  pathToVault: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  setVault: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  themeColor: state.menu.themeColor
});

const mapDispatchToProps = dispatch => ({
  setVault: vaultPath => dispatch(setVault(vaultPath))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateVaultModal);
