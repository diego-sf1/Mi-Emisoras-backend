const rutas = require('express').Router()


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


rutas.get('/contrato-de-licencia',(req,res)=>{
	res.locals.contenido = 'parcial/contratoLicencia'
	res.locals.titulo = 'Contrato de Licencia'
	res.locals.clase = ''
	res.render('index')
})

rutas.get('/politica-de-privacidad',(req,res)=>{
	res.locals.contenido = 'parcial/privacidad'
	res.locals.titulo = 'politica de privacidad'
	res.locals.clase = ''
	res.render('index')
})

rutas.get('/politica-derechos-de-autor',(req,res)=>{
	res.locals.contenido = 'parcial/derechoAutor'
	res.locals.titulo = 'politica de Derecho de Autor'
	res.locals.clase = ''
	res.render('index')
})

rutas.get('/politica-cookies',(req,res)=>{
	res.locals.contenido = 'parcial/politicaCookies'
	res.locals.titulo = 'politica de cookies'
	res.locals.clase = ''
	res.render('index')
})

rutas.get('/terminos-y-usos',(req,res)=>{
	res.locals.contenido = 'parcial/terminosyusos'
	res.locals.titulo = 'Termino y Usos'
	res.locals.clase = ''
	res.render('index')
})

rutas.get('/politica-uso-aceptable',(req,res)=>{
	res.locals.contenido = 'parcial/usoaceptable'
	res.locals.titulo = 'Politica de uso aceptable'
	res.locals.clase = ''
	res.render('index')
})
module.exports = rutas