import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import searchRouter from "./routes/search.js";
import streamRouter from "./routes/stream.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Rota de teste
app.get("/", (req, res) => {
  res.json({
    status: "✅ online",
    message: "EchoTube Backend rodando com sucesso!",
    version: "1.0.2",
    uptime: process.uptime().toFixed(2) + "s",
  });
});

app.use("/search", searchRouter);
app.use("/stream", streamRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});

setInterval(() => {
  console.log("⏳ Mantendo servidor ativo...");
}, 30000);
