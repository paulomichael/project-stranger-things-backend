const express = require('express');
const cors = require('cors');
require('dotenv').config();

const strangerThingsDataset = require('./data/dataset/stranger-things-characters.json');
const StrangerThingsRepository = require('./data/repository/StrangerThings');
const StrangerThingsService = require('./services/StrangerThings');

const app = express();
const PORT = process.env.PORT || 3000;
const UPSIDEDOWN_MODE = (process.env.UPSIDEDOWN_MODE === 'true');

const strangerThingsRepository = new StrangerThingsRepository(
  strangerThingsDataset,
);
const strangerThingsService = new StrangerThingsService(
  strangerThingsRepository,
);

app.use(cors());

app.get('/', (req, res) => {
  const characters = strangerThingsService.search(
    req.query,
    UPSIDEDOWN_MODE,
  );

  res.status(200).json(characters);
});

app.listen(3000, () => {
  console.log(`Escutando na porta ${PORT}`);
  console.log(`UpsideDownMode: ${UPSIDEDOWN_MODE}`);
});
