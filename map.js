$(document).ready(function() {
	var mymap = L.map('live-map').setView([32.482322, -117.121553], 12);
	// Initialize marker icons.
	// var redPin = L.icon({
	// 	iconUrl: 'marker-red.png',
	// 	iconSize: [40, 40],
	// });
	// var yellowPin = L.icon({
	// 	iconUrl: 'marker-yellow.png',
	// 	iconSize: [40, 40],
	// });
	// var greenPin = L.icon({
	// 	iconUrl: 'marker-green.png',
	// 	iconSize: [40, 40],
	// });
	

	// Add layer to map.
	L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoieWFuZ2Y5NiIsImEiOiJjaXltYTNmbTcwMDJzMzNwZnpzM3Z6ZW9kIn0.gjEwLiCIbYhVFUGud9B56w', {
		attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
		maxZoom: 18,
		id: 'mapbox.streets',
		accessToken: 'pk.eyJ1IjoieWFuZ2Y5NiIsImEiOiJjaXltYTNmbTcwMDJzMzNwZnpzM3Z6ZW9kIn0.gjEwLiCIbYhVFUGud9B56w'
	}).addTo(mymap);


	// var ajaxUrl = 'https://yangf96.github.io/Cruz-Roja-Views/ambulances.json';
	// $('#refresh').click(function() {
	// 	console.log('change url');
	// 	console.log('click url is ' + ajaxUrl);
	// 	if(ajaxUrl === 'https://yangf96.github.io/Cruz-Roja-Views/ambulances.json')
	// 		ajaxUrl = 'https://yangf96.github.io/JSON-test/moreAmbulances.json';
	// 	else
	// 		ajaxUrl = 'https://yangf96.github.io/Cruz-Roja-Views/ambulances.json';
	// });


	var pinMarkers = {};	// Store pin markers

	$.ajax({
		type: 'GET',
		url: 'https://yangf96.github.io/TJwater/pins.json',
		success: function(arr) {
			$.each(arr, function(index, item) {
				var pinIcon = L.icon({
					iconUrl: 'marker-' + item.color + '.png',
					iconSize: [40, 40],
				});
				pinMarkers[item.id] = L.marker([item.lat, item.lon], {icon: pinIcon})
				.bindPopup('<li>Submitted by: <strong>' + item.reporter + '</strong></li><li>Date: ' + item.date + '</li>').addTo(mymap);
				// Bind id to icon
				pinMarkers[item.id]._icon.id = item.id;
				// Collapse panel on icon hover.
				pinMarkers[item.id].on('mouseover', function(e){
					$('#collapse' + this._icon.id).collapse('show');
					this.openPopup().on('mouseout', function(e){
						$('#collapse' + this._icon.id).collapse('hide');
						this.closePopup();
					});
				});  

			});
		}
	});

	// window.setInterval(function() {
	// 	AjaxReq(pinMarkers, ajaxUrl);
	// }, 1000);


	// Open popup on panel hover.
	$('.ambulance-panel').click(function(){
		var id = $(this).attr('id');
		// Open popup for 2.5 seconds.
		pinMarkers[id].openPopup();
		setTimeout(function(){
			pinMarkers[id].closePopup();
		}, 2500);
	});
});

function AjaxReq(pinMarkers, ajaxUrl) {
	console.log('ajax request sent');
	console.log(ajaxUrl);
	$.ajax({
		type: 'GET',
		url: ajaxUrl,
		success: function(arr) {
			$.each(arr, function (index, item) {
				// Update ambulance location
				pinMarkers[item.id] = pinMarkers[item.id].setLatLng([item.lat, item.lon]).update();
			});
		}
	});
}