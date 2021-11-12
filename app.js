//Intanciamos todo los que vamos a usar
const express = require('express')
const session = require('express-session')
const path = require('path')
const fs = require('fs')

//iniciamos la aplicación
app = express()

//configuramos el motor de renderizado EJS
app.set('views',path.join(__dirname,'views'))
app.set('view engine','ejs')

//Configuramos los endpoints para los archivos de acceso general
app.use(express.static(path.join(__dirname,'public')))
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/dev',express.static(path.join(__dirname,'node_modules/bootstrap/dist')))
app.use('/icons',express.static(path.join(__dirname,'node_modules/bootstrap-icons')))
app.use('/ckeditor4',express.static(path.join(__dirname, 'node_modules/ckeditor4')));

//usamos el middleware de express para sesiones, para que registre las peticiones al servidor
app.use(session({
	secret : '1234',
	resave:false,
	saveUninitialized:true,
	cookie:{
		sameSite:true
	}
}))

//colocamos el enrutador
app.use(require('./route'))

//colocamos una respuesta de error
app.use((req,res)=>{
	res.locals.contenido = '404'
  res.render('index')
})


app.listen(3000,()=>{
  console.log('Servidor Iniciado en el puerto 3000')
})
