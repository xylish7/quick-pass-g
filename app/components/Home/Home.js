// @flow
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { clipboard } from 'electron';

import { Button, Columns, Form, Icon } from 'react-bulma-components';
import styles from './Home.css';

import generatePassword from '../../utils/generate-password';

import Checkbox from '../../ui_components/Checkbox';
import Menu from '../../containers/Menu';
import type { MenuState } from '../../reducers/menu';

type Checkboxes = {
  upperCase: boolean,
  lowerCase: boolean,
  digits: boolean,
  special: boolean
};

type Props = {
  menu: MenuState
};

function Home(props: Props) {
  const [isCopied: boolean, setIsCopied] = useState(false);
  const [isChecked: boolean, setIsChecked] = useState(true);
  const [passLength: number, setPassLength] = useState(10);
  const [password: string, setPassword] = useState('');
  const [checkboxes: Checkboxes, setCheckboxes] = useState({
    upperCase: false,
    lowerCase: false,
    digits: false,
    special: false
  });

  /**
   * Handle the check/uncheck of the checkboxes
   *
   * @param {String} name
   * @param {Boolean} isChecked
   */
  const onCheckboxClick = (name: string, checked: boolean): void => {
    setCheckboxes({ ...checkboxes, [name]: checked });
  };

  /**
   * Check if any of the checkboxes is checked then set the
   * [password] to the generated password
   */
  const generatePass = (): void => {
    checkboxCheck();

    if (checkboxCheck())
      setPassword(
        generatePassword(
          checkboxes.lowerCase,
          checkboxes.upperCase,
          checkboxes.digits,
          checkboxes.special,
          passLength
        )
      );
  };

  /**
   * Check if any of the checkboxes is checked. If
   * at least one if them is checked return [true]
   * otherwise returns [false]
   *
   * @returns {Boolean}
   */
  const checkboxCheck = (): boolean => {
    const totalChecks: number = Object.values(checkboxes).filter(
      checked => checked === true
    ).length;

    if (totalChecks > 0) {
      setIsChecked(true);
      return true;
    }

    setPassword('');
    setIsChecked(false);
    return false;
  };

  /**
   * Copy password to clipboard
   */
  const copyToClipboard = (): void => {
    if (password !== '') {
      clipboard.writeText(password);
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    }
  };

  return (
    <div className={styles.root}>
      <Menu />
      {/* Title */}
      <h2 className={`has-text-${props.menu.themeColor} ${styles.title}`}>
        Emerald Lock
      </h2>

      {/* Password input filed */}
      <Form.Field className={styles.passwordFormField}>
        <Form.Control iconRight>
          <Form.Input type="text" value={password} readOnly />

          {!isChecked && (
            <Form.Help color={props.menu.themeColor}>
              Please select one or more of the charsets below
            </Form.Help>
          )}
        </Form.Control>
        {/* Password input field clipboard icon */}
        <Icon
          className={styles.clipboardIcon}
          style={{ height: 36, width: 40 }}
          color={props.menu.themeColor}
          onClick={copyToClipboard}
        >
          {isCopied ? (
            <i className="fas fa-check" />
          ) : (
            <i className="far fa-clipboard" />
          )}
        </Icon>
      </Form.Field>
      {/* Length of the password + checkboxes */}
      <div className={styles.passwordOptions}>
        {/* Password Length */}
        <div className="columns is-mobile" style={{ marginBottom: 0 }}>
          <Columns.Column>
            <p className={styles.passLength}>Length:</p>
          </Columns.Column>
          <Columns.Column className="is-three-quarters">
            <Form.Control className={styles.passLengthInput}>
              <Form.Input
                size="small"
                type="number"
                value={passLength}
                min="8"
                max="20"
                onChange={e => setPassLength(e.target.value)}
              />
            </Form.Control>
          </Columns.Column>
        </div>
        {/* Upper case */}
        <Checkbox
          type="checkbox"
          color={props.menu.themeColor}
          size="small"
          name="upperCase"
          label="Upper-case (A, B, C, ...)"
          checked={checkboxes.upperCase}
          onClick={onCheckboxClick}
        />
        {/* Lower case */}
        <Checkbox
          type="checkbox"
          color={props.menu.themeColor}
          size="small"
          name="lowerCase"
          label="Lower-case (a, b, c, ...)"
          checked={checkboxes.lowerCase}
          onClick={onCheckboxClick}
        />
        {/* Digits */}
        <Checkbox
          type="checkbox"
          color={props.menu.themeColor}
          size="small"
          name="digits"
          label="Digits (0, 1, 2, ...)"
          checked={checkboxes.digits}
          onClick={onCheckboxClick}
        />
        {/* Special characters */}
        <Checkbox
          type="checkbox"
          color={props.menu.themeColor}
          size="small"
          name="special"
          label="Special (!, $, %, ...)"
          checked={checkboxes.special}
          onClick={onCheckboxClick}
        />
      </div>
      {/* Generate password button */}
      <Button color={props.menu.themeColor} fullwidth onClick={generatePass}>
        Generate password
      </Button>
    </div>
  );
}

Home.propTypes = {
  menu: PropTypes.object.isRequired
};

export default Home;
