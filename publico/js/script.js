Array.prototype.injectElemento = function(a){
	console.log(a)
	for (var i = 0; i < this.length; i++) {
		if (this[i]) {
			a.appendChild(this[i])
		}
	}
}
const iterando = i=>{
	//console.log(i)
	console.log(i.guide_id[0])
	let r={img:'',text:'',url:''}
	let incluye = false
	if (i.type=='audio') {
		switch(i.guide_id[0]){
			case 's':
				r.img=i.image.includes('https')?i.image:i.image.replace('http','https')
				r.text = i.text
				r.url='/radio/'+i.text.split('(')[0].replace(/ /g,'_')+'-'+i.guide_id.replace('s','e')
				incluye=true
			break
		}
	}
	if (incluye) {
		return cC(r)
	}else{
		return false
	}
	//return cC(r)

}
//abreviación de funciones de uso comun
const cE=(e)=>document.createElement(e)
const byId=(e)=>document.getElementById(e)
const qS=(e)=>document.querySelector(e)

//crea opciones para un select
const cO=(e)=>{
	let o=cE('option')
	o.value = e.valor
	o.text = e.text
	return o
}

//crea tarjetas de emisoras y otras cosas
const cC=(e)=>{
	if (typeof e=='undefined') {
		e={}
	}
	if (!e.img) {
		e.img=""
	}
	if (!e.text) {
		e.text = ""
	}
	let div = cE('div')
	div.classList.add('card')
	div.innerHTML=`
	<a href="${e.url}">
		<div class="card-img">
			<img src="${e.img}" alt="">
		</div>
		<div class="card-body">
			<p>${e.text}</p>
		</div>
	</a>

	`
	return div
}


const locales = ()=>{
	let e=qS('#locales .contenido')
	console.log(e)
	fetch('/v1/emisorasLocales').then(r=>r.json()).then(d=>{
		//console.log(d.head)
		let title = cE('h3')
		title.textContent=d.head.title
		e.appendChild(title)

		for(let x of d.body){
			console.log(x)
			if (x.type) {

			}else{
				let divC = cE('div')
				divC.classList.add('contentStations')
				let t2 = cE('h4')
				e.appendChild(t2)
				e.appendChild(divC)
				t2.textContent=x.text
				let children = x.children.map(i=>{
					//console.log(i)
					let r={}
					i.image=i.image.includes('s0q.png')?'/img/logos/s0q.png':i.image
					r.img=i.image.includes('https')?i.image:i.image.replace('http','https')
					r.text = i.text
					r.url='/radio/'+i.text.split('(')[0].replace(/-/g,'').replace(/ /g,'_')+'-'+i.guide_id.replace('s','e')
					return cC(r)

				})
				children.injectElemento(divC)
				console.log(children)
				// for(let y of x.children){

				// 	let cards = cC({})
				// }
			}
		}
	})
}

const play = ()=>{

	let bt = byId('play')
	if (qS('audio').src=='https://error/') {
		alert('Por algún problema técnico, este medio no está disponible. le rogamos nuestras más sinceras Disculpas')
	}else{
		bt.classList.toggle('pause')
		
		if (byId('play').className=='pause') {
			if (qS('audio').src!=urlRadio) {
				qS('audio').src=urlRadio
			}
			qS('audio').play()
		}else{
			qS('audio').pause()
			qS('audio').src=''
			qS('audio').src=urlRadio
		}
	}
}

