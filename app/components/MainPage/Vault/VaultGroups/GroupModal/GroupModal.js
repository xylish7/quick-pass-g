// @flow
import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Button, Modal, Form, Box } from 'react-bulma-components';
import styles from './GroupModal.css';

import type { ThemeColor } from '../../../../../../actions/menu';

type Props = {
  show: boolean,
  themeColor: ThemeColor,
  onClose: () => void
};

function GroupModal(props: Props) {
  const { show, themeColor, onClose } = props;

  const [groupName, setGroupName] = useState('');
  const [error, setError] = useState({ hasError: false, message: '' });

  const handleCreateGroup = e => {
    e.preventDefault();
    if (groupName === '')
      setError({ hasError: true, message: 'Please enter a group name' });
    else {
      setError({ hasError: false, message: '' });
      setGroupName('');
      onClose(groupName);
    }
  };

  return (
    <Modal show={show} onClose={onClose} closeOnBlur showClose={false}>
      <Modal.Content className={styles.modalContent}>
        <Box className={styles.box}>
          <h1 className="title" align="center">
            New group
          </h1>
          <form>
            <Form.Field className={styles.groupName}>
              <Form.Control>
                <Form.Input
                  autoFocus
                  color={themeColor}
                  type="text"
                  name="group-name"
                  placeholder="Group name"
                  value={groupName}
                  onChange={e => setGroupName(e.target.value)}
                />
              </Form.Control>
              {error.hasError && (
                <Form.Help color={themeColor}>{error.message}</Form.Help>
              )}
            </Form.Field>

            <Button
              color={themeColor}
              rounded
              fullwidth
              onClick={handleCreateGroup}
            >
              CREATE GROUP
            </Button>
          </form>
        </Box>
      </Modal.Content>
    </Modal>
  );
}

GroupModal.propTypes = {
  show: PropTypes.bool.isRequired,
  themeColor: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired
};

export default GroupModal;
