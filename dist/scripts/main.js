var Holiday = Backbone.Model.extend ({

    defaults: {
    name: "",
    date: "",
    character: "",
    food: "",
    plant: ""
  },

  idAttribute: "_id",

  initialize: function () {
    var n = this.get('name');
    console.log( n + ' has been added');
  }

});

  var xmas = new Holiday({
    name: "Christmas",
    date: "December 25th",
    character: "Santa Claus",
    food: "Sugar Plums",
    plant: "Mistletoe"
  });

  var halloween = new Holiday({
    name: "Halloween",
    date: "October 31st",
    character: "Ghosts",
    food: "Candy",
    plant: "Pumpkins"
  });

  var thanksgiving = new Holiday({
    name: "Thanksgiving",
    date: "November 27th",
    character: "Tom Turkey",
    food: "Roasted Turkey",
    plant: "Cranberries"
  });

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

var HolidaysView = Backbone.View.extend ({

  tagName: 'div',
  className: 'happy',


  initialize: function(options) {
    console.log(options);
    this.render(options.collection);

  },

  render: function(collection){
    console.log(collection);
    var self = this;

    var template= $('#happy').html();
    var rendered = _.template(template);

    _.each(collection.models, function(holidaysC){
      self.$el.append(rendered(holidaysC.attributes));
    });


    console.log(this.el);

    $('#happy_holidays').html(this.el);

    return this;
  }



});



all_holidays.fetch().done(function () {
  var holidaysView = new HolidaysView ({
    collection: all_holidays
  });
});
