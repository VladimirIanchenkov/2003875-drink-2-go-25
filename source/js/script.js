const MAP_LATITUDE = 59.96844;
const MAP_LONGITUDE = 30.31755;
const PIN_LATITUDE = 59.96838;
const PIN_LONGITUDE = 30.31762;
const DEFAULT_SCALE = 18.5;
const navMain = document.querySelector('.main-nav');
const navToggle = document.querySelector('.main-nav__toggle');
const mapContainer = document.querySelector('.map__canvas');
const productCard = document.querySelector('.product-promo__card');

// Реализация выпадающего меню
navMain.classList.remove('main-nav--nojs');
navMain.classList.remove('main-nav--opened');
navMain.classList.add('main-nav--closed');

navToggle.addEventListener('click', function () {
  if (navMain.classList.contains('main-nav--closed')) {
    navMain.classList.remove('main-nav--closed');
    navMain.classList.add('main-nav--opened');
  } else {
    navMain.classList.add('main-nav--closed');
    navMain.classList.remove('main-nav--opened');
  }
});

mapContainer.classList.remove('map__canvas--nojs');

// Реализация карты с маркером
const map = L.map('map-canvas')
  .setView({
    lat: MAP_LATITUDE,
    lng: MAP_LONGITUDE,
  }, DEFAULT_SCALE);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: './img/icon-map-pin.svg',
  iconSize: [38, 50],
  iconAnchor: [19, 48],
});

const mainPinMarker = L.marker(
  {
    lat: PIN_LATITUDE,
    lng: PIN_LONGITUDE,
  },
  {
    draggable: false,
    icon: mainPinIcon,
  }
)

mainPinMarker.addTo(map);

// Реализация промо-слайдера
productCard.classList.remove('.product-promo__card--nojs');

new Swiper('.swiper', {
  direction: 'horizontal',
  loop: true,

  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});

// Реализация кастомного select
// Источник заимствования: https://codepen.io/leon9208/pen/VwYpJwW

//Получаем все "select" по селектору
const selects = document.querySelectorAll('.select')
//переборка по полученным "select"
for (let i = 0; i < selects.length; i++){
	const select = selects[i]
	//получаем все "option" внутри "select"
	const options = select.querySelectorAll('option')

	//создаем кастомный "select"
	const customSelect = document.createElement('div')
	const customSelectList = document.createElement('div')
	const customSelectCurrent = document.createElement('div')

	// select.setAttribute('tabindex', '1')
	//задаем классы и атрибуты кастомному "select"
	customSelect.className = 'custom-select'
	customSelectList.className = 'custom-select__list custom-scrollbar'
	customSelectCurrent.className = 'custom-select__current'

	//создаем вложенность созданных элементов
	customSelect.append(customSelectCurrent, customSelectList)

	//добавляем кастомный "select" сразу после оргинального "select"
	select.after(customSelect)

	//получаем список и значения "option" из "select", затем создаём кастомный "option" для кастомного "select"
	const createCustomDom = (x, y) => {
		let selectItems = ''

		for(let i = 0; i < options.length; i++){
			selectItems += '<div class="custom-select__item" data-value="'+options[i].value+'">'+options[i].text+'</div>'
		}
		customSelectList.innerHTML = selectItems
		x(),y();
	}

	//открываем-закрываем выпадающий список по клику
	const toggleClass = () => {customSelect.classList.toggle('custom-select--show')}

	//присваиваем текстовое первое значение "option" в кастомном "select"
	const currentTextValue = () => customSelectCurrent.textContent = customSelectList.children[0].textContent

	//получаем и задаем значения text/value
	const currentValue = () => {
		const items = customSelectList.children
		for(let el = 0; el < items.length; el++){
			let selectValue = items[el].getAttribute('data-value')
			let selectText = items[el].textContent
      items[el].addEventListener('click', () => {
        for(let i = 0; i < items.length; i++)
        if (items[i].classList.contains('active')) {
          items[i].classList.remove('active')
        }
        customSelect.classList.remove('custom-select--show')
        customSelectCurrent.textContent = selectText
        items[el].classList.add('active')
				select.value = selectValue
			})
		}
	}



	const desktopFn = () => {
		customSelectCurrent.addEventListener('click', toggleClass)
	}

	const mobileFn = () => {
		for(let j = 0; j < selects.length; j++){
			let mobileSelect = selects[j]
			mobileSelect.addEventListener('change', ()=> {
				mobileSelect.nextElementSibling.querySelector('.custom-select__current').textContent = mobileSelect.value
			})
		}
	}

	createCustomDom(currentTextValue, currentValue)


	//закрываем выпадающий список по клику вне области кастомного селекта
	document.addEventListener('mouseup', (e) =>{
    if (!customSelect.contains(e.target))	customSelect.classList.remove('custom-select--show')
	})

	detectMobile(mobileFn, desktopFn)

	function detectMobile(x,y) {
		if( navigator.userAgent.match(/Android/i)
		|| navigator.userAgent.match(/webOS/i)
		|| navigator.userAgent.match(/iPhone/i)
		|| navigator.userAgent.match(/iPad/i)
		|| navigator.userAgent.match(/iPod/i)
		|| navigator.userAgent.match(/BlackBerry/i)
		|| navigator.userAgent.match(/Windows Phone/i)
		){
			x();
		}
		else {
			y();
		 }
	 }
}

