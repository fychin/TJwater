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
	var pinUrl = 'https://yangf96.github.io/TJwater/pins.json';

	$('#submit').click(function() {
		let pinIcon = L.icon({
			iconUrl: 'marker-' + 'green'+ '.png',
			iconSize: [25, 41],
		});
		pinMarkers[5] = L.marker(["32.481241", "-117.110326"], {icon: pinIcon})
		.bindPopup('<p>Submitted by: <strong>' + 'Jeff Smith' + '</strong></p><p>Date: ' + '2/28' + '</p>').addTo(mymap);
		// Bind id to icon
		pinMarkers[5]._icon.id = 4;
		// Collapse panel on icon hover.
		pinMarkers[5].on('mouseover', function(e){
			$('#collapse' + this._icon.id).collapse('show');
			this.openPopup().on('mouseout', function(e){
				$('#collapse' + this._icon.id).collapse('hide');
				this.closePopup();
			});
		});
	});

	$.ajax({
		type: 'GET',
		url: pinUrl,
		success: function(arr) {
			$.each(arr, function(index, item) {
				var pinIcon = L.icon({
					iconUrl: 'marker-' + item.color + '.png',
					iconSize: [25, 41],
				});
				console.log('hello');
				pinMarkers[item.id] = L.marker([item.lat, item.lon], {icon: pinIcon})
				.bindPopup('<p>Submitted by: <strong>' + item.reporter + '</strong></p><p>Date: ' + item.date + '</p>').addTo(mymap);
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
	// 	$.ajax({
	// 		type: 'GET',
	// 		url: pinUrl,
	// 		success: function(arr) {
	// 			$.each(arr, function(index, item) {
	// 				var pinIcon = L.icon({
	// 					iconUrl: 'marker-' + item.color + '.png',
	// 					iconSize: [25, 41],
	// 				});
	// 				pinMarkers[item.id] = L.marker([item.lat, item.lon], {icon: pinIcon})
	// 				.bindPopup('<p>Submitted by: <strong>' + item.reporter + '</strong></p><p>Date: ' + item.date + '</p>').addTo(mymap);
	// 				// Bind id to icon
	// 				pinMarkers[item.id]._icon.id = item.id;
	// 				// Collapse panel on icon hover.
	// 				pinMarkers[item.id].on('mouseover', function(e){
	// 					$('#collapse' + this._icon.id).collapse('show');
	// 					this.openPopup().on('mouseout', function(e){
	// 						$('#collapse' + this._icon.id).collapse('hide');
	// 						this.closePopup();
	// 					});
	// 				});  

	// 			});
	// 		}
	// 	});
	// }, 1200);

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