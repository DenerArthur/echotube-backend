const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const searchRouter = require("./routes/search");
const streamRouter = require("./routes/stream");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Rota principal (teste)
app.get("/", (req, res) => {
  res.json({
    status: "✅ online",
    message: "EchoTube Backend rodando com sucesso!",
    version: "1.0.0",
    uptime: process.uptime().toFixed(2) + "s"
  });
});

// Rotas principais
app.use("/search", searchRouter);
app.use("/stream", streamRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});

// Mantém ativo (Railway)
setInterval(() => {
  console.log("⏳ Mantendo servidor ativo...");
}, 60000);
