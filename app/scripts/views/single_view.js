

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
