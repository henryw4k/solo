var mysql = require('mysql');
var Sequelize = require("sequelize");
var sequelize = new Sequelize("schat", "root", "");
module.exports = sequelize;

// Create a database connection and export it from this file.
// You will need to connect with the user "root", no password,
// and to the database "chat".
