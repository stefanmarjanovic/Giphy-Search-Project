import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Hero.module.scss';

const Hero = (): JSX.Element => (
  <div className={styles.hero}>
    <div className={styles.content}>
      <img src="/nav-logo.png" className={styles.smallImg}/>
      <input className={styles.searchInput} />
      <br />
      <br />
      <Link to="/#">Giphy Search</Link>
    </div>
  </div>
);

export default Hero;
