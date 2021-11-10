const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  PORT: process.env.PORT,
  SECRET_KEY_TOKEN: process.env.SECRET_KEY_TOKEN,
  DB: {
    host: process.env.DB_host, 
    user: process.env.DB_user, 
    password: process.env.DB_password, 
    database: process.env.DB_database 
  } 
}