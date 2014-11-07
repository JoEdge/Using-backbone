(function () {

App.Models.Holiday = Backbone.Model.extend ({

    defaults: {
    event_shop: "",
    date: "",
    name: "",
    age: "",
    street_address: "",
    city_address:"",
    comments: ""
  },

  idAttribute: "_id",

  initialize: function () {
    var n = this.get('name');
    //console.log( n + ' has been added');
  }

});

}());

(function () {
var my_server = "http://tiy-atl-fe-server.herokuapp.com/collections/joanna3";

App.Collections.HolidaysCollection = Backbone.Collection.extend ({
  model: App.Models.Holiday,
    comparator: function (model) {
    return (model.get('event_shop'));
    },
  url: my_server,

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
      event_shop: $("#event_shop").val(),
      date: $("#date").val(),
      name: $("#name").val(),
      age: $("#age").val(),
      street_address: $("#strees_address").val(),
      city_address: $("#city_address").val(),
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

var toy = {};

(function () {

  App.Views.SingleHoliday = Backbone.View.extend({

    tagName: 'ul',
    className: 'HolidaySingle',

    events: {
      'click #commentButton' : 'updateHoliday',
      'click #delete' : 'deleteHoliday'
    },

    template: _.template($('#singleHoliday').html()),

    initialize: function (options) {
      this.options = options;
      this.render();

      $('#holidayAdder').empty();

      // Get our Element On Our Page
      $('#happy_holidays').html(this.$el);
    },

    render: function () {

      this.$el.empty();

      this.$el.html(this.template(this.options.holiday.toJSON()));

    },

    updateHoliday: function (e) {
      e.preventDefault();

      // Update our Model Instance
      this.options.holiday.set({
        comments: $('#holiday_comments').val()
      });

      // Save Instance
      this.options.holiday.save();

      // Go back to our home page
      App.router.navigate('', {trigger: true});

    },

    deleteHoliday: function (e) {
      e.preventDefault();

      // Remove Coffee
      this.options.holiday.destroy();

      // Go home ET
      App.router.navigate('', {trigger: true});

    }

  });

}());

(function () {

  App.Routers.HolidayRouter = Backbone.Router.extend({

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


  //Below gets moved to Router files
  //new App.Views.AddHolidays();

  //new App.Views.ListHolidays({ collection: App.all_holidays});

  App.router = new App.Routers.HolidayRouter();

});

}());
