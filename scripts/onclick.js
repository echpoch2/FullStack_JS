function ship_active(){
  $('.CustomerInfo').css('display','none');
  $('.ShipTo').css('display','flex');
  $('.customer-ico').removeClass("active");
  $('.shipping-ico').addClass("active");

}
function profile_active() {
  $('.CustomerInfo').css('display','flex');
  $('.ShipTo').css('display','none');
  $('.shipping-ico').removeClass("active");
  $('.customer-ico').addClass("active");
}
