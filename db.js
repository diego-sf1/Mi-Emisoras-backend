const mysql = require('mysql');
const config = require('./config/index');

const mysqlConnection = mysql.createConnection({
  host: config.DB.host, 
  user: config.DB.user, 
  password: config.DB.password, 
  database: config.DB.database, 
  multipleStatements: true
});

try {
  mysqlConnection.connect();
} catch (error) {
  console.log(`Error connecting with the DB => ${error}`)
}

module.exports = mysqlConnection;