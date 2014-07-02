var listing = {
	setupForm: function () {
		$("#new_listing").submit(function () {
			if ($("#routing_number")[0]) {
				$("input[type='submit']").attr("disabled", true);
				Stripe.bankAccount.createToken($('#new_listing'), listing.handleStripeResponse);
				return false;
			}
		});
	},
	handleStripeResponse: function (status, response) {
		if (status == 200) {
			$('#new_listing').append($('<input type = "hidden" name ="stripeToken" />').val(response.id));
			$('#new_listing')[0].submit();
		} else {
			$('#stripe_error').text(response.error.message).show();
			$('input[type="submit"]').attr('disabled',false);
		}
	}
};

resizeThumbnails = function() {
	var size = $(".thumbnail").width();
	$(".thumbnail .thumb-image").width(size);
	$(".thumbnail .thumb-image").height(size);
}

function listingsReady() {
	// Setting up Stripe
	Stripe.setPublishableKey($('meta[name="stripe-key"]').attr('content'));
	listing.setupForm();

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
			source: location_names
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
		$(el).prependTo('.navbar-search');
	}
	// Moving the advanced search tools
	el = $('div[role=\'advanced-search\']')[0];
	if (el) {
		$('div[role=\'advanced-search\']')[0].remove();
		$(el).appendTo('.navbar-advanced-search');
	}

	var advSearchHeight = $('div[role=\'advanced-search\']').height();
	$("#show-advanced-search").on("click", function () {
		var icon = this.children[0]
		if (icon.getAttribute("class") == "glyphicon glyphicon-chevron-down") {
			// expand
			$(".navbar-default").css("padding-bottom", 52 + advSearchHeight + 6);
			$('div[role=\'advanced-search\']').css("height", advSearchHeight);
			$(".navbar-advanced-search").css("opacity", 1);
			icon.setAttribute("class", "glyphicon glyphicon-chevron-up");
		} else {
			// shrink
			$(".navbar-default").css("padding-bottom", 0);
			$('div[role=\'advanced-search\']').css("height", 0);
			$(".navbar-advanced-search").css("opacity", 0);
			icon.setAttribute("class", "glyphicon glyphicon-chevron-down");
		}
	});


	// Search
	var query = location.search.replace( "?", "" );
	function doSearch () {
		var prevQuery = query;

		var locs = $(".location input").filter(function (i, loc) {
			return loc.checked;
		}).map(function (i, loc) {
			return loc.name;
		});

		var locations = [];
		for (var i = 0; i < locs.length; i++) {
			locations.push(locs[i]);
		}

		query = "search=" + $("#search-box").val()
		      + "&tags=" + locations.join(',')
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
	$(".location input").on("change", doSearch);
	$(document).on("click", ".tag .close", doSearch);
	$("#women_only").on("change", doSearch);


	// Upload button
	$("#upload-button").on("change", function(e) {
		var filename = $("#upload-button input").val();
		$("#upload-filename")[0].innerHTML = filename.slice(filename.lastIndexOf('\\') + 1);
	});


	// making index image into square
	if ($(".thumb-image")[0]) {
		window.addEventListener('resize', resizeThumbnails);
		resizeThumbnails();
	}
};

$(document).ready(listingsReady);
$(document).on("page:load", listingsReady);
