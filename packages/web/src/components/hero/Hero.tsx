import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Hero.module.scss';
import axios from 'axios';

const Hero = (): JSX.Element => {
  // declare variables 
  const [search, setSearch] = useState('');
  const [results, setResults] = useState<any[]>([]);

  // make request to the API layer
  const Search = async() => {
  try{
    const response = await axios.get(`${process.env.REACT_APP_API_URL}api/search-giphy`,  { params: { q: search }});
    setResults(response.data || []);
    console.log("search completed"); 
  } catch (error) {
    console.error('Search failed:', error);
    alert('Oops... something went wrong');
  }
  };

  return(
    <div className={styles.hero}>
      <div style={{  flexDirection: 'column'}}>
        <img src="/nav-logo.png" className={styles.smallImg}/>
        <input
          className={styles.searchInput}
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Type your search here ..."
          style={{ margin: '12px', width: '320px', textAlign: 'center' }}
        />
        <a onClick={Search} style={{
              display: 'inline-block',
              padding: '10px 24px',
              background: '#007bff',
              color: '#fff',
              borderRadius: '6px',
              cursor: 'pointer',
              textDecoration: 'none',
              fontWeight: 'bold',
              marginBottom: '8px',
            }}>
            Giphy Search
        </a>
      </div>
      <div style={{ display: 'flex', justifyContent: 'right' }}>
        {Array.isArray(results) && results.length > 0 && (
          <table style={{ width: '100%', maxWidth: '1200px', borderCollapse: 'collapse', margin: '0 auto' }}>
            <tbody>
              {Array.from({ length: Math.ceil(results.length / 3) }).map((_, rowIdx) => (
                <tr key={rowIdx}>
                  {results.slice(rowIdx * 3, rowIdx * 3 + 3).map(gif => (
                    <td key={gif.id} style={{ border: '0px solid #ccc', padding: '16px', textAlign: 'center', verticalAlign: 'top', width: '33%' }}>
                      <img src={gif.images.original.url} alt={gif.title} style={{ maxWidth: '120px', maxHeight: '120px', display: 'block', margin: '0 auto 8px' }} />
                      <div style={{ fontWeight: 'bold', marginBottom: '6px' }}>{gif.title}</div>
                      <a href={gif.url} target="_blank" rel="noopener noreferrer" style={{ color: '#007bff', textDecoration: 'underline' }}>View on Giphy</a>
                    </td>
                  ))}
                  {/* Null */}
                  {Array.from({ length: 3 - results.slice(rowIdx * 3, rowIdx * 3 + 3).length }).map((_, i) => (
                    <td key={`empty-${rowIdx}-${i}`} style={{ width: '33%' }}></td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Hero;
