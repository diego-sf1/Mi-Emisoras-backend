const got = require('got')
const opml = require('./opml')

exports.catStations = async(h)=>{
	const allStations = await got('https://opml.radiotime.com/',{headers:{ 'accept-language':h[ 'accept-language'],'x-forwarded-for':h['x-forwarded-for']}}) //{ 'accept-language':h[ 'accept-language'],'x-forwarded-for':h['x-forwarded-for']}
	return new Promise((resuelto,rechazado)=>{
		opml.parse(allStations.body,(err,outline)=>{
			if (err) {
				rechazado(err)
			}else{
				resuelto(outline.opml.body.subs)
			}
			
		})
	})
}
exports.stationByUrl = async (url,h)=>{
	const allStations = await got(url,{headers:{ 'accept-language':h[ 'accept-language'],'x-forwarded-for':h['x-forwarded-for']}})
	return new Promise((resuelto,rechazado)=>{
		opml.parse(allStations.body,(err,outline)=>{
			console.log(err)
			if (err) {
				rechazado(err)
			}else{
				console.log(outline.opml.body.subs[0].subs?true:false)
				if (!outline.opml.body.subs[0].subs) {
					resuelto(outline.opml.body.subs)
				}else{
					resuelto(outline.opml.body.subs[0].subs)
				}
				
			}
			
		})
	})
}

