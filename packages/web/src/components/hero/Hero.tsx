import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Hero.module.scss';
import axios from 'axios';

const Hero = (): JSX.Element => {
  // declare variables 
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [results, setResults] = useState<any[]>([]);

  // make request to the API layer
  const Search = async() => {
  try{
    setLoading(true);
    const response = await axios.get(`${process.env.REACT_APP_API_URL}api/search-giphy`,  { params: { q: search }});
    setResults(response.data || []);
    console.log("search completed"); 
  } catch (error) {
    console.error('Search failed:', error);
    alert('Oops... something went wrong');
  } finally {
    setLoading(false);
  }
  };

  return(
    /* Logo and Search Input field */
    <div className={styles.hero}>
      <div style={{  width: "30%",margin:"0 auto" }}>
        <img src="/nav-logo.png" className={styles.smallImg}/>
        <input
          className={styles.searchInput}
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Type your search here ..."
          style={{ margin: '12px', width: '320px', textAlign: 'center' }}
        />
        <button onClick={Search} disabled={loading}  
        style={{
              display: 'inline-block',
              padding: '10px 24px',
              background: '#007bff',
              color: '#fff',
              borderRadius: '6px',
              cursor: loading ? 'not-allowed' : 'pointer',
              textDecoration: 'none',
              fontWeight: 'bold',
              marginBottom: '8px',
              minWidth: '120px',
            }}>
            {loading ? (
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="24" height="24" viewBox="0 0 50 50" style={{ marginRight: '8px' }}>
                  <circle cx="25" cy="25" r="20" fill="none" stroke="#fff" strokeWidth="5" opacity="0.2" />
                  <circle cx="25" cy="25" r="20" fill="none" stroke="#fff" strokeWidth="5" strokeDasharray="90" strokeDashoffset="60">
                    <animateTransform attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="1s" repeatCount="indefinite" />
                  </circle>
                </svg>
                Loading...
              </span>
            ) : (
              'Search'
            )}
        </button>
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
