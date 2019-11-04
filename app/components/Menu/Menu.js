// @flow
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import type { ThemeMode, ThemeColor } from '../../actions/menu';
import type { MenuState } from '../../reducers/menu';

import styles from './Menu.css';

type Props = {
  menu: MenuState,
  setThemeMode: (themeMode: ThemeMode) => void,
  setThemeColor: (themeColor: ThemeColor) => void
};

function Menu(props: Props) {
  const containerRef = useRef(null);
  const [open: boolean, setOpen] = useState(false);

  // Listen to mousedown event
  useEffect(() => {
    document.addEventListener('mousedown', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
    };
  }, []);

  /**
   * Handle outside click so the menu will close
   *
   * @param {Event} e
   */
  const handleClick = (e): void => {
    if (!containerRef.current.contains(e.target)) {
      setOpen(false);
    }
  };

  /**
   * Set the theme mode of the app
   *
   * @param {ThemeMode} themeMode
   */
  const setThemeMode = (themeMode: ThemeMode): void => {
    props.setThemeMode(themeMode);

    setOpen(false);
  };

  /**
   * Set the theme color of the app
   *
   * @param {ThemeColor} themeColor
   */
  const setThemeColor = (themeColor: ThemeColor): void => {
    props.setThemeColor(themeColor);

    setOpen(false);
  };

  // Custom style of the menu togle button dependet of the
  // [themeColor] prop
  let menuToggleBackground: string;
  switch (props.menu.themeColor) {
    case 'primary':
      menuToggleBackground = 'rgb(0, 209, 178)';
      break;
    case 'info':
      menuToggleBackground = 'rgb(32, 156, 238)';
      break;
    case 'warning':
      menuToggleBackground = 'rgb(255, 221, 87)';
      break;
    case 'danger':
      menuToggleBackground = 'rgb(255, 56, 96)';
      break;
    default:
      break;
  }

  return (
    <div ref={containerRef} className={styles.container}>
      <div
        onClick={() => setOpen(!open)}
        style={{ backgroundColor: menuToggleBackground }}
        className={`${styles.menuToggle} ${open ? styles.open : null} `}
      >
        <span className={`${styles.fas} fas fa-plus`} />
      </div>

      <div className={`${styles.menuRound} ${open ? styles.open : null} `}>
        <div className={styles.btnApp} onClick={() => setThemeColor('primary')}>
          <i className={`${styles.far} has-text-primary fas fa-tint`} />
        </div>
        <div className={styles.btnApp} onClick={() => setThemeMode('dark')}>
          {props.menu.themeMode === 'light' ? (
            <i className={`${styles.far} has-text-warning far fa-moon`} />
          ) : (
            <i className={`${styles.fas} has-text-warning fas fa-moon`} />
          )}
        </div>
        <div className={styles.btnApp} onClick={() => setThemeMode('light')}>
          {props.menu.themeMode === 'light' ? (
            <i className={`${styles.fas} has-text-warning fas fa-sun`} />
          ) : (
            <i className={`${styles.far} has-text-warning far fa-sun`} />
          )}
        </div>
      </div>

      <div className={`${styles.menuLine} ${open ? styles.open : null} `}>
        <div className={styles.btnApp} onClick={() => setThemeColor('info')}>
          <i className={`${styles.fas} has-text-info fas fa-tint`} />
        </div>
        <div className={styles.btnApp} onClick={() => setThemeColor('warning')}>
          <i className={`${styles.fas} has-text-warning fas fa-tint`} />
        </div>
        <div className={styles.btnApp} onClick={() => setThemeColor('danger')}>
          <i className={`${styles.fas} has-text-danger fas fa-tint`} />
        </div>
      </div>
    </div>
  );
}

Menu.propTypes = {
  menu: PropTypes.object.isRequired,
  setThemeMode: PropTypes.func.isRequired,
  setThemeColor: PropTypes.func.isRequired
};

export default Menu;
