const apiRest = require('express').Router()
const genStation = require('../../data/station_genre.json')
const langStation = require('../../data/station_lang.json')
const {catStations, stationByUrl} = require('../../lib/stations')

  let stations = {}
  let listGen = []
  let listLang = []

  for(let gen in genStation){
    for(let station in genStation[gen].stations){
      let stationTemp=genStation[gen].stations[station]

      stationTemp.gen = gen
      stationTemp.genName = genStation[gen].name
      stationTemp.langName = langStation[genStation[gen].stations[station].lang].name
      stations[station]=stationTemp
      
    }
  }
  for(let gen in genStation){
    
  }


apiRest.get('/listAll',(req,res)=>{
  res.send(stations)
})

apiRest.get('/station/:id',(req,res)=>{
  res.send(stations[req.params.id])
})
apiRest.get('/page',(req,res)=>{
  res.render('parcial/index')
})
apiRest.get('/page/:link',async (req,res)=>{
  console.log(req.params.link)
  switch(req.params.link){
    case 'iniciar-sesion':
      res.render('parcial/login')
    break
    case 'estaciones-en-vivo':
      let stationsCats = await catStations(req.headers)
      stationsCats.splice(5,1)
      res.locals.categorias = stationsCats
      res.render('parcial/envivo')
    break
    default:
      res.render('404')
  }
})

apiRest.get('/stationsCat',async (req,res)=>{
  const staciones = await stationByUrl(req.query.url,req.headers)
  res.send(staciones)
})

apiRest.get('/emisorasLocales',async (req,res)=>{
  const stations = await stationByUrl('https://opml.radiotime.com/Browse.ashx?c=local',req.headers)

  res.send(stations)
})



module.exports = apiRest
