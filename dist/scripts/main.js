(function () {

App.Models.Holiday = Backbone.Model.extend ({

    defaults: {
    name: "",
    date: "",
    character: "",
    symbol: "",
    food: "",
    plant: "",
    comments: ""
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

App.Views.AddHolidays = Backbone.View.extend ({

//  el:'#holidayAdder',
//always delegated events

  events: {
    "submit #holidayForm" : "addNewHoliday"
  },

  initialize: function() {
    this.render();

    $('#holidayAdder').html(this.$el);
  },

  render:function(){
  //  var form_html = $('#addHoliday').html();
  //  this.$el.html(form_html);
    this.$el.html($('#addHoliday').html());
  },

  addNewHoliday: function(e) {
    e.preventDefault();

    //grab info from input
    var smile = new App.Models.Holiday({
      name: $("#name").val(),
      date: $("#date").val(),
      character: $("#character").val(),
      symbol: $("#symbol").val(),
      food: $("#food").val(),
      plant: $("#plant").val(),
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
App.Views.ListHolidays = Backbone.View.extend ({

  tagName: 'ul',
  className: 'cheers',

//    events: {
//    "click li": "deleteHoliday"
//  },

    events: {},

    template: _.template($('#listHoliday').html()),

  initialize: function() {
    this.render();

    this.collection.off();
    this.collection.on('sync', this.render, this);

    $('#happy_holidays').html(this.$el);

  },

  render: function(){
    var self = this;

    //clears our element
    this.$el.empty();

    this.collection.each(function(c){
      self.$el.append(self.template(c.toJSON()));
    });

    return this;
  },

  /*  deleteHoliday: function(e) {

    e.preventDefault();

    var id = $(e.target).attr('id');

    var gone = App.all_holidays.get(id);

    gone.destroy();

  } */

});

}());


(function () {

  App.Routers.AppRouter = Backbone.Router.extend({

    initialize: function () {
      // Light the Fire
      Backbone.history.start();
    },

    routes: {
      '' : 'home',
      'edit/:id' : 'editHoliday'
    },

    home: function () {
      new App.Views.AddHolidays();
      new App.Views.ListHolidays({ collection: App.all_holidays});
    },

    editHoliday: function (id) {

      var h = App.all_holidays.get(id);

      new App.Views.SingleHoliday({ holiday: h });
    }

  });

}());

(function () {

App.all_holidays = new App.Collections.HolidaysCollection();

App.all_holidays.fetch().done(function () {


  //Below gets moved to ROuter files
  //new App.Views.AddHolidays();

  //new App.Views.ListHolidays({ collection: App.all_holidays});

  App.router = new App.Routers.AppRouter();

});

}());
