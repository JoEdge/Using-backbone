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
    return (model.get('date'));
    },
  url: my_server,

});

}());


(function () {

App.Views.AddHolidays = Backbone.View.extend ({

  events: {
    'click #addButton' : 'addNewHoliday',
  },

  initialize: function() {
    this.render();

    $('#holidayAdder').empty();

    $('#holidayAdder').html(this.$el);
  },

  render:function(){
    this.$el.html($('#addHoliday').html());
  },

  addNewHoliday: function(e) {
    e.preventDefault();

    //collect info from input
    var smile = new App.Models.Holiday({
      event_shop: $("#event_shop").val(),
      date: $("#date").val(),
      name: $("#name").val(),
      age: $("#age").val(),
      street_address: $("#street_address").val(),
      city_address: $("#city_address").val(),
      comments: $("comments").val(),
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

    events: {},

    template: _.template($('#listHoliday').html()),

  initialize: function(options) {

    this.options = options;

    this.render();

    this.collection.off();
    this.collection.on('sync', this.render, this);

    $('#happy_holidays').html(this.$el);

  },

  render: function(){

    var self = this;

    //clears our element
    this.$el.empty();

    this.collection.each(function(instances){
      self.$el.append(self.template(instances.toJSON()));
    });

    return this;
  },

});

}());



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

    //  $('#holidayAdder').empty();

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
        event_shop: $("#update_event").val(),
        date: $("#update_date").val(),
        name: $("#update_name").val(),
        age: $("#update_age").val(),
        street_address: $("#update_street").val(),
        city_address: $("#update_city").val(),
        comments: $("#update_comments").val()
      });

      // Save Instance
      this.options.holiday.save();

      // Return to home page
      App.router.navigate('', {trigger: true});

    },

    deleteHoliday: function (e) {
      e.preventDefault();

      // Remove Holiday
      this.options.holiday.destroy();

      // Return to home page
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
      'edit/:id' : 'editHoliday',
      'sort/:sortby' : 'home'


    },

    home: function (sortby) {
      new App.Views.AddHolidays();
      new App.Views.ListHolidays({ collection: App.all_holidays, sort: sortby});
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
