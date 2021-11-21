const express = require('express')
const path = require('path')
const session = require('express-session')



app = express()

app.set('views',path.join(__dirname,'vista'))
app.set('view engine','ejs')

app.use(express.static(path.join(__dirname,'publico')))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(session({
	secret : '1234',
	resave:false,
	saveUninitialized:true,
	cookie:{
		sameSite:true
	}
}))

app.use('/v1',require('./rutas/api'))
app.use('/admin',require('./rutas/admin'))
app.use('/',require('./rutas'))

app.use((req,res)=>{
	res.locals.encabezado = 'parcial/mainHeader'
	res.locals.contenido = '404'
	res.locals.clase = 'error'
	res.render('index')
})


app.listen(3000,()=>{
	console.log('servidor iniciado en el puerto 3000')
})
