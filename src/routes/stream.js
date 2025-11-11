const express = require('express');
const router = express.Router();
const { getAudioUrl } = require('../services/youtube');

router.get('/', async (req, res) => {
  try {
    const id = req.query.id;
    if (!id) return res.status(400).json({ error: 'Parâmetro id ausente' });

    const audioInfo = await getAudioUrl(id);
    if (!audioInfo) return res.status(404).json({ error: 'Áudio não encontrado' });

    res.json(audioInfo);
  } catch (err) {
    console.error('Erro no stream:', err);
    res.status(500).json({ error: 'Erro ao obter stream' });
  }
});

module.exports = router;
