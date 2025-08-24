import express from 'express';
import { searchGiphy } from './giphy.service';
import { Giphy } from '@baseline/types/giphy';

const router = express.Router();

// Express route to handle Giphy search requests
router.get('/search-giphy', asyncHandler(async (req, res) => {
  const q = req.query.q;
  const queryString = typeof q === 'string' ? q : '';
  console.log('Trying Giphy API request');
  try {
  const results: Array<Giphy> = await searchGiphy(queryString, 12);
  res.json(results);
  } catch (error) {
    console.error('Giphy API error:', error);
    res.status(500).json({ error: 'Failed to fetch data from Giphy API', details: error?.message || error });
  }
  console.log('Completed Giphy API request');
}));

// Express Helper to handle async errors in route handler
function asyncHandler(fn: (req: express.Request, res: express.Response, next: express.NextFunction) => Promise<any>) {
  return function (req: express.Request, res: express.Response, next: express.NextFunction) {
    fn(req, res, next).catch(next);
  };
}

export default router;