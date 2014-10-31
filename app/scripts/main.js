var Holidays = Backbone.Model.extend ({

  initialize: function () {
    //console.log("Here we go!");
  }

});

var HolidaysCollection = Backbone.Collection.extend ({
  model: Holidays,
  url: "http://tiy-atl-fe-server.herokuapp.com/collections/joanna3"

});

var all_holidays = new HolidaysCollection;


var xmas = new Holidays({
  name: "Christmas",
  date: "December 25th",
  character: "Santa Claus",
  food: "Sugar Plums",
  plant: "Mistletoe"
});

var halloween = new Holidays({
  name: "Halloween",
  date: "October 31st",
  character: "Ghosts",
  food: "Candy",
  plant: "Pumpkin"
});

var thanksgiving = new Holidays({
  name: "Thanksgiving",
  date: "November 27th",
  character: "Tom Turkey",
  food: "Roasted Turkey",
  plant: "Cranberries"
});
