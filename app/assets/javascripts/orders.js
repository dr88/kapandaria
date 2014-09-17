var payment = {
  setupForm: function () {
    $("#new_order").submit(function () {
      $("input[type='submit']").attr("disabled", true);
      Stripe.card.createToken($('#new_order'), payment.handleStripeResponse);
      return false;
    });
  },
  handleStripeResponse: function (status, response) {
    if (status == 200) {
      $('#new_order').append($('<input type = "hidden" name ="stripeToken" />').val(response.id));
      $('#new_order')[0].submit();
    } else {
      $('#stripe_error').text(response.error.message).show();
      $('input[type="submit"]').attr('disabled',false);
    }
  }
};

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

function ordersReady() {
  // Setting up Stripe
  Stripe.setPublishableKey($('meta[name="stripe-key"]').attr('content'));
  payment.setupForm();

  replaceLabel();
  window.addEventListener('resize', replaceLabel);

  $("#order_qty").on("blur", function() {
    if (Number(this.value) < 1)  this.value = '1';
    if (Number(this.value) > 20) this.value = '20';
  });

  $("tr.order").on("click", function() {
    var id = this.id;
    $.ajax({
      url: "/order/" + id,
      type: "GET",
      success: function (data) {
        console.log(data);
        $(".modal-wrapper")[0].innerHTML = data;
        $(".modal").modal({show: true});
      }
    });
  });
}

$(document).ready(ordersReady);
$(document).on("page:load", ordersReady);
