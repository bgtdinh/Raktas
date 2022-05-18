const { Pool } = require('pg');

const credentials = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
};


const pool = new Pool(credentials);

pool.connect()
  .then( () => {
    console.log('Connected to postgres');
  })
  .catch( (err) => {
    console.error(err);
  });

  module.exports = pool;