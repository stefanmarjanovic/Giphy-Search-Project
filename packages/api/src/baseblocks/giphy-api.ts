import express from 'express';
import axios from 'axios';

const router = express.Router();

router.get('/search-giphy ', async (req, res) => {
  const { q } = req.query;
  const apiKey = process.env.GIPHY_API_KEY; // Stored in .env
  try {
    const response = await axios.get('https://api.giphy.com/v1/gifs/search', {
      params: {
        api_key: apiKey,
        q,
        limit: 10,
      },
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Search failed' });
  }
});

export default router;