const rutas = require('express').Router()

rutas.use('/',(req,res,next)=>{
	if (req.session.logeado) {
		next()
	}else{
		if (req.url.includes('login')) {
			next()
		}else{
			res.redirect('/admin/login')
		}
	}
})

rutas.get('/login',(req,res)=>{
	res.render('login')
})

rutas.get('/',(req,res)=>{
	res.render('admin')
})

module.exports = rutas