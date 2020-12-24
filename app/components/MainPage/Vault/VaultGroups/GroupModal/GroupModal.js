// @flow
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Button, Modal, Form, Box } from 'react-bulma-components';
import styles from './GroupModal.css';

import isEmpty from '../../../../../utils/is-empty';
import type { ThemeColor } from '../../../../../../actions/menu';

type Props = {
  show: boolean,
  themeColor: ThemeColor,
  editedGroup: Object,
  createGroup: (groupName: string) => void,
  editGroup: (group: Object) => void,
  onClose: () => void
};

function GroupModal(props: Props) {
  const {
    show,
    themeColor,
    editedGroup,
    createGroup,
    editGroup,
    onClose
  } = props;

  const [groupName, setGroupName] = useState('');
  const [error, setError] = useState({ hasError: false, message: '' });

  useEffect(
    () => {
      setGroupName(editedGroup.name);
    },
    [editedGroup]
  );

  const handleCreateGroup = e => {
    e.preventDefault();
    if (groupName === '' || !groupName)
      setError({ hasError: true, message: 'Please enter a group name' });
    else {
      createGroup(groupName);
      handleModalClose();
    }
  };

  const handleEditGroup = e => {
    e.preventDefault();
    if (groupName === '')
      setError({ hasError: true, message: 'Please enter a group name' });
    else {
      console.log();
      editGroup({ ...editedGroup, name: groupName });
      handleModalClose();
    }
  };

  const handleModalClose = () => {
    setError({ hasError: false, message: '' });
    setGroupName('');
    onClose();
  };

  return (
    <Modal show={show} closeOnBlur showClose={false} onClose={handleModalClose}>
      <Modal.Content className={styles.modalContent}>
        <Box className={styles.box}>
          <h1 className="title" align="center">
            {isEmpty(editedGroup) ? 'New group' : 'Edit Group'}
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
            {isEmpty(editedGroup) ? (
              <Button
                color={themeColor}
                rounded
                fullwidth
                onClick={handleCreateGroup}
              >
                CREATE GROUP
              </Button>
            ) : (
              <Button
                color={themeColor}
                rounded
                fullwidth
                onClick={handleEditGroup}
              >
                SAVE CHANGES
              </Button>
            )}
          </form>
        </Box>
      </Modal.Content>
    </Modal>
  );
}

GroupModal.propTypes = {
  show: PropTypes.bool.isRequired,
  themeColor: PropTypes.string.isRequired,
  editedGroup: PropTypes.object.isRequired,
  createGroup: PropTypes.func.isRequired,
  editGroup: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired
};

export default GroupModal;
