replaceLabel = function () {
  if (innerWidth > 991) {
    // wide
    $("#price-name-narrow").attr('style', 'display: none;');
    $("#price-name-wide").attr('style', 'display: block;');

    $("#qty-group").attr('style', 'display: block;');
  } else {
    // narrow
    $("#price-name-narrow").attr('style', 'display: inline-block;');
    $("#price-name-wide").attr('style', 'display: none;');

    $("#qty-group").attr('style', 'display: inline-block; position: relative; top: -10px; left: 60px;');
  }
};

window.addEventListener('resize', replaceLabel);

$(document).ready(function() {
  replaceLabel();

  $("#order_qty").on("blur", function() {
    if (Number(this.value) < 1)  this.value = '1';
    if (Number(this.value) > 20) this.value = '20';
  });
});
