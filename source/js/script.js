const MAP_LATITUDE = 59.96844;
const MAP_LONGITUDE = 30.31755;
const PIN_LATITUDE = 59.96838;
const PIN_LONGITUDE = 30.31762;
const DEFAULT_SCALE = 18.5;
const navMain = document.querySelector('.main-nav');
const navToggle = document.querySelector('.main-nav__toggle');
const mapContainer = document.querySelector('.map__canvas');

navMain.classList.remove('main-nav--nojs');

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
