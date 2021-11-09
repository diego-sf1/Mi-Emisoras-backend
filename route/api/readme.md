<h3>Los endpoints de la Api rest</h3>
<ul>
<li>
  <strong>/v1/listStation</strong>
Devuelve la lista de todas las estaciones de nuestra data
  <div>
    <pre>
    [{
    "s124197": {
      "url": "http://tachyon.shoutca.st:8504/?DIST=TuneIn&TGT=TuneIn&maxServers=2&partnertok=eyJhbGciOiJIUzI1NiIsImtpZCI6InR1bmVpbiIsInR5cCI6IkpXVCJ9.eyJ0cnVzdGVkX3BhcnRuZXIiOnRydWUsImlhdCI6MTYzNjQ2OTgyMywiaXNzIjoidGlzcnYifQ.YTzearHMoF7eayBr0BAjaJZLjT5vc1G5LijJcTOdkAI", 
      "lang": "l1", 
      "gen":"g2738",
      "image": "http://radiotime-logos.s3.amazonaws.com/s124197q.png", 
      "name": "Radio FrequencyCast UK Tech (UK)", 
      "description": "Technology radio show from..."
    },
    {
      ...
    }]
    </pre>
  </div>
</li>
<li>
  <strong>/v1/station/:id</strong>
Devuelve una estación en particular
</li>
<li>
  <strong>/v1/genStation/:idGen</strong>
Devuelve la lista de todas las estaciones de un determinado genero
</li>
<li>
  <strong>/v1/langStation/:idLang</strong>
Devuelve la lista de todas las estaciones de un determinado lenguaje
</li>
</ul>

<u>* Más luego sigo agregando más endpoint y la forma de datos que devolvera</u>
