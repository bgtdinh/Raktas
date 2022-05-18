const db = require('./connection');

const getUser = (username) => {
  const sql = 'select * from users where (username=$1)';
  return db.query(sql, [username]);
}

const addUser = (username, password) => {
  const sql = 'insert into users(username, password) values ($1, $2)';
  return db.query(sql, [username, password]);
}


module.exports = {
  getUser,
  addUser
}