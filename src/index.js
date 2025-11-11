require('dotenv').config();
const express = require('express');
const cors = require('cors');

const searchRouter = require('./routes/search');
const streamRouter = require('./routes/stream');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/search', searchRouter);
app.use('/stream', streamRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ EchoTube backend rodando na porta ${PORT}`));
