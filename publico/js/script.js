Array.prototype.injectElemento = function(a){
	console.log(a)
	for (var i = 0; i < this.length; i++) {
		a.appendChild(this[i])
	}
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
					r.img=i.image.includes('https')?i.image:i.image.replace('http','https')
					r.text = i.text
					r.url=i.text.split('(')[0].replace(/ /g,'_')+'-'+i.guide_id.replace('s','e')
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

window.onload = ()=>{
	const hamburguesa = qS('.hamburguesa')
	const navs = qS('nav')
	const uls = qS('nav ul')

	hamburguesa.addEventListener('click',()=>{
		navs.classList.toggle('open')
		uls.classList.toggle('animacion')
	})
	if (byId('locales')) {
		locales()
	}
}