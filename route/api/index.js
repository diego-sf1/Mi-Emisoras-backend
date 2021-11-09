const apiRest = require('express').Router()
const genStation = require('../../data/station_genre.json')
const langStation = require('../../data/station_lang.json')

apiRest.get('/listAll',(req,res)=>{
  let stations = []
  for(let gen in genStation){
    for(let station in genStation[gen].stations){
      let stationTemp=genStation[gen].stations[station]
      stationTemp.id = station
      stationTemp.gen = gen
      stationTemp.genName = genStation[gen].name
      stationTemp.langName = langStation[genStation[gen].stations[station].lang].name
      stations.push(stationTemp)
      
    }
  }
  res.send(stations)
})





module.exports = apiRest
