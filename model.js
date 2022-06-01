// const db = require('./connection');
const {Sequelize, DataTypes} = require("sequelize");

const db = require('./database');

const User = db.define("users", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  username: {
    type:DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull:false
  }

}, {
  freezeTableName:true,
  timestamps: false});

module.exports = User;

// const getUser = (username) => {
//   const sql = 'select * from users where (username=$1)';
//   return db.query(sql, [username]);
// }

// const addUser = (username, password) => {
//   const sql = 'insert into users(username, password) values ($1, $2)';
//   return db.query(sql, [username, password]);
// }


// module.exports = {
//   getUser,
//   addUser
// }