class listarResultados extends HTMLElement{
	#path
	#lista
	#num
	#pag
	#elem
	#estilo
	#titulo
	#filas
	#titulos
	#tarjeta
	constructor(){
		super()
		this.#lista = []
		this.#titulos=[]
		
		this.#num = 10
		this.#pag = 1
		this.#elem = this.attachShadow({mode:'closed'})
		this.#elem.innerHTML = `
		<style>
			:host{
				width:100%;
				padding:5px;
				display:block;
				margin-bottom:30px;
			}
			.contenedor{
				width:100%;
			}
			.paginador>ul{
				display:flex;
				list-style:none;
			}
			li{
				border: 1px solid #dee2e6;
				padding: .375rem .75rem;
			}
			.header{
				display:grid;
				grid-template-columns:80% 20%;
				background:#212529;
				color:white;
				padding-left:14px;
			}
			.contenido{
				display:grid;
				grid-template-columns:20% 20% 20% 20% 20%;
				gap:10px;
			}
			.contenido .item{
				display:grid;
				grid-template-columns:80% 20%;
				padding:10px;
			}
			.card{
				padding:13px;
				border:1px solid;
				border-radius:30px;
				display:flex;
				flex-direction:column;
			}
			.contenido .card img{
				width:100%;
			}
			.contenido div.item:nth-of-type(2n+1){
				background:rgba(0, 0, 0, 0.05);
			}
			.active{
				color:red;
			}
			@media screen and (max-width: 960px){
				.contenido{
					grid-template-columns: 25% 25% 25% 25%;
				}
				#title{
					display:flex;
				}
			}
			@media screen and (max-width: 768px){
				.contenido{
					grid-template-columns:33.333333333% 33.333333333% 33.333333333%;
				}
			}
			@media screen and (max-width: 576px){
				.contenido{
					grid-template-columns: 50% 50%;
				}
			}
			@media screen and (max-width: 360px){
				.contenido{
					grid-template-columns: 50% 50%;
				}
			}

		</style>
		<div class='contenedor'>
			<h3 id="title"></h3>
			<div class="links"></div>
		</div>
		`
		this.#filas=`
			<h4 class='title'></h4>
			<div class='paginador'></div>
			<div class='contenido'></div>	
			<div class='paginador'></div>

		`
		
		this.#tarjeta=`
		<a href="">
			<div class="card-img">
				<img src="" alt="">
			</div>
			<div class="card-body">
				<p></p>
			</div>
		</a>

