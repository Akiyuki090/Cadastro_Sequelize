const { Sequelize } = require("sequelize");
const dotenv = require("dotenv").config();

const sequelize = new Sequelize("nodeSequelize", `${process.env.user}`, `${process.env.pass}`, {
  host: "localhost",
  dialect: "mysql",
});

module.exports = sequelize
