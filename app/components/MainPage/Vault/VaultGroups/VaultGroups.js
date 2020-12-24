// @flow
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { cloneDeep } from 'lodash';

import type { ThemeColor } from '../../../../actions/menu';

import styles from './VaultGroups.css';
import GroupModal from './GroupModal/GroupModal';
import { createGroup, editGroup } from '../../../../actions/vault';

type Props = {
  selectedVault: Object,
  themeColor: ThemeColor,
  createGroup: (groupName: string) => void,
  editGroup: (group: Object) => void
};

function VaultGroups(props: Props) {
  const { selectedVault, themeColor, createGroup, editGroup } = props;

  const [editedGroup, setEditedGroup] = useState({});
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
        isSelected: false,
        isHovered: false
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
   * On hover of a group show the edit icon
   *
   * @param {String} groupId
   */
  const handleHoverGroup = (groupId: string, hovered: boolean = true): void => {
    const clonedGroups = cloneDeep(groups);

    if (hovered) {
      clonedGroups.forEach(clonedGroup => {
        clonedGroup.id === groupId
          ? (clonedGroup.isHovered = true)
          : (clonedGroup.isHovered = false);
      });
    } else {
      clonedGroups.forEach(clonedGroup => {
        clonedGroup.isHovered = false;
      });
    }

    setGroups(clonedGroups);
  };

  return (
    <div className={styles.root}>
      <div className={`has-text-${themeColor} ${styles.titleContainer}`}>
        <h1 className={styles.title} style={{ fontSize: 20 }}>
          Groups
        </h1>
        <div
          className={`vault-button ${styles.addGroupButton}`}
          onClick={() => {
            setEditedGroup({});
            setShowGroupModal(true);
          }}
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
            onMouseEnter={() => handleHoverGroup(group.id)}
            onMouseLeave={() => handleHoverGroup(group.id, false)}
          >
            {group.name === 'Trash' ? (
              <React.Fragment>
                <div>
                  <i className={`fas fa-trash-alt ${styles.groupIcon}`} />
                  {group.name}
                </div>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <div className={styles.groupName}>
                  <i className={`fas fa-layer-group ${styles.groupIcon}`} />
                  {group.name}
                </div>
                {group.isHovered && (
                  <i
                    className="fas fa-edit edit-group-icon"
                    onClick={() => {
                      setEditedGroup(group);
                      setShowGroupModal(true);
                    }}
                  />
                )}
              </React.Fragment>
            )}
          </li>
        ))}
      </ul>
      <GroupModal
        editedGroup={editedGroup}
        show={showGroupModal}
        themeColor={themeColor}
        onClose={() => setShowGroupModal(false)}
        createGroup={createGroup}
        editGroup={editGroup}
      />
    </div>
  );
}

VaultGroups.propTypes = {
  themeColor: PropTypes.string.isRequired,
  selectedVault: PropTypes.object.isRequired,
  createGroup: PropTypes.func.isRequired,
  editGroup: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  themeColor: state.menu.themeColor
});

const mapDispatchToProps = dispatch => ({
  createGroup: groupName => dispatch(createGroup(groupName)),
  editGroup: group => dispatch(editGroup(group))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VaultGroups);
