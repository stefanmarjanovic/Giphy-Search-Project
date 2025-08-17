import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styles from './Hero.module.scss';

const Hero = (): JSX.Element => {
  // declare variables 
  const [search, setSearch] = useState('');
  const [results, setResults] = useState<any[]>([]);

  // search handler
  const Search = async() => {
    try{
        const response = await axios.get(`${process.env.REACT_APP_API_URL}search-giphy`,  { params: { q: search }});
        setResults(response.data.data || []);
    } catch (error) {
        console.error('Search failed:', error);
        alert('Oops... something went wrong');
    }
  };

  return(
    <div className={styles.hero}>
      <div className={styles.content}>
        <img src="/nav-logo.png" className={styles.smallImg}/>
        <input className={styles.searchInput} 
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder = "Type your search here ..."
        />
        <br />
        <br />
        <a onClick={Search}>Giphy Search</a>
      </div>
        <div>
            {Array.isArray(results) && results.map(gif => (
              <img key={gif.id} src={gif.images.fixed_height.url} alt={gif.title} />
            ))}
        </div>
    </div>
  );
};

export default Hero;
