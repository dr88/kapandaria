function listingsReady() {
	// Change background of listings when hovering
	$('.thumbnail').hover(
		function() {
	            $(this).css('background-color', '#BCBCBC');},
	    function() {
	            $(this).css('background-color', '#FFFFFF');}
	);

	var el = $("#form-field-tags");
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

	// Moving the search box
	el = $('div[role=\'search\']')[0];
	if (el) {
		$('div[role=\'search\']')[0].remove();
		$(el).appendTo('.navbar-search');
	}
	// Moving the advanced search tools
	el = $('div[role=\'advanced-search\']')[0];
	if (el) {
		$('div[role=\'advanced-search\']')[0].remove();
		$(el).appendTo('.navbar-advanced-search');
		$(el).css("width", $(".nav.navbar-nav.navbar-right").width() + 7);
	}

	$("#show-advanced-search").on("click", function () {
		var icon = this.children[0]
		if (icon.getAttribute("class") == "glyphicon glyphicon-chevron-down") {
			// expand
			$(".navbar-default").css("max-height", '406px');
			$(".navbar-advanced-search").css("opacity", 1);
			icon.setAttribute("class", "glyphicon glyphicon-chevron-up")
		} else {
			// shrink
			$(".navbar-default").css("max-height", '52px');
			$(".navbar-advanced-search").css("opacity", 0);
			icon.setAttribute("class", "glyphicon glyphicon-chevron-down")
		}
	});


	// Search
	var query = location.search.replace( "?", "" );
	function doSearch () {
		var prevQuery = query;

		query = "search=" + $("#search-box").val()
		      + "&tags=" + $("#form-field-tags").val()
		      + ($("#women_only").is(":checked") ? "&women_only" : '');

		if (query != prevQuery) {
			uri = location.protocol + '//' + location.host + location.pathname + '?' + query;
			$.getScript(uri);
		}
	}

	var timer;
	function delayedSearch () {
		clearTimeout(timer);
		timer = setTimeout(doSearch, 1000);
	}

	$("#search-box").on("input", delayedSearch);
	$(".tags input[type='text']").on("keyup", delayedSearch);
	$(".tags input[type='text']").on("focus", doSearch);
	$(".tags input[type='text']").on("blur", doSearch);
	$(document).on("click", ".tag .close", doSearch);
	$("#women_only").on("change", doSearch);
};

$(document).ready(listingsReady);
$(document).on("page:load", listingsReady);
