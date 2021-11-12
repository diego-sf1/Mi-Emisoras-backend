class miradioemisoras{
	contenedor
	constructor(){
		this.contenedor=document.getElementById('principal')
		let el = document.getElementsByClassName('mre-link')
		for (var i = 0; i < el.length; i++) {
			el[i].onclick = (e)=>{
				this.injectHTML('<div class="container "><div class="row justify-content-center mt-3 mb-3"><div class="spinner-border" role="status"> <span class="visually-hidden">Loading...</span></div></div></div>')
				history.pushState(null,'/',e.target.pathname)

				fetch('/v1/page'+e.target.pathname).then(t=>t.text()).then(html=>{
						//window.location = '/'
						this.injectHTML(html)
						if (e.target.pathname=='/estaciones-en-vivo') {
							this.estacionesLocales('locals')
						}
				})
				e.preventDefault()

			}
		}
	}
	injectHTML(h){
		this.contenedor.innerHTML=h
	}
	llenarSelectStation(t,d){
		let elem = document.getElementById(d)
		elem[0].text='Cargando Datos...'
		for (var i = elem.options.length; i >= 1; i--) {
			elem.remove(i)
		}
		fetch('/v1/stationsCat/?url='+t.value).then(respuesta=>respuesta.json()).then(dato=>{
			console.log(dato)
			for(let x in dato){
				let ops = document.createElement('option')
				ops.value=dato[x].URL
				ops.text= dato[x].text
				elem.appendChild(ops)
			}
			elem[0].text='-- Escoge un Nivel -- '
		})
	}
	estacionesLocales(d){
		console.log(d)
		let elem = document.getElementById(d)
		elem.innerHTML='<div class="container "><div class="row justify-content-center mt-3 mb-3"><div class="spinner-border" role="status"> <span class="visually-hidden">Loading...</span></div></div></div>'
		fetch('/v1/emisorasLocales').then(t=>{
			console.log(t)
			return t.json()
		}).then(data=>{
			console.log(data)
			elem.innerHTML=''
			for(let x in data){
				let imagen
				if(!data[x].image.includes('https')){
					imagen = data[x].image.replace('http','https')
				}else{
					imagen = data[x].image
				}
				let div = document.createElement('div')
				div.classList.add('col-md-3')
				let div1 = document.createElement('div')
				div1.classList.add('card')
				div1.classList.add('mt-3')
				div1.classList.add('mb-3')
				div1.innerHTML=`
				<div class="text-center"><img src="${imagen}" alt=""  class="card-img-top" style="height:100px;width:auto;"></div>
				<div class="card-body">
					<h5 class="card-title">${data[x].text}</h5>
				</div>

				`

				div.appendChild(div1)
				elem.appendChild(div)
			}
		})
	}
}
