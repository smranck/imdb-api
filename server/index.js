require('dotenv').config();
const express = require('express');
// const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// app.use(express.static(path.join(__dirname, '/../client/dist/'))).use(bodyParser.json());

app.get('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../client/src/', 'index.html'));
});

app.listen(PORT, () => console.log(`IMDB-APP LISTENING ON PORT ${PORT}`));

module.exports = app;
