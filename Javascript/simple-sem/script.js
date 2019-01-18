var mymap = L.map('mapid', {
	center: [51.505, -0.09],
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

// Click event
mymap.on('click', function(ev) {
	mymap.flyTo([51.305, -0.09], 12);
});

// Event triggered after the map pans
mymap.on('moveend', function() {
	console.log(mymap.getCenter().toString());
});

window.onpopstate = function(event) {
	console.log(
		'location: ' + document.location + ', state: ' + JSON.stringify(event.state)
	);
};
