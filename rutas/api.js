const api = require('express').Router()
const {stationByUrl} = require('../lib/stations')

api.get('/emisorasLocales',async (req,res)=>{
	const stations = await stationByUrl('https://opml.radiotime.com/Browse.ashx?c=local',req.headers)
	res.send(stations)
})


module.exports = api