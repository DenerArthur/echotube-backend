import express from "express";
import { getAudioUrl } from "../services/youtube.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { id } = req.query;
    if (!id) return res.status(400).json({ error: "Falta o parâmetro id" });
    const result = await getAudioUrl(id);
    res.json(result);
  } catch (err) {
    console.error("Erro em /stream:", err);
    res.status(500).json({ error: "Erro interno no servidor" });
  }
});

export default router;
