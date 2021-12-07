const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/index');

module.exports = connection = () => {
  let URI = config.DB_MONGO.URI;
  try {
    mongoose.connect(URI);
  } catch (error) {
    console.log(`Error with the db connection: ${error}`)
  }
}