const {Sequelize, DataTypes} = require("sequelize");

const db = require('./database');

const User = db.define("employees", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  firstname: {
    type:DataTypes.STRING,
    allowNull: false
  },
  lastname: {
    type:DataTypes.STRING,
    allowNull:false
  }

}, {
  freezeTableName:true,
  timestamps: false});

module.exports = User;