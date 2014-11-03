var my_server = "http://tiy-atl-fe-server.herokuapp.com/collections/joanna3";


var HolidaysCollection = Backbone.Collection.extend ({
  model: Holiday,
  url: my_server

});


var all_holidays = new HolidaysCollection();
console.log(all_holidays);

$("#holidayForm").on('submit', function(h){

//prevent Default
h.preventDefault();

//grab info from input
var holiday_name = $("#name").val();
var holiday_date = $("#date").val();
var holiday_character = $("#character").val();
var holiday_food = $("#food").val();
var holiday_plant = $("#plant").val();


  var smile = new Holiday ({
    name: holiday_name,
    date: holiday_date,
    character: holiday_character,
    food: holiday_food,
    plant: holiday_plant
  });


    //access our collection and add new instances to collection
    all_holidays.add(smile);

    //save our holiday
    smile.save();

    console.log(smile);

    //clear my form
    $(this)[0].reset();

});
