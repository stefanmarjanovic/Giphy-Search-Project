import React from 'react';
import { Link } from 'react-router-dom';
import styles from './AboutBanner.module.scss';

const AboutBanner = (): JSX.Element => (
  <div className={styles.aboutBanner}>
    <div className={styles.content}>
      <h3>About us</h3>
      <p>
        Welcome to Giphy Search! This project is a modern GIF search engine built with React and TypeScript, seamlessly connecting to the Giphy.com API.
          <br />
          <br />
        Easily discover, explore, and share trending GIFs with a fast and intuitive interface. Powered by robust API integration, Giph Search delivers real-time results and a smooth user experience. 
        Whether you&apos;re looking for the perfect reaction or just browsing for fun, Giph Search makes finding GIFs simple and enjoyable.
      </p>
      <Link to="/#">Contact Us</Link>
    </div>
    <div className={styles.image}>
      <img src="./logo-gif-search.png" alt="placeholder" />
    </div>
  </div>
);

export default AboutBanner;
