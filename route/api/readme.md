<h3>Los endpoints de la Api rest</h3>
<h4>GET</h4>
<ul>
<li>
  <strong>/v1/listStation</strong>
Devuelve la lista de todas las estaciones de nuestra data
  <div>
    <pre>
    {
    "s124197": {
      "url": "http://opml.radiotime.com/Tune.ashx?id=s124197&filter=l1", 
      "lang": "l1",
      "langName":"English",
      "gen":"g2738",
      "genName":"Consumer & Technology",
      "image": "http://radiotime-logos.s3.amazonaws.com/s124197q.png", 
      "name": "Radio FrequencyCast UK Tech (UK)", 
      "description": "Technology radio show from..."
    },
    {
      ...
    },
    ...}
    </pre>
  </div>
</li>
<li>
  <strong>/v1/station/:id</strong>
Devuelve una estación en particular
  <h6>ejemplo: /v1/station/s124197</h6>
      <pre>
    {
      "url":"http://opml.radiotime.com/Tune.ashx?id=s124197&filter=l1",
      "lang":"l1",
      "image":"http://radiotime-logos.s3.amazonaws.com/s124197q.png",
      "name":"Radio FrequencyCast UK Tech (UK)",
      "description":"Technology radio show from...",
      "gen":"g2738",
      "genName":"Consumer & Technology",
      "langName":"English"
     }
    </pre>
</li>
<li>
  <strong>/v1/genStation/:idGen</strong>
Devuelve la lista de todas las estaciones de un determinado genero
    <pre>
    [{
    "s124197": {
      "url": "http://opml.radiotime.com/Tune.ashx?id=s124197&filter=l1", 
      "lang": "l1",
      "image": "http://radiotime-logos.s3.amazonaws.com/s124197q.png", 
      "name": "Radio FrequencyCast UK Tech (UK)", 
      "description": "Technology radio show from..."
    },
    {
      ...
    },
    ...]
    </pre>
</li>
<li>
  <strong>/v1/langStation/:idLang</strong>
Devuelve la lista de todas las estaciones de un determinado lenguaje
    <pre>
    [{
    "s124197": {
      "url": "http://opml.radiotime.com/Tune.ashx?id=s124197&filter=l1", 
      "gen":"g2738",
      "image": "http://radiotime-logos.s3.amazonaws.com/s124197q.png", 
      "name": "Radio FrequencyCast UK Tech (UK)", 
      "description": "Technology radio show from..."
    },
    {
      ...
    },
    ...]
    </pre>
</li>
<li>
  <strong>/v1/streamStation/:idStation</strong>
Devuelve la stream de la emisora seleccionada
  <pre>
  {
  "stream":"..."
  }
  </pre>
</li>
</ul>

<u>* Más luego sigo agregando más endpoint y la forma de datos que devolvera</u>
