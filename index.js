// const request = require('request-promise');
const { MongoClient } = require('mongodb');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI;
const DB_NAME = process.env.DB_NAME;
const COLLECTION_NAME = 'truck-reporting';
// const make311Request = payload => request('someurl.com', payload);

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (_req, res) => {
  res.sendFile(path.resolve(__dirname, 'index.html'));
});

app.post('/report', async (req, res) => {
  try {
    const {
      company,
      date,
      licensePlate,
      location
    } = req.body;

    const client = await MongoClient.connect(MONGODB_URI);
    const Trucks = client.db(DB_NAME).collection(COLLECTION_NAME);
    await Trucks.insertOne({
      company,
      date,
      licensePlate,
      location
    });

    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

app.listen(process.env.PORT || 3000, () => console.log('server running'));
