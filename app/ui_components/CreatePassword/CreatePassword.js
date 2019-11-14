// @flow
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import styles from './CreatePassword.css';

import { Button, Modal, Section, Form, Box } from 'react-bulma-components';
import type { ThemeColor } from '../../actions/menu';
import useSubmitForm from '../../hooks/SubmitForm';

type Props = {
  show: boolean,
  themeColor: ThemeColor,
  onClose: (password: string) => void
};

function CreatePassword(props: Props) {
  const [passCheck, setPassCheck] = useState({ message: '', isValid: false });

  /**
   * Check to see if the entered password is valid. If it is
   * valid it will send the password to the parrent component.
   * If it's not valid it will prompt a message
   */
  const handleCreateVault = (): void => {
    let isValid: boolean = true;
    let message: string = '';

    if (inputs.password === '' && inputs.confirmPassword === '' && isValid) {
      message = 'Please enter a strong password to protect your emerald vault';
      isValid = false;
      setPassCheck({ message, isValid });
    } else if (inputs.password.length < 10) {
      message = 'Please enter a password which is at last 10 characters long';
      isValid = false;
      setPassCheck({ message, isValid });
    } else if (inputs.password !== inputs.confirmPassword && isValid) {
      message =
        'Make sure that you the password confirmation matches the initial one';
      isValid = false;
      setPassCheck({ message, isValid });
    } else {
      setPassCheck({ message: '', isValid: true });
      // Send the password to the parrent component
      props.onClose(inputs.password);
      // Clear the inputs values so it won't remain visible on the next use
      clearInputs();
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
        show={props.show}
        onClose={() => props.onClose(undefined)}
        {...props.modal}
      >
        <Modal.Content>
          <Box
            style={{
              width: 500,
              margin: 'auto'
            }}
          >
            <h1 className="title" align="center">
              New Password
            </h1>

            <Form.Field>
              <Form.Label>Password</Form.Label>
              <Form.Control>
                <Form.Input
                  color={props.themeColor}
                  type="text"
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
                  color={props.themeColor}
                  type="text"
                  name="confirmPassword"
                  placeholder="Confirm password"
                  value={inputs.confirmPassword}
                  onChange={handleInputChange}
                />
              </Form.Control>
              {!passCheck.isValid && (
                <Form.Help color={props.themeColor}>
                  {passCheck.message}
                </Form.Help>
              )}
            </Form.Field>

            <Button
              color={props.themeColor}
              rounded
              fullwidth
              onClick={handleSubmit}
            >
              CREATE VAULT
            </Button>
          </Box>
        </Modal.Content>
      </Modal>
    </div>
  );
}

CreatePassword.propTypes = {
  show: PropTypes.bool.isRequired,
  themeColor: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  themeColor: state.menu.themeColor
});

export default connect(mapStateToProps)(CreatePassword);
