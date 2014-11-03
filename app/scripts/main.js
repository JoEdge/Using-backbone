
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

all_holidays.fetch().done(function () {
  var holidaysView = new HolidaysView ({
    collection: all_holidays
  });
});
