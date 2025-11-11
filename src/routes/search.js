const express = require('express');
const router = express.Router();
const { searchVideos } = require('../services/youtube');
const cache = require('../cache');

router.get('/', async (req, res) => {
  try {
    const q = req.query.q;
    if (!q) return res.status(400).json({ error: 'Parâmetro q ausente' });

    const cacheKey = `search:${q}`;
    const cached = cache.get(cacheKey);
    if (cached) return res.json(cached);

    const results = await searchVideos(q);
    cache.set(cacheKey, results, 120);
    res.json(results);
  } catch (err) {
    console.error('Erro na busca:', err);
    res.status(500).json({ error: 'Erro na busca' });
  }
});

module.exports = router;
