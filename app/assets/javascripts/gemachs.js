function gemachReady() {
  $(".gemach-body").each(
    function (i, val) {
      val.innerHTML = val.innerHTML.replace(/\n/g, "<br>")
    }
  );

  // Search
  var query = location.search.replace( "?", "" );
  function doClassSearch () {
    var prevQuery = query;

    query = "search=" + $("#gemach-search-box").val();

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

  $("#gemach-search-box").on("input", delayedClassSearch);
  $("#gemach-search-box").on("keyup", function(e) { if (e.keyCode == 13) doClassSearch() } );
  $("#submit-gemach-search").on("click", doClassSearch);
}

$(document).ready(gemachReady);
$(document).on("page:load", gemachReady);
