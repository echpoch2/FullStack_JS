window.onload = function() {
  add_orders();
  ship_active();
};
function getOrderInfo(id) {
  $(".buffer-line-tr").html(" ");
  for(key in Orders){
    if(Orders[key].id==id){
      $(".main-order-number").text("Order " +Orders[key].id);
      $(".customer-info").text("Customer " +Orders[key].OrderInfo.customer);
      $(".ordered").text("Ordered " +Orders[key].OrderInfo.createdAt);
      $(".shiped").text("Shipped " +Orders[key].OrderInfo.shippedAt);

      $(".ship-name").text(Orders[key].ShipTo.name);
      $(".ship-adress").text(Orders[key].ShipTo.Address);
      $(".ZIP").text(Orders[key].ShipTo.ZIP);
      $(".region").text(Orders[key].ShipTo.Region);
      $(".country").text(Orders[key].ShipTo.Country);

      $(".full-name").text(Orders[key].CustomerInfo.firstName+" "+Orders[key].CustomerInfo.lastName);
      $(".customer-adress").text(Orders[key].CustomerInfo.address);
      $(".phone").text(Orders[key].CustomerInfo.phone);
      $(".email").text(Orders[key].CustomerInfo.email);

      var total=0;
      for (var key2 in Orders[key].products) {
        total += parseInt(Orders[key].products[key2].price) * parseInt(Orders[key].products[key2].quantity);
        $('<div>',{
          class: "line-tr",
        }).html(
        '<div> <span class="bold naming">'+Orders[key].products[key2].name+'</span> <span class="small number">'+Orders[key].products[key2].id+'</span></div>'+
        '<div class="hidden-field small">  Unit Price:    </div>'+
        '<div > <span><span class="price">'+Orders[key].products[key2].price+' </span><span class="small wallet-table">'+Orders[key].products[key2].currency+'</span></span></div>'+
      '<div class="hidden-field small">Quantity:</div>'+
        '<div ><span> <span class="small">'+Orders[key].products[key2].quantity+'</span></span></div>'+
        '<div class="hidden-field small">Total:</div>'+
        '<div class="bold"><span> <span class="price"> '+Orders[key].products[key2].totalPrice+'</span><span class="small wallet-table"> EUR</span></span></div>'
        ).appendTo(".buffer-line-tr")
      }
      $(".line-items-header").text("Line Items("+(parseInt(key2)+parseInt(1))+")");
      $(".main-order-cost-2").text(total);
    }
  }
}
function add_orders(){
  for(key in Orders)
  {
    var status;
    switch (Orders[key].OrderInfo.status) {
      case "Accepted":
        status = "status-success"
        break;
      case "Pending":
        status = "status-pending"
        break;
      default:
        status = "status-late"

    }
    var id = Orders[key].id;
    $('<div>',{
      class: 'order',

      append:
        $('<div>',{
          class: "order-info",
          append:
            $('<div>',{
            class:"order-number",
            text: "Order "+Orders[key].id,}).add(
            $('<div>',{
            class:"order-date",
            text: Orders[key].OrderInfo.createdAt})
            )
          }).add(
            $('<div>',{
              class:'order-container-1',
              append:
                $('<div>',{
                  class: 'order-container-2',
                  append: $('<div>',{
                      class:"order-customer",
                      text:Orders[key].OrderInfo.customer,
                    }).add(
                      $('<div>',{
                        class:"order-ship-date",
                        text:Orders[key].OrderInfo.shippedAt,
                      })
                    )
                }).add(
                  $('<div>',{
                    class:"order-status "+status,
                    text:Orders[key].OrderInfo.status,
                  })
                )
            })
          )
        }).attr('onClick', 'getOrderInfo('+Orders[key].id+');')
    .appendTo(".elements");
  }

}
