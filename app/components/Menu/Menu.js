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
  const { menu, setThemeColor, setThemeMode } = props;

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
  const onSetThemeMode = (themeMode: ThemeMode): void => {
    setThemeMode(themeMode);

    setOpen(false);
  };

  /**
   * Set the theme color of the app
   *
   * @param {ThemeColor} themeColor
   */
  const onSetThemeColor = (themeColor: ThemeColor): void => {
    setThemeColor(themeColor);

    setOpen(false);
  };

  return (
    <div ref={containerRef} className={styles.container}>
      <div
        onClick={() => setOpen(!open)}
        className={`has-background-${menu.themeColor} ${styles.menuToggle} ${
          open ? styles.open : null
        } `}
      >
        <span className={`${styles.fas} fas fa-cog`} />
      </div>

      <div className={`${styles.menuRound} ${open ? styles.open : null} `}>
        <div
          className={styles.btnApp}
          onClick={() => onSetThemeColor('primary')}
        >
          <i className={`${styles.far} has-text-primary fas fa-tint`} />
        </div>
        <div className={styles.btnApp} onClick={() => onSetThemeMode('dark')}>
          {menu.themeMode === 'light' ? (
            <i className={`${styles.far} has-text-warning far fa-moon`} />
          ) : (
            <i className={`${styles.fas} has-text-warning fas fa-moon`} />
          )}
        </div>
        <div className={styles.btnApp} onClick={() => onSetThemeMode('light')}>
          {menu.themeMode === 'light' ? (
            <i className={`${styles.fas} has-text-warning fas fa-sun`} />
          ) : (
            <i className={`${styles.far} has-text-warning far fa-sun`} />
          )}
        </div>
      </div>

      <div className={`${styles.menuLine} ${open ? styles.open : null} `}>
        <div className={styles.btnApp} onClick={() => onSetThemeColor('info')}>
          <i className={`${styles.fas} has-text-info fas fa-tint`} />
        </div>
        <div
          className={styles.btnApp}
          onClick={() => onSetThemeColor('warning')}
        >
          <i className={`${styles.fas} has-text-warning fas fa-tint`} />
        </div>
        <div
          className={styles.btnApp}
          onClick={() => onSetThemeColor('danger')}
        >
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
