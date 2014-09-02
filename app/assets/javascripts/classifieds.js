function classifiedReady() {
  $(".classified-body").each(
    function (i, val) {
      val.innerHTML = val.innerHTML.replace(/\n/g, "<br>")
    }
  );

  // Moving the search box
  el = $('div[role=\'classified-search\']')[0];
  if (el) {
    $('div[role=\'classified-search\']')[0].remove();
    $(el).prependTo('.navbar-search');
  }

  // Search
  var query = location.search.replace( "?", "" );
  function doClassSearch () {
    var prevQuery = query;

    query = "search=" + $("#classified-search-box").val();

    if (query != prevQuery) {
      uri = location.protocol + '//' + location.host + location.pathname + '?' + query;
      $.getScript(uri);
      console.log(uri);
    }
  }

  var timer;
  function delayedClassSearch () {
    clearTimeout(timer);
    timer = setTimeout(doClassSearch, 1000);
  }

  $("#classified-search-box").on("input", delayedClassSearch);
  $("#classified-search-box").on("keyup", function(e) { if (e.keyCode == 13) doClassSearch() } );
  $("#submit-classified-search").on("click", doClassSearch);
}

$(document).ready(classifiedReady);
$(document).on("page:load", classifiedReady);
