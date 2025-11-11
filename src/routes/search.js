const express = require("express");
const { searchVideos } = require("../services/youtube");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) return res.status(400).json({ error: "Falta o parâmetro q" });

    const results = await searchVideos(q);
    res.json(results);
  } catch (err) {
    console.error("Erro em /search:", err);
    res.status(500).json({ error: "Erro interno no servidor" });
  }
});

module.exports = router;
