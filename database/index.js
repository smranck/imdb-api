require('dotenv').config();
const { Client } = require('pg');
const path = require('path');
const fs = require('fs');

const client = new Client({
  user:
    process.env.NODE_ENV === 'development'
      ? process.env.DB_USER
      : process.env.PRODUCTION_DATABASE_USER,
  host:
    process.env.NODE_ENV === 'development'
      ? process.env.DATABASE_HOST
      : process.env.PRODUCTION_DATABASE_HOST,
  database: 'coding_challenge',
  password: process.env.NODE_ENV === 'development' ? '' : process.env.PRODUCTION_PASSWORD,
  port: process.env.NODE_ENV === 'development' ? '' : process.env.PRODUCTION_PORT,
  ssl: process.env.NODE_ENV !== 'development',
});

client
  .connect()
  .then()
  .catch(err => console.error('error connecting to postgres db, ', err.stack));

// create tables needed by server
const initializeDB = () => {
  // initialize tables by reading schema files and running as query
  const schemas = ['/schema/ratings.sql', '/schema/titles.sql'];
  return Promise.all(
    schemas.map(schema => new Promise((resolve, reject) => {
      fs.readFile(path.join(__dirname, schema), 'utf8', (err, data) => (err ? reject(err) : resolve(data)));
    }).then(data => client.query(data))),
  );
};

const addToTitles = async (titleData) => {
  try {
    let query = 'INSERT INTO titles (tconst, titletype, primarytitle, originaltitle, isadult, startyear, endyear, runtimeminutes, genres) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *';

    let data = await client.query(query, [
      titleData.tconst,
      titleData.titletype,
      titleData.primarytitle,
      titleData.originaltitle,
      titleData.isadult,
      titleData.startyear,
      titleData.endyear,
      titleData.runtimeminutes,
      titleData.genres,
    ]);
    return data.rows[0];
  } catch (err) {
    console.error(err);
    return err;
  }
};

const addToRatings = async (ratingsData) => {
  try {
    let query = 'INSERT INTO ratings (tconst, averagerating, numvotes) VALUES ($1, $2, $3) returning *';
    let data = await client.query(query, [
      ratingsData.tconst,
      ratingsData.averagerating,
      ratingsData.numvotes,
    ]);
    return data.rows[0];
  } catch (err) {
    console.error(err);
    return err;
  }
};

const getMovies = async (queryString) => {
  try {
    let data = await client.query(queryString);
    return data.rows;
  } catch (err) {
    console.error(err);
    return err;
  }
};

// if (process.env.INITIALIZEDB) {
//   initializeDB()
//     .then()
//     .catch(err => console.error('error creating database tables, ', err.stack));
// }

module.exports = {
  addToRatings,
  addToTitles,
  getMovies,
};
