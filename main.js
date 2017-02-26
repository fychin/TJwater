$(document).ready(function() {
	// Trigger sweetalert form when clicked
	$('#submit').click(function() {
		swal({
			title: "Report Water Quality",
			text: "Name",
			type: "input",
			showCancelButton: true,
			closeOnConfirm: false,
			inputPlaceholder: "Reporter name"
		},
		function() {
			swal("Submitted. You earned 3 pts!", "Thank you for your contribution!", "success");
		});
		
	});
});