function ready() {

	// Dynamic search of listings
	$("section.sieve").sieve({ itemSelector: "div.col-md-3" });	
	
	// Change background of listings when hovering
	$('.thumbnail').hover(
		function() {
	            $(this).css('background-color', '#BCBCBC');}, 
	    function() {
	            $(this).css('background-color', '#FFFFFF');}
	);

	el = $("#form-field-tags");
	if (el.length) {
		el.tag({
			placeholder: "Enter new locations ...",
			source: window.locations
		});
	}

	$(".edit_listing, .new_listing").submit(function() {
		el = $("#form-field-tags");
		el[0].value = el.val().split(', ');
		return true;
	});

	// Multiselect for locations
	$('.multiselect').multiselect();

	// Moving the search box
	el = $('form[role=\'search\']')[0];
	if (el) {
		$('form[role=\'search\']')[0].remove();
		$(el).appendTo('.navbar-search');
	}

};

$(document).ready(ready);
$(document).on("page:load", ready);
