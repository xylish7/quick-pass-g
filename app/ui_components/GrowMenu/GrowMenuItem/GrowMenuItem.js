// @flow
import React from 'react';
import PropTypes from 'prop-types';

import styles from './GrowMenuItem.css';

type Props = {
  children: Node,
  text: string
};

/**
 * As [children] use an <i> icon element
 *
 * @param {Object} props
 */
function GrowMenuItem(props: Props) {
  const { children, text, ...other } = props;

  return (
    <li className="grow-menu-list-item" {...other}>
      {children && <div className={styles.icon}>{children}</div>}
      {text}
    </li>
  );
}

GrowMenuItem.propTypes = {
  children: PropTypes.node.isRequired,
  text: PropTypes.string.isRequired
};

export default GrowMenuItem;
