$(document).ready(function() {
  $("#order_qty").on("blur", function() {
    if (Number(this.value) < 1)  this.value = '1';
    if (Number(this.value) > 20) this.value = '20';
  });
});