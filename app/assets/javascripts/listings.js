


$(document).ready(function() {

	// Dynamic search of listings
	$("section.sieve").sieve({ itemSelector: ".thumbnail" });	
	
	// Change background of listings when hovering
	$('.thumbnail').hover(
		function() {
	            $(this).css('background-color', '#BCBCBC');}, 
	    function() {
	            $(this).css('background-color', '#FFFFFF');}
	);

	// Multiselect for locations
	$('.multiselect').multiselect();

	// Moving the search box
	el = $('form[role=\'search\']')[0];
	$('form[role=\'search\']')[0].remove();
	$(el).appendTo('.navbar-search');

});