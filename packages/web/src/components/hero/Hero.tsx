import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Hero.module.scss';

const Hero = (): JSX.Element => (
  <div className={styles.hero}>
    <div className={styles.content}>
      <h2>Giphy Search</h2>
      <input></input>
      <p>
        Enter Search 
      </p>
      <Link to="/#">Search</Link>
    </div>
    <div className={styles.image}>
      <img src="./placeholder.svg" alt="placeholder" />
    </div>
  </div>
);

export default Hero;
