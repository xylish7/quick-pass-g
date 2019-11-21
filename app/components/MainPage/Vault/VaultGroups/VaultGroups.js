// @flow
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { cloneDeep } from 'lodash';

import type { ThemeColor } from '../../../../actions/menu';

import styles from './VaultGroups.css';
import GroupModal from './GroupModal/GroupModal';
import { createGroup } from '../../../../actions/vault';

type Props = {
  selectedVault: Object,
  themeColor: ThemeColor,
  createGroup: (groupName: string) => void
};

function VaultGroups(props: Props) {
  const { selectedVault, themeColor, createGroup } = props;

  const [groups, setGroups] = useState([]);
  const [showGroupModal, setShowGroupModal] = useState(false);

  /**
   * Initialize the groups of the vault
   */
  useEffect(
    () => {
      const groups = selectedVault.vault.getGroups().map(group => ({
        id: group.id,
        name: group.getTitle(),
        isSelected: false
      }));

      setGroups(groups);
    },
    [selectedVault]
  );

  /**
   * Select a group
   *
   * @param {String} groupId
   */
  const handleSelectGroup = (groupId: string): void => {
    const clonedGroups = cloneDeep(groups);
    clonedGroups.forEach(clonedGroup => {
      clonedGroup.id === groupId
        ? (clonedGroup.isSelected = true)
        : (clonedGroup.isSelected = false);
    });

    setGroups(clonedGroups);
  };

  /**
   * Create a new group
   *
   * @param {String} groupName
   */
  const handleCreateGroup = (groupName: string): void => {
    setShowGroupModal(false);
    if (typeof groupName === 'string' && groupName !== '') {
      createGroup(groupName);
    }
  };

  return (
    <div className={styles.root}>
      <div className={`has-text-${themeColor} ${styles.titleContainer}`}>
        <h1 className={styles.title} style={{ fontSize: 20 }}>
          {' '}
          Groups
        </h1>
        <div
          className={`vault-button ${styles.addGroupButton}`}
          onClick={() => setShowGroupModal(true)}
        >
          <i className={`has-text-${themeColor} fas fa-plus`} />
        </div>
      </div>

      <ul>
        {groups.map(group => (
          <li
            key={group.id}
            className={`${
              group.isSelected
                ? `has-background-${themeColor} groups-list-item`
                : 'groups-list-item'
            }`}
            onClick={() => handleSelectGroup(group.id)}
          >
            {group.name === 'Trash' ? (
              <i className="fas fa-trash-alt" />
            ) : (
              <i className="fas fa-layer-group" />
            )}
            {group.name}
          </li>
        ))}
      </ul>
      <GroupModal
        show={showGroupModal}
        themeColor={themeColor}
        onClose={handleCreateGroup}
      />
    </div>
  );
}

VaultGroups.propTypes = {
  themeColor: PropTypes.string.isRequired,
  selectedVault: PropTypes.object.isRequired,
  createGroup: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  themeColor: state.menu.themeColor
});

const mapDispatchToProps = dispatch => ({
  createGroup: groupName => dispatch(createGroup(groupName))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VaultGroups);
