const route = require('express').Route()

//los enpoint para la api rest

route.use('/v1',require('./api'))

module.exports = route
