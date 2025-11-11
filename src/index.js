require('dotenv').config();
const express = require('express');
const cors = require('cors');

const searchRouter = require('./routes/search');
const streamRouter = require('./routes/stream');

const app = express();
app.use(cors());
app.use(express.json());

// Rota raiz para teste rápido
app.get('/', (req, res) => {
  res.json({
    status: 'online',
    message: 'EchoTube Backend ativo!',
    version: '1.0.0',
  });
});

app.use('/search', searchRouter);
app.use('/stream', streamRouter);

// Railway define automaticamente a porta via variável de ambiente
const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ EchoTube backend rodando na porta ${PORT}`);
});
