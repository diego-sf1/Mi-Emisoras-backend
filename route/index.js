const route = require('express').Router()
const CP= require("child_process")
const {catStations, stationByUrl} = require('../lib/stations')
const got = require('got')

route.get('/',(req,res)=>{
	res.locals.contenido = 'parcial/index'
	res.render('index')
})

route.get('/iniciar-sesion',(req,res)=>{
	console.log('Aqui estamos')
	res.locals.contenido='parcial/login'
	res.render('index')
})
route.get('/estaciones-en-vivo',async (req,res)=>{
	console.log(req.connection.remoteAddress)
	let stationsCats = await catStations(req.headers)
	stationsCats.splice(5,1)
	res.locals.cabeza = req.headers['x-forwarded-for']
	res.locals.categorias = stationsCats
	res.locals.contenido = 'parcial/envivo'
	res.render('index')
})

//los enpoint para la api rest


route.use('/v1',require('./api'))

route.get('/reiniciar',(req,res)=>{
	CP.exec('touch '+__dirname+'/tmp/restart.txt',(a,b,c)=>{
	    res.redirect('/ejem1')
	})
})

module.exports = route

