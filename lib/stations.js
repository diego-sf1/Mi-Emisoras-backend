const got = require('got')
const pls = require('pls')
const puppeteer = require('puppeteer');


const verificaUrl =async (url)=>{
	console.log(url)
	let browser = await puppeteer.launch({
		headless: false,
    args: [
        '--disable-setuid-sandbox',
        '--no-sandbox',
        '--disable-gpu',
        '--no-first-run',
        
    	]
	})
	let pagina = await browser.newPage()
	try{
		await pagina.goto(url)
	}catch(e){
		console.log(e)
		console.log('aqui se detuvo')
		return 'https://error'
	}
	console.log('vamos a verificar si tiene un stream')
	let frame
	try{
		frame = await pagina.$eval('source',(elem,ese)=>elem.src)
	}catch{
		frame=url
	}

	console.log('el frame es: ',frame)
	//await browser.close()

	return frame
}



exports.stationByUrl = async (url,h)=>{
	const allStations1 = await got(url+'&render=json&formats=mp3,aac,ogg,flash,html,hls',{headers:{'accept-language':h[ 'accept-language'],'x-forwarded-for':h['x-forwarded-for']}})
	return JSON.parse(allStations1.body)
}




exports.streamStation = async (url)=>{
	let stream
	try{
		stream = await got(url+'&render=json&formats=mp3,aac,ogg,flash,html,hls')
		console.log(stream.body)
	}catch{
		return 'https://error'
	}
	//console.log(JSON.parse(stream.body))
		let urlTemp = JSON.parse(stream.body).body[0].url

		let rutaUrl
		if (urlTemp.includes('\n')) {
		 	rutaUrl = urlTemp.split('\n')
		 	urlTemp=rutaUrl[0]
		}

		if (urlTemp.includes('.pls')) {
		 	const stream1 = await got(urlTemp).catch(err=>console.log(err))
		 	const tracks = pls.parse(stream1.body)
		 	return tracks[tracks.length-1].uri
		}
		rutaUrl = urlTemp.split('DIST')[0]
		if(!rutaUrl.includes('/stream')){

			//let verUrl = await verificaUrl(urlTemp)
			//const {headers} = await got(rutaUrl)
			//console.log(headers)
			//if (verUrl != '') {
			//	return verUrl
			//}
		}

		if(rutaUrl.includes('.m3u')){
			const stream1 = await got(urlTemp).catch(err=>console.log(err))
			if(stream1.body.split('?')[0].includes('\n')){
				return 'https://error'
			}
			return stream1.body.split('?')[0]
		}
		console.log(rutaUrl)
		console.log(rutaUrl.match(/(stream\/+[0-9]*)/))
		if(rutaUrl.match(/(stream\/+[0-9]*)/) && rutaUrl.includes(rutaUrl.match(/(stream\/+[0-9]*)/)[0])){
			console.log('aqui')
			let u1 = rutaUrl.replace('?','linten.pls')
			return u1
		}
		console.log('aqui')
		 if(rutaUrl.includes('/stream')){
		 	return rutaUrl
		 }else if (urlTemp.split('?')[0].split('//')[1].includes(':')) {
		 	if (urlTemp.split('?')[0].split('//')[1].split(':')[1].split('/').length==1) {
		 		return urlTemp.split('?')[0]+'/stream'
		 	}else if (urlTemp.split('?')[0].split('//')[1].split(':')[1].split('/')[1]=='') {
		 		return urlTemp.split('?')[0]+'stream'
		 	}else{
		 		return urlTemp.split('?')[0]
		 	}
		 	return urlTemp.split('?')[0]+'/stream'
		}else if (urlTemp.includes('/stream')) {
		 	return urlTemp
		}else{
		 	return urlTemp.split('?')[0]
		}

}


exports.radios = async (url,h)=>{
	const radio = await got(url+'&render=json&detail=genre,recommendation&formats=mp3,aac,ogg,flash,html,hls',{headers:{'accept-language':h[ 'accept-language'],'x-forwarded-for':h['x-forwarded-for']}})
	//console.log(JSON.parse(radio.body))
	return JSON.parse(radio.body).body
}


exports.searchStation = async (k,h)=>{
	const resultado = await got('http://opml.radiotime.com/Search.ashx?query='+k+'&render=json&formats=mp3,aac,ogg,flash,html,hls',{headers:{'accept-language':h[ 'accept-language'],'x-forwarded-for':h['x-forwarded-for']}})

	return JSON.parse(resultado.body)
}
