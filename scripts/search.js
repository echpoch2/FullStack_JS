
function find(value)
{
for (var obj in Orders) {
  let info_obj=destruct(Orders[obj]);
  for (var field_key in info_obj) {
    console.log(info_obj[field_key])
  }
}
}
function destruct(obj)
{
  for (var val in obj) {

    if(typeof(obj[val]).indexOf("Object"))
    {

      destruct(obj[val]);
    }
    else {
      return obj;
    }
  }
}
find();
