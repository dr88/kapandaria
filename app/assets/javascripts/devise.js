function ready() {
  if ($("input#user_name")[0]) {
    if ($("input#user_name").val() != '') {
      full_name = $("input#user_name").val().split(' ');
      $("#first_name").val(full_name.slice(0, -1));
      $("#last_name").val(full_name.pop());
    }
  }

  $("form#new_user").on("submit", function() {
    first_name = $("#first_name");
    last_name = $("#last_name");
    if (first_name.val() == '') {
      first_name.focus();
      first_name.parent().addClass("field_with_errors");
      return false;
    }
    if (last_name.val() == '') {
      last_name.focus();
      last_name.parent().addClass("field_with_errors");
      return false;
    }
    $("input#user_name").val(first_name.val() + ' ' + last_name.val());
  });
}

$(document).ready(ready);
$(document).on("page:load", ready);
