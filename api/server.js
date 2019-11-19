const express = require('express');
const bodyParser = require('body-parser');
const uuid = require('uuid/v4');

const app = express();

const map = new Map();

app.use(bodyParser.json());

app.post('/clippings', (req, res) => {
  const id = uuid();
  map.set(id, req.body.clipping);
  res.status(201).json({url: `http://localhost:3000/clippings/${id}`});
});

app.get('/clippings/:clippingId', (req, res) => {
  const { clippingId } = req.params;
  res.status(200).json({ clipping: map.get(clippingId) });
});

app.listen(3000);
