window.onload = function() {
  add_orders();
  ship_active();
  getOrderInfo(Orders[0].id);
  order_active(Orders[0].id);
};
function getOrderInfo(id, key) {
  let bufOrders = Orders.concat(); //создание копии Orders
  $(".buffer-line-tr").html(" ");
  bufOrders.forEach((item, i) => {
    if(item.id==id){

      $(".main-order-number").text("Order " +item.id);
      $(".customer-info").text("Customer " +item.OrderInfo.customer);
      $(".ordered").text("Ordered " +item.OrderInfo.createdAt);
      $(".shiped").text("Shipped " +item.OrderInfo.shippedAt);

      $(".ship-name").text(item.ShipTo.name);
      $(".ship-adress").text(item.ShipTo.Address);
      $(".ZIP").text(item.ShipTo.ZIP);
      $(".region").text(item.ShipTo.Region);
      $(".country").text(item.ShipTo.Country);

      $(".full-name").text(item.CustomerInfo.firstName+" "+item.CustomerInfo.lastName);
      $(".customer-adress").text(item.CustomerInfo.address);
      $(".phone").text(item.CustomerInfo.phone);
      $(".email").text(item.CustomerInfo.email);

      var total=0;
      var k=0;
      item.products.forEach((product_item, i) => {
        total += parseInt(product_item.price) * parseInt(product_item.quantity);

        if(product_item.coincidence!=0 && key == "searchResult") //если результат отрицателен то не выводим product
        {
          k++;
          $('<div>',{
            class: "line-tr",
          }).html(
          '<div> <span class="bold naming">'+product_item.name+'</span> <span class="small number">'+product_item.id+'</span></div>'+
          '<div class="hidden-field small">  Unit Price:    </div>'+
          '<div > <span><span class="price">'+product_item.price+' </span><span class="small wallet-table">'+product_item.currency+'</span></span></div>'+
        '<div class="hidden-field small">Quantity:</div>'+
          '<div ><span> <span class="small">'+product_item.quantity+'</span></span></div>'+
          '<div class="hidden-field small">Total:</div>'+
          '<div class="bold"><span> <span class="price"> '+product_item.totalPrice+'</span><span class="small wallet-table"> EUR</span></span></div>'
          ).appendTo(".buffer-line-tr")
        }
        else if(key != "searchResult"){

            k++;
            $('<div>',{
              class: "line-tr",
            }).html(
            '<div> <span class="bold naming">'+product_item.name+'</span> <span class="small number">'+product_item.id+'</span></div>'+
            '<div class="hidden-field small">  Unit Price:    </div>'+
            '<div > <span><span class="price">'+product_item.price+' </span><span class="small wallet-table">'+product_item.currency+'</span></span></div>'+
          '<div class="hidden-field small">Quantity:</div>'+
            '<div ><span> <span class="small">'+product_item.quantity+'</span></span></div>'+
            '<div class="hidden-field small">Total:</div>'+
            '<div class="bold"><span> <span class="price"> '+product_item.totalPrice+'</span><span class="small wallet-table"> EUR</span></span></div>'
            ).appendTo(".buffer-line-tr")

        }
        $(".line-items-header").text("Line Items("+(k)+")");
        });


      $("[data-label=Product]").attr("onClick","sort("+id+",'product')");
      $("[data-label=Unit-Price]").attr("onClick","sort("+id+",'price')");
      $("[data-label=Quantity]").attr("onClick","sort("+id+",'quantity')");
      $("[data-label=Total]").attr("onClick","sort("+id+",'total')");
      $("#jsOrderRefresher").attr("onClick","getOrderInfo("+id+")");
      $(".line-th").attr("idorder",id); //храним id ордера в произвольном аттрибуте
      $(".main-order-cost-2").text(total);
    }
  });

}
function add_orders(flag){
  let bufOrders = Orders.slice(); //создание копии Orders
  $(".elements").html(" "); //очистка elements
  if(flag=="searchResult"){

    for(let i=0; i<bufOrders.length; ++i)//цикл для поиска совпадений при поиске
    {
      if(bufOrders[i].coincidence==0)
      {
        bufOrders.splice(i,1);
        --i;
      }
    }
    function compare(a,b)
    {
      if (a.coincidence > b.coincidence) return -1; // если первое значение больше второго
      if (a.coincidence == b.coincidence) return 0; // если равны
      if (a.coincidence < b.coincidence) return 1; // если первое значение меньше второго
    }
    bufOrders.sort(compare); //сортировка элементов по количеству совпадений при поиске
  }
  $(".Orders-title").text("Orders ("+bufOrders.length+")")
    if(bufOrders.length==0)
    {
      $(".elements").html("<div class='small' style='text-align:center'>Заказы не найдены :(</div>");
    }
    bufOrders.forEach((item, i) => {

        var status;
        switch (item.OrderInfo.status) {
          case "Accepted":
            status = "status-success"
            break;
          case "Pending":
            status = "status-pending"
            break;
          default:
            status = "status-late"

        }
        var id = item.id;
        $('<div>',{
          class: 'order',
          append:
            $('<div>',{
              class: "order-info",
              append:
                $('<div>',{
                class:"order-number",
                text: "Order "+item.id,}).add(
                $('<div>',{
                class:"order-date",
                text: item.OrderInfo.createdAt})
                )
              }).add(
                $('<div>',{
                  class:'order-container-1',
                  append:
                    $('<div>',{
                      class: 'order-container-2',
                      append: $('<div>',{
                          class:"order-customer",
                          text:item.OrderInfo.customer,
                        }).add(
                          $('<div>',{
                            class:"order-ship-date",
                            text:item.OrderInfo.shippedAt,
                          })
                        )
                    }).add(
                      $('<div>',{
                        class:"order-status "+status,
                        text:item.OrderInfo.status,
                      })
                    )
                })
              )
            }).attr('onClick', 'getOrderInfo('+item.id+'); order_active('+item.id+')').attr('jsIdOrder', item.id)
        .appendTo(".elements");
      });



}
