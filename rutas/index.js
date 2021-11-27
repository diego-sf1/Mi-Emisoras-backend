const rutas = require('express').Router()
const {stationByUrl, streamStation, radios, searchStation} = require('../lib/stations')
const http = require('https')

rutas.use('/',(req,res,next)=>{
	res.locals.clase=''
	console.log(req.headers)
	next()
})


rutas.get('/',(req,res)=>{
	res.locals.titulo = 'Inicio'
	res.locals.contenido = 'parcial/home'
	res.locals.clase = 'index'
	res.render('index')
})

rutas.get('/estaciones-en-vivo',(req,res)=>{
	res.locals.contenido = 'parcial/enVivo'
	res.locals.titulo = 'Estaciones en Vivo'
	res.locals.clase = 'envivo'
	res.render('index')
})

rutas.get('/radio/:radio',async (req,res)=>{
  	let siguiendo = false
  	let rutaRadioArray = req.params.radio.split('-')
  	if (req.session.siguiendo) {
    	if (req.session.siguiendo['id']==req.params.radio.split('-')[1]) {
      		siguiendo=true
    	}
  	}
  	let idRadio = req.params.radio.split('-')[1].replace('e','s')
	console.log(idRadio)
	let streamUrl = await streamStation('https://opml.radiotime.com/Tune.ashx?id='+idRadio)
	if (!streamUrl.includes('https')) {
		streamUrl = 'https://eapps-cs.herokuapp.com/'+streamUrl
	}
	const radioInfo = await radios('https://opml.radiotime.com/Describe.ashx?id='+idRadio,req.headers)

	res.locals.audioSRC = streamUrl
	res.locals.infoStation = radioInfo[0]

	res.locals.recomendacion = radioInfo[2]?radioInfo[2]:radioInfo[1]
	res.locals.contenido = 'parcial/radio'
	res.locals.sigue=siguiendo
	res.locals.clase='radio'
	res.locals.banner = 'https://cdn-profiles.tunein.com/'+idRadio+'/images/bannerx.jpg'
	res.render('index')
})

rutas.get('/buscar',async (req,res)=>{
	let resultado=null
	console.log(req.query.s)

	res.locals.contenido = 'parcial/buscar'
	res.locals.resultado = resultado
	res.locals.q=typeof req.query.s!='undefined'?req.query.s:''
	res.render('index')
})

rutas.get('/images/',(req,res)=>{
	console.log('hola')
	console.log(req.query.url)
	http.get(req.query.url,resultado=>{
		//console.log(resultado)
		resultado.pipe(res)
	})
})


module.exports = rutas
