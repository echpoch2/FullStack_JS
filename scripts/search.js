function find_order(){
  let string = $('.search_field').val();
  arr_string = string.split(" ");
  Orders.forEach((item, i) => {
    item.coincidence = 0; //свойство для подсчета кол-ва совпадений
    arr_string.forEach((word, i) => {
     if(item.id==word or item.id=="Order "+word)
      {
       item.coincidence++;
    }
    for (var field in item.OrderInfo) {

        if(1+item.OrderInfo[field].indexOf(word)){
          item.coincidence++;
        }

    }
    for (var field in item.ShipTo) {

        if(1+item.ShipTo[field].indexOf(word)){
          item.coincidence++;
        }

    }
    for (var field in item.CustomerInfo) {

        if(1+item.CustomerInfo[field].indexOf(word)){
          item.coincidence++;
        }

    }


  });

  });
  add_orders("searchResult");
}
