const api = require('express').Router()
const {stationByUrl,searchStation} = require('../lib/stations')

api.get('/emisorasLocales',async (req,res)=>{
	const stations = await stationByUrl('https://opml.radiotime.com/Browse.ashx?c=local',req.headers)
	res.send(stations)
})

api.get('/buscar/:keys',async (req,res)=>{
	console.log(req.params.keys)
	const resultado = await searchStation(req.params.keys,req.headers)
	res.send(resultado)
})


module.exports = api