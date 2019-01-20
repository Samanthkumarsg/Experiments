let initpos = [51.505, -0.09];

const mymap = L.map('mapid', {
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
		id: 'mapbox.streets',
		styles: 'mapbox://styles/velansalis/cjqulfsdm1d5b2srvahugihbn',
		accessToken:
			'pk.eyJ1IjoidmVsYW5zYWxpcyIsImEiOiJjanF1Z21oOTAwN3RpNDNtdGRjZ2gybWlwIn0.BbZDEGzlbQpyNhEKcSIgdQ'
	}
).addTo(mymap);

function takeRandomPosition() {
	var x = initpos[0] - (Math.random() - 0.5);
	var y = initpos[1] - (Math.random() - 0.5);
	mymap.flyTo([x, y], 12);
}

// Click event
mymap.on('click', function(ev) {
	takeRandomPosition();
});

// Event triggered after the map pans
mymap.on('moveend', function() {
	console.log(mymap.getCenter().toString());
});
