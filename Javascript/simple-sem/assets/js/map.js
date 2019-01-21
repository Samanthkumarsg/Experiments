let initpos = [51.505, -0.09];
let loader = document.getElementById('loader');
let view = document.getElementById('view');

const mymap = L.map('map', {
	center: initpos,
	zoom: 12,
	zoomControl: false,
	maxZoom: 40,
	boxZoom: false,
	dragging: false,
	touchZoom: false,
	doubleClickZoom: false,
	scrollWheelZoom: false
});

L.tileLayer(
	'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}',
	{
		id: 'mapbox.light',
		styles: 'mapbox://styles/velansalis/cjqulfsdm1d5b2srvahugihbn',
		accessToken:
			'pk.eyJ1IjoidmVsYW5zYWxpcyIsImEiOiJjanF1Z21oOTAwN3RpNDNtdGRjZ2gybWlwIn0.BbZDEGzlbQpyNhEKcSIgdQ'
	}
).addTo(mymap);

// Click event
mymap.on('click', function(ev) {
	loader.style.height = '100vh';
	window.location.hash = 'events/home';
	takeRandomPosition();
});

// Event triggered after the map pans
mymap.on('moveend', function() {
	displayinformation();
	setTimeout(() => {
		loader.style.height = 0;
	}, 1450);
	console.log('Map is in position : ' + mymap.getCenter().toString());
});

window.onload = () => {
	displayinformation();
	loader.style.height = 0;
};

function takeRandomPosition() {
	let x = initpos[0] - (Math.random() - 0.5);
	let y = initpos[1] - (Math.random() - 0.5);
	mymap.flyTo([x, y], 12);
}

function displayinformation() {
	let url = window.location.hash.split('/')[0];
	if (url == '') {
		console.log('Home');
	} else if (url == '#events') {
		console.log('events');
	} else if (url == '#register') {
		console.log('register');
	}
}
