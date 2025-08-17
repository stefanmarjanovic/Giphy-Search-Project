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
    res.status(500).json({ error: 'Failed to fetch data from Giphy API' });
  }
  
  console.log('Trying Giphjy API request'); 
}));

function asyncHandler(fn: express.RequestHandler) {
  return function (req, res, next) {
    Promise.resolve(fn(req, res, next)).catch(next);
    console.log('Giphy route hit')
    console.log('Base URL: ' + (process.env.GIPHY_BASE_URL + '/api/search'));
    console.log('API KEY: ' + (process.env.GIPHY_API_KEY));
  };
}

export default router;