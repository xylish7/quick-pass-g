// @flow
import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import type { ThemeMode } from '../../actions/menu';

import styles from './Menu.css';

type Props = {
  setThemeMode: (mode: ThemeMode) => void
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
  const handleClick = e => {
    if (!containerRef.current.contains(e.target)) {
      setOpen(false);
    }
  };

  const setThemeMode = (mode: ThemeMode) => {
    if (mode === 'light')
      document.documentElement.setAttribute('data-theme', 'light');
    if (mode === 'dark')
      document.documentElement.setAttribute('data-theme', 'dark');

    setOpen(false);

    props.setThemeMode(mode);
  };

  return (
    <div ref={containerRef} className={styles.container}>
      <div
        onClick={() => setOpen(!open)}
        className={`${styles.menuToggle} ${open ? styles.open : null} `}
      >
        <span className={`${styles.fas} fas fa-plus`} />
      </div>

      <div className={`${styles.menuRound} ${open ? styles.open : null} `}>
        <div className={styles.btnApp} onClick={() => setOpen(false)}>
          <i className={`${styles.far} has-text-primary fas fa-tint`} />
        </div>
        <div className={styles.btnApp} onClick={() => setThemeMode('dark')}>
          <i className={`${styles.far} has-text-warning far fa-moon`} />
        </div>
        <div className={styles.btnApp} onClick={() => setThemeMode('light')}>
          <i className={`${styles.far} has-text-warning far fa-sun`} />
        </div>
      </div>

      <div className={`${styles.menuLine} ${open ? styles.open : null} `}>
        <div className={styles.btnApp} onClick={() => setOpen(false)}>
          <i className={`${styles.fas} has-text-info fas fa-tint`} />
        </div>
        <div className={styles.btnApp} onClick={() => setOpen(false)}>
          <i className={`${styles.fas} has-text-warning fas fa-tint`} />
        </div>
        <div className={styles.btnApp} onClick={() => setOpen(false)}>
          <i className={`${styles.fas} has-text-danger fas fa-tint`} />
        </div>
      </div>
    </div>
  );
}

Menu.propTypes = {
  setThemeMode: PropTypes.func.isRequired
};

export default Menu;
