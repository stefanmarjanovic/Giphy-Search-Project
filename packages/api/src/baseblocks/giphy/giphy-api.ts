import express from 'express';
import axios from 'axios';
import { searchGiphy } from './giphy.service';

const router = express.Router();

router.get('/search-giphy', asyncHandler( async (req, res) => {
  const { q } = req.query;
  console.log('Trying Giphy API request');   
  try {const results = await searchGiphy(String(q), 10);
    res.json(results);
  } catch (error) {
      console.error('Giphy API error:', error);
      res.status(500).json({ error: 'Failed to fetch data from Giphy API', details: error?.message || error });
}
  
  console.log('Completed Giphy API request'); 
}));

function asyncHandler(fn: express.RequestHandler) {
  return function (req, res, next) {
    Promise.resolve(fn(req, res, next)).catch(next);
  console.log('Giphy route handler hit')
  const baseUrl = process.env.GIPHY_BASE_URL?.replace(/\/+$/, '');
  const endpoint = baseUrl + '/v1/gifs/search';
  console.log('Giphy API endpoint:', endpoint);
  };
}

export default router;