		`
	}
	async #obtenerDatos(k){
		console.log(k)
		await fetch('/v1/buscar/'+k.value).then(r=>r.json()).then(d=>{
			console.log(d)
			let url
			let datos
			this.#elem.getElementById('title').textContent=d.head.title
			for(let x of d.body){
				if (x.children) {
					this.#titulos.push(x.text)
					this.#lista[x.text]=[]
					for(let y of x.children){
						if (y.type=='audio') {
							//console.log(y.guide_id[0])
							url=y.guide_id[0]=='s'?'radio':y.guide_id[0]=='p'?'podcasts':y.guide_id[0]=='t'?'podcast':'links'

						}else if (y.type=='link' && y.guide_id) {
							url=y.guide_id[0]=='s'?'radio':y.guide_id[0]=='p'?'podcasts':y.guide_id[0]=='t'?'podcast':'links'
						}else if (y.type == 'link'  && !y.guide_id) {
							url='links'
						}
						this.#lista[x.text].push({link:url,d:y})
					}
				}else if (x.type && x.guide_id) {
					//console.log('objeto X : ',x)
					if (x.type=='audio') {
						console.log(x.guide_id[0])
						url=x.guide_id[0]=='s'?'radio':x.guide_id[0]=='p'?'podcasts':x.guide_id[0]=='t'?'podcast':'links'

					}else if (x.type=='link' && x.guide_id) {
						url=x.guide_id[0]=='s'?'radio':x.guide_id[0]=='p'?'podcasts':x.guide_id[0]=='t'?'podcast':'links'
					}else if (x.type == 'link'  && !x.guide_id) {
						url='links'
					}
					this.#lista.push({link:url,d:x})

				}
			}

		})
	}
	async reset(f){
		console.log(f)
		this.#lista = []
		this.#titulos=[]
		this.#elem.getElementById('title').textContent=''
		this.#elem.querySelector('.links').innerHTML=''
		if(typeof f == 'string'){
			let f1=f
			f={}
			f.value=f1
		}

		await this.#obtenerDatos(f)
		this.#render()
	}
	#render(){
		console.log(this.clientWidth)
		console.log(this)
		this.style.width=this.clientWidth
		//this.#elem.querySelector('.links').innerHTML=''
		
		// console.log(this.clientWidth)
		// console.log(this.#titulos)
		// console.log(this.#lista)
		 if (this.#titulos.length!=this.#lista.length) {
			let fila=document.createElement('div')
				
				fila.innerHTML=this.#filas
			this.#lista.map(i=>{
				if (i.link!='links') {
					let card = document.createElement('div')
					card.classList.add('card')
					card.innerHTML = this.#tarjeta
					i.d.image=i.d.image.includes('s0q.png')?'/img/logos/s0q.png':i.d.image
					i.d.image=i.d.image.includes('p0q.png')?'/img/logos/s0q.png':i.d.image
					card.querySelector('img').src=i.d.image.includes('https')?i.d.image:i.d.image.replace('http','https')
					card.querySelector('.card-body p').textContent=i.d.text
					card.querySelector('a').href='/'+i.link+'/'+i.d.text.split('(')[0].replace(/ /g,'_')+'-'+i.d.guide_id.replace('s','e')
					fila.querySelector('.contenido').appendChild(card)
				}
				//console.log(i)
			})
			
			this.#elem.querySelector('.links').appendChild(fila)
		}
		if (this.#titulos.length!=0) {
			for (var i = 0; i < this.#titulos.length; i++) {
				console.log(this.#titulos[i])
				let fila=document.createElement('div')
				
				fila.innerHTML=this.#filas
				fila.querySelector('.title').textContent=this.#titulos[i]
				this.#lista[this.#titulos[i]].map(i=>{
					if (i.link!='links') {
						let card = document.createElement('div')
						card.classList.add('card')
						card.innerHTML = this.#tarjeta
						i.d.image=i.d.image.includes('s0q.png')?'/img/logos/s0q.png':i.d.image
						i.d.image=i.d.image.includes('p0q.png')?'/img/logos/s0q.png':i.d.image
						card.querySelector('img').src=i.d.image.includes('https')?i.d.image:i.d.image.replace('http','https')
						card.querySelector('.card-body p').textContent=i.d.text
						card.querySelector('a').href='/'+i.link+'/'+i.d.text.split('(')[0].replace(/ /g,'_')+'-'+i.d.guide_id.replace('s','e')
						fila.querySelector('.contenido').appendChild(card)
					}
					console.log(i)
				})
				
				this.#elem.querySelector('.links').appendChild(fila)

			}
		}
	}

}
window.customElements.define('lista-resultado',listarResultados)
const buscar=(k,e)=>{
	console.log(k[0])
	if(qS('lista-resultado')){
		qS('lista-resultado').reset(k[0])
	}else{
		let n=cE('lista-resultado')
		qS('.contentResult').appendChild(n)
		n.reset(k[0])
	}
	history.pushState('null','?','?s='+k[0].value)
	e.preventDefault()
	//let e=qS('#resultSearch .content')
	//e.innerHTML=''
	//fetch('/v1/buscar/'+k.value).then(r=>r.json()).then(d=>{
	//	console.log(d)
		//let title = cE('h3')
		//title.textContent=d.head.title
		//qS('#resultSearch .title').innerHTML=''
		//qS('#resultSearch .title').appendChild(title)
		//let elem = d.body.map(iterando)
		//console.log(elem)
		//typeof elem[0]!='undefined'?elem.injectElemento(e):''
		
	//})
}

window.onload = ()=>{
	const hamburguesa = qS('.hamburguesa')
	const navs = qS('nav')
	const uls = qS('nav ul')
	const cerrar = qS('p.cerrar')

	hamburguesa.addEventListener('click',()=>{
		navs.classList.toggle('open')
		uls.classList.toggle('animacion')
	})
	cerrar.addEventListener('click',()=>{
		hamburguesa.click()
	})
	if (byId('locales')) {
		locales()
	}

}