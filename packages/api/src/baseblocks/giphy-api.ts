import express from 'express';
import axios from 'axios';

const router = express.Router();

router.get('/search-giphy', asyncHandler( async (req, res) => {
  const { q } = req.query;
  const apiKey = process.env.GIPHY_API_KEY; // Stored in .env
  const response = await axios.get('https://api.giphy.com/v1/gifs/search', {
    params: {   api_key: apiKey, q, limit: 10 },
  });
    res.json(response.data);
    console.log('Giphy Response hit') 
}));

function asyncHandler(fn: express.RequestHandler) {
  return function (req, res, next) {
    Promise.resolve(fn(req, res, next)).catch(next);
    console.log('Giphy route hit')
  };
}

export default router;