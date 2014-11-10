window.App ={};
App.Models = {};
App.Collections = {};
App.Views = {};
App.Routers = {};

(function () {

App.Models.Holiday = Parse.Object.extend ({

    defaults: {
    event_shop: "",
    date: "",
    name: "",
    last: "",
    street_address: "",
    city_address:"",
    comments: "",
  },

  className: 'Shop',

  idAttribute: "_id",

  initialize: function () {
    var n = this.get('name');
    //console.log( n + ' has been added');
  },

});

}());

(function () {
//var my_server = "http://tiy-atl-fe-server.herokuapp.com/collections/joanna3";

App.Collections.HolidaysCollection = Parse.Collection.extend ({
  model: App.Models.Holiday,
    comparator: function (model) {
    return (model.get('date'));
    },
  //url: my_server,

});

}());


(function () {

App.Views.AddHolidays = Parse.View.extend ({

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
      last: $("#last").val(),
      street_address: $("#street_address").val(),
      city_address: $("#city_address").val(),
      comments: $("#comments").val(),
    });

    //Because parse uses an older model of Backbone the original function wont work. CHange to what is below
    //access our collection and add new instances to collection
    //App.all_holidays.add(smile);

    //save our holiday
    //parse only because model is connected to database vs backbone where collection is connected to database
    smile.save(null, {
      success: function () {
        App.all_holidays.add(smile);
      }
    });

    //clear my form
    $("#holidayForm")[0].reset();
  }

});

}());

(function () {
App.Views.ListHolidays = Parse.View.extend ({

  tagName: 'ul',
  className: 'cheers',

    events: {
      'click h5' : 'showIt',
    },

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

    // Sorting On The Fly
    if (this.options.sort != undefined) {
      // Setting up a localized collection to sort by our sort param
      var list_collection = this.collection.sortBy( function (model) {
        return model.get(self.options.sort);
      });
      _.each(list_collection, function (s) {
        self.$el.append(self.template(s.toJSON()));
      })
    } else {
      // Sort from our default
      this.collection.sort();
      this.collection.each(function (s) {
        self.$el.append(self.template(s.toJSON()));
      });
    }
      return this;
  },

  showIt: function(e) {
    e.preventDefault();

    $('p').slideToggle('slow');

  }

});

}());



(function () {

  App.Views.SingleHoliday = Parse.View.extend({

    tagName: 'ul',
    className: 'HolidaySingle',

    events: {
      'click #commentButton' : 'editHoliday',
      'click #delete' : 'deleteHoliday'
    },

    template: _.template($('#singleHoliday').html()),

    initialize: function (options) {
      this.options = options;
      this.render();

      // Get our Element On Our Page
      $('#happy_holidays').html(this.$el);
    },

    render: function () {

      this.$el.empty();

      this.$el.html(this.template(this.options.holiday.toJSON()));

    },

    editHoliday: function (e) {
      e.preventDefault();

      // Update our Model Instance
      this.options.holiday.set({
        event_shop: $("#update_event").val(),
        date: $("#update_date").val(),
        name: $("#update_name").val(),
        last: $("#update_last").val(),
        street_address: $("#update_street").val(),
        city_address: $("#update_city").val(),
        comments: $("#update_comments").val(),
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

  App.Routers.HolidayRouter = Parse.Router.extend({

    initialize: function () {
      // Light the Fire
      Parse.history.start();
    },

    routes: {
      '' : 'home',
      'edit/:id' : 'editHoliday',
      'sort/:sortby' : 'home'
    },

    home: function (sortby) {
      new App.Views.AddHolidays();
      new App.Views.ListHolidays({ collection: App.all_holidays, sort: sortby});
      $('.addInfo').show();
      $('.sorts').show();
    },


    editHoliday: function (id) {
      var h = App.all_holidays.get(id);
      new App.Views.SingleHoliday({ holiday: h });
      $('.addInfo').hide();
      $('.sorts').hide();
    },

  });

}());

Parse.initialize("XOGK5nk2lWKVLAO0VVWxiLwMJ6Td6qfFtmwVXQxc", "eo2L7dhhVf0Y56cOCeRXbkaKmimxLdkb7f0RmzUM");

(function () {

App.all_holidays = new App.Collections.HolidaysCollection();

App.all_holidays.fetch().done(function () {

  App.router = new App.Routers.HolidayRouter();

});

}());
