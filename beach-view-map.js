$(document).ready(function() {
	var mymap = L.map('live-map').setView([32.482322, -117.121553], 14);

	// Add layer to map.
	L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoieWFuZ2Y5NiIsImEiOiJjaXltYTNmbTcwMDJzMzNwZnpzM3Z6ZW9kIn0.gjEwLiCIbYhVFUGud9B56w', {
		attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
		maxZoom: 18,
		id: 'mapbox.streets',
		accessToken: 'pk.eyJ1IjoieWFuZ2Y5NiIsImEiOiJjaXltYTNmbTcwMDJzMzNwZnpzM3Z6ZW9kIn0.gjEwLiCIbYhVFUGud9B56w'
	}).addTo(mymap);


	$.getJSON('https://yangf96.github.io/TJwater/pins.json', function(data){
		console.log(data);
	})

	var pinMarkers = {};	// Store pin markers

	$.ajax({
		type: 'GET',
		url: 'https://yangf96.github.io/TJwater/pins.json',
		success: function(arr) {
			$.each(arr, function(index, item) {
				var pinIcon = L.icon({
					iconUrl: 'marker-' + item.color + '.png',
					iconSize: [25, 41],
				});
				console.log('hello');
				pinMarkers[item.id] = L.marker([item.lat, item.lon], {icon: pinIcon})
				.bindPopup('<img class="img-responsive" width="60px" src="' + item.img + '">'
					 + '<p>Submitted by: <strong>' + item.reporter + '</strong></p><p>Date: '
					 + item.date + '</p>').addTo(mymap);
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

// function AjaxReq(pinMarkers, ajaxUrl) {
// 	console.log('ajax request sent');
// 	console.log(ajaxUrl);
// 	$.ajax({
// 		type: 'GET',
// 		url: ajaxUrl,
// 		success: function(arr) {
// 			$.each(arr, function (index, item) {
// 				// Update ambulance location
// 				pinMarkers[item.id] = pinMarkers[item.id].setLatLng([item.lat, item.lon]).update();
// 			});
// 		}
// 	});
// }