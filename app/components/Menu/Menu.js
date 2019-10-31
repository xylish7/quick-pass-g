// @flow
import React, { useState, useEffect, useRef } from 'react';

import styles from './Menu.css';

function Menu() {
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
  const handleClick = (e: event) => {
    if (!containerRef.current.contains(e.target)) {
      setOpen(false);
    }
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
        <div className={styles.btnApp} onClick={() => setOpen(false)}>
          <i className={`${styles.far} has-text-warning far fa-moon`} />
        </div>
        <div className={styles.btnApp} onClick={() => setOpen(false)}>
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

export default Menu;
