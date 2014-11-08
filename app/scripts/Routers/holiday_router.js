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
