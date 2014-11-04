(function () {

App.Models.Holiday = Backbone.Model.extend ({

    defaults: {
    name: "",
    date: "",
    character: "",
    symbol: "",
    food: "",
    plant: ""
  },

  idAttribute: "_id",

  initialize: function () {
    var n = this.get('name');
    console.log( n + ' has been added');
  }

});

}());

(function () {
var my_server = "http://tiy-atl-fe-server.herokuapp.com/collections/joanna3";

App.Collections.HolidaysCollection = Backbone.Collection.extend ({
  model: App.Models.Holiday,
  url: my_server

});

}());

(function () {
App.Views.HolidaysView = Backbone.View.extend ({

  tagName: 'ul',
  className: 'happy',

    events: {
    "click li": "deleteHoliday"
  },

  initialize: function() {
    this.render();

    App.all_holidays.on('sync', this.render, this);
    App.all_holidays.on('destroy', this.render, this);

    $('#happy_holidays').html(this.el);

  },

  render: function(){
    var self = this;

    var template= $('#happy').html();
    var rendered = _.template(template);

    //clears our element
    this.$el.empty();


    App.all_holidays.each(function(c){
      self.$el.append(rendered(c.toJSON()));
    });

    return this;
  },

    deleteHoliday: function(e) {

    e.preventDefault();

    var id = $(e.target).attr('id');

    var gone = App.all_holidays.get(id);

    gone.destroy();

  }


});

}());


(function () {

App.Views.AddHolidays = Backbone.View.extend ({

  el:'#holidayAdder',
//always delegated events
  events: {
    "submit #holidayForm" : "addNewHoliday"
  },

  initialize: function() {
    this.render();
  },

  render:function(){
    var form_html = $('#addHoliday').html();
    this.$el.html(form_html);
  },

  addNewHoliday: function(e) {
    e.preventDefault();

  //grab info from input
  var holiday_name = $("#name").val();
  var holiday_date = $("#date").val();
  var holiday_character = $("#character").val();
  var holiday_symbol = $("#symbol").val();
  var holiday_food = $("#food").val();
  var holiday_plant = $("#plant").val();


  var smile = new App.Models.Holiday ({
    name: holiday_name,
    date: holiday_date,
    character: holiday_character,
    symbol: holiday_symbol,
    food: holiday_food,
    plant: holiday_plant
  });


    //access our collection and add new instances to collection
    App.all_holidays.add(smile);

    //save our holiday
    smile.save();

    //clear my form
    $("#holidayForm")[0].reset();
}
});

}());

(function () {

new App.Views.AddHolidays();

App.all_holidays = new App.Collections.HolidaysCollection();

App.all_holidays.fetch().done(function () {
  new App.Views.HolidaysView ();
});

}());
