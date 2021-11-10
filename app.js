const express = require('express');
const session = require('express-session');
const morgan = require('morgan');
const app = express();
const config = require('./config/index');
const userRoutes = require('./routes/user.routes');

app.set('port', config.PORT);

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(morgan('dev'));
app.use(session({
  secret: config.SECRET_KEY_TOKEN, 
  resave: false,
  saveUninitialized: false
}));
app.use('/api/users', userRoutes);

module.exports = app;