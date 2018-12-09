require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// app.use(express.static(path.join(__dirname, '/../client/dist/'))).use(bodyParser.json());

app.get('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../client/src/', 'index.html'));
});

app.get('/health', (req, res) => {
  res.json({ status: 'running' });
});

// Endpoint for general movie search
app.get('/movies', (req, res) => {
  // console.log('query', req.query);
  const { query } = req;
  let queryString = `SELECT * FROM titles as t, ratings as r
  WHERE t.tconst = r.tconst AND t.titletype = 'movie'`;

  if (query.year !== undefined) {
    queryString += ` AND t.startyear <= ${query.year} AND t.endyear >= ${query.year}`;
  }

  if (query.isAdult !== undefined) {
    queryString += ` AND t.isAdult = ${query.isAdult}`;
  }

  if (query.sort !== undefined) {
    if (query.sort === 'rating') {
      queryString += ' ORDER BY r.averagerating DESC';
    } else if (query.sort === 'length') {
      queryString += ' ORDER BY t.runtimeminutes DESC';
    } else {
      queryString += ` ORDER BY t.${query.sort}`;
    }
  }

  console.log(queryString);

  res
    .json(req.query)
    .status(200)
    .send();
});

// Endpoint for filtered movie search
app.get('/movies/:filter/:category', (req, res) => {
  const { params, query } = req;

  if (!req.params.category) {
    res.status(404).json('Both Filter and Category are required');
  }
  let queryString = `SELECT * FROM titles as t, ratings as r
  WHERE t.tconst = r.tconst AND t.titletype = 'movie'`;

  if (params.filter === 'genre') {
    let categoryCapAdjusted = params.category.charAt(0).toUpperCase() + params.category.slice(1).toLowerCase();
    string.charAt(0).toUpperCase() + string.slice(1);
    queryString += ` AND strpos(t.genres, '${categoryCapAdjusted}') > 0`;
  } else if (params.filter === 'year') {
    queryString += ` AND t.startyear <= ${params.category} AND t.endyear >= ${params.category}`;
  } else if (params.filter === 'title') {
    queryString += ` AND t.primarytitle = '${params.category}' OR t.originaltitle = '${
      query.category
    }'`;
  } else {
    res.status(404).json('Check your filter selection');
  }

  console.log(queryString);

  if (query.year !== undefined) {
    queryString += ` AND t.startyear <= ${query.year} AND t.endyear >= ${query.year}`;
  }

  if (query.isAdult !== undefined) {
    queryString += ` AND t.isAdult = ${query.isAdult}`;
  }

  if (query.sort !== undefined) {
    if (query.sort === 'rating') {
      queryString += ' ORDER BY r.averagerating DESC';
    } else if (query.sort === 'length') {
      queryString += ' ORDER BY t.runtimeminutes DESC';
    } else {
      queryString += ` ORDER BY t.${query.sort}`;
    }
  }

  console.log(queryString);

  res
    .json(query)
    .status(200)
    .send();
});

app.use(bodyParser.json()).listen(PORT, () => console.log(`IMDB-APP LISTENING ON PORT ${PORT}`));

module.exports = app;
