import React, { useState } from 'react';
import styles from './Hero.module.scss';
import axios from 'axios';
import { Giphy } from '@baseline/types/giphy';

// Pagination UI props interface
interface Page {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

// Add pagination as a React function component
const Pagination: React.FC<Page> = ({ currentPage, totalPages, onPageChange }) => {
  const handleClick = (page: number) => {
    if (page > 0 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return(
      <div>
          <button className={styles.paginationButtons} onClick={() => handleClick(currentPage - 1)} disabled={currentPage === 1}> Previous </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button className={styles.paginationButtons} key={index + 1} onClick={() => handleClick(index + 1)} disabled={currentPage === index + 1}> 
              {index + 1}
            </button>
          ))}
          <button className={styles.paginationButtons} onClick={() => handleClick(currentPage + 1)} disabled={currentPage === totalPages}> Next </button>
      </div>
  );
};

const Hero = (): JSX.Element => {
  // Declare variables 
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState('');
  const [results, setResults] = useState<Giphy[]>([]);
  const [selectedGif, setSelectedGif] = useState<Giphy>(null); 
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setPageNumber] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const itemsPerPage = 12;
  const resultsPerPage = results.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Make request to the API layer
  const Search = async() => {
   try{
        setLoading(true);
        const response = await axios.get<Giphy[]>(`${process.env.REACT_APP_API_URL}api/search-giphy`,  { params: { q: search }});
        setResults(Array.isArray(response.data) ? response.data : []);
        console.log("search completed"); 

        // set total page number 
        const pages: number = Math.ceil(response.data.length / itemsPerPage); 
        setTotalPages(pages); 
        console.log("Total pages: " + pages); 
      } catch (error) {
        console.error('Search failed:', error);
        alert('Oops... something went wrong');
      } finally {
        setLoading(false);
      }
  };

  { /* Change Page */ }
  const changePage = ( page: number ) => {
    setPageNumber(page);
  };

  return (
    <>
      {/* Modal for full-size image */}
      {showModal && selectedGif && (
        <div className={styles.modal} onClick={() => setShowModal(false)}>
          <div className={styles.frame} onClick={e => e.stopPropagation()}>
            <button className={styles.modalClose} onClick={() => setShowModal(false)}>&times;</button>
            <img src={selectedGif.images.original.url} alt={selectedGif.title} style={{ maxWidth: '90vw', maxHeight: '80vh', display: 'block', margin: '0 auto' }} />
            <div className={styles.modalTitle}>{selectedGif.title}</div>
            <a href={selectedGif.url} target="_blank" rel="noopener noreferrer" className={styles.modalbutton}>View on Giphy</a>
          </div>
        </div>
      )}

      {/* render div at top center if results are returned */}
      {Array.isArray(results) && results.length > 0 ? (
        <div className={styles.searchNav}>
          <img  className={styles.logo} src="/nav-logo.png"/>
          <input className={styles.input} value={search} onChange={e => setSearch(e.target.value)} placeholder="Type your search here ..."/>
          {/* prefix search() with void to ignore the promise and indicate on further action is required after the search is completed
              all errors are handled outsite the scope */ }
          <button className={styles.searchButton} onClick={() => { void Search(); }} disabled={loading} style={{ cursor: loading ? 'not-allowed' : 'pointer'}}>
            {loading ? (
              <span className={styles.loadingWheel}>
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
      ) : ( /* Default layout */
        <div className={styles.hero}>
          <div className="searchNav" style={{ justifyContent: 'center'}}>
            <img src="/nav-logo.png" className={styles.smallImg} />
            <input className={styles.searchInput}
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Type your search here ..."
              style={{ margin: '12px', width: '320px', textAlign: 'center' }}
            />
            {/* prefix search() with void to ignore the promise and indicate on further action is required after the search is completed
              all errors are handled outsite the scope */ }
            <button onClick={() => { void Search(); }} disabled={loading} className={styles.defaultSearchButton} style={{cursor: loading ? 'not-allowed' : 'pointer'}}>
              {loading ? (
                <span className={styles.defaultLoadingWheel}>
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
        </div>
      )}
      {/* Results Table */}
      <div className={styles.table}>
        {Array.isArray(results) && results.length > 0 && (
          <table className={styles.dimensions}>
            <tbody>
              {Array.from({ length: Math.ceil(resultsPerPage.length / 4) }).map((_, rowIdx) => (  
                <tr key={rowIdx}>
                  {resultsPerPage.slice(rowIdx * 4, rowIdx * 4 + 4).map(gif => (
                    <td className={styles.tableBody} key={gif.id}>
                      {/* Click Image to display Modal */}
                      <img className={styles.giphy} src={gif.images.original.url} alt={gif.title}
                        onClick={() => { setSelectedGif(gif); setShowModal(true); }}/>
                      <div className={styles.title}>{gif.title}</div>
                      <a href={gif.url} target="_blank" rel="noopener noreferrer" style={{ color: '#007bff', textDecoration: 'underline' }}>View on Giphy</a>
                    </td>
                  ))}
                  {Array.from({ length: 4 - resultsPerPage.slice(rowIdx * 4, rowIdx * 4 + 4).length }).map((_, i) => (
                    <td key={`empty-${rowIdx}-${i}`} style={{ width: '25%' }}></td>
                  ))}
                </tr>
              ))}
            </tbody>
      {/* Pagination Row */}
            <tfoot>
              <tr>
                <td className={styles.paginationButtonLayout} colSpan={itemsPerPage}> 
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={changePage}
                  />
                </td>
              </tr>
            </tfoot>
          </table>
        )}
      </div>
    </>
  );
};

export default Hero;
