function classifiedReady() {
  $(".classified-body").each(
    function (i, val) {
      val.innerHTML = val.innerHTML.replace(/\n/g, "<br>")
    }
  );
}

$(document).ready(classifiedReady);
$(document).on("page:load", classifiedReady);
