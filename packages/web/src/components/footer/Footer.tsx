import React from 'react';
import styles from './Footer.module.scss';

const Footer = (): JSX.Element => (
  <div className={styles.footer}>
    <div className={styles.column}>
      <img src="/logo-white.svg" alt="logo" />
    </div>
    <div className={styles.column}>{/* Column for mailing list */}</div>
  </div>
);

export default Footer;
