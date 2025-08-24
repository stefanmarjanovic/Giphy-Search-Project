import express from 'express';
import { searchGiphy } from './giphy.service';

const router = express.Router();

// Express route to handle Giphy search requests
router.get('/search-giphy', asyncHandler( async (req, res) => {
  const { q } = req.query;
  console.log('Trying Giphy API request');   
  try {const results = await searchGiphy(String(q), 12);
    res.json(results);
  } catch (error) {
      console.error('Giphy API error:', error);
      res.status(500).json({ error: 'Failed to fetch data from Giphy API', details: error?.message || error });
}
  
  console.log('Completed Giphy API request'); 
}));

// Express Helper to handle async errors in route handler
function asyncHandler(fn: express.RequestHandler) {
  return function (req, res, next) {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

export default router;