require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('../database/index');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '/../client/dist/'))).use(bodyParser.json());

app.get('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../client/dist', 'index.jsx'));
});

app.get('/health', (req, res) => {
  res.json({ status: 'running' });
});

app.get('/config', (req, res) => {
  res.json({ PRODUCTION_DATABASE_USER: process.env.PRODUCTION_DATABASE_USER });
});

// Endpoint for general movie search
app.get('/movies', async (req, res) => {
  const { query } = req;
  console.log(query);
  let queryString = `SELECT * FROM titles as t, ratings as r
  WHERE t.tconst = r.tconst AND t.titletype = 'movie'`;

  if (query.year !== undefined) {
    queryString += ` AND t.startyear = ${query.year}`;
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

  // Handle cases where all movies would be returned
  queryString += ' LIMIT 1000';
  let data = await db.getMovies(queryString);

  if (data.length === 0) {
    res.json({ message: 'No results were found. Try another search' });
  } else {
    res.json(data);
  }
});

// Endpoint for filtered movie search
app.get('/movies/:filter/:category', async (req, res) => {
  const { params, query } = req;

  if (!req.params.category) {
    res.status(404).json('Both Filter and Category are required');
  }
  let queryString = `SELECT * FROM titles as t, ratings as r
  WHERE t.tconst = r.tconst AND t.titletype = 'movie'`;

  if (params.filter === 'genre') {
    // Handle genre inputs with incorrect capitalization
    let categoryCapAdjusted = params.category.charAt(0).toUpperCase();
    categoryCapAdjusted += params.category.slice(1).toLowerCase();
    queryString += ` AND strpos(t.genres, '${categoryCapAdjusted}') > 0`;
  } else if (params.filter === 'year') {
    queryString += ` AND t.startyear = ${params.category}`;
  } else {
    res.status(404).json('Check your filter selection');
  }

  if (query.year !== undefined) {
    queryString += ` AND t.startyear = ${query.year}`;
  }

  if (query.isAdult !== undefined) {
    queryString += ` AND t.isAdult = ${query.isAdult}`;
  }
  if (query.title !== undefined) {
    queryString += ` AND t.primarytitle = '${params.category}' OR t.originaltitle = '${
      query.category
    }'`;
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

  queryString += ' LIMIT 1000';
  let data = await db.getMovies(queryString);

  if (data.length === 0) {
    res.json({ message: 'No results were found. Try another search' });
  } else {
    res.json(data);
  }
});

app.use(bodyParser.json()).listen(PORT, () => console.log(`IMDB-APP LISTENING ON PORT ${PORT}`));

module.exports = app;
