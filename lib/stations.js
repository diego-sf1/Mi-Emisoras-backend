const got = require('got')
const pls = require('pls')

exports.stationByUrl = async (url,h)=>{
	const allStations1 = await got(url+'&render=json',{headers:{'accept-language':h[ 'accept-language'],'x-forwarded-for':h['x-forwarded-for']}})
	return JSON.parse(allStations1.body)
}