var toy = {};

(function () {

  App.Views.SingleHoliday = Backbone.View.extend({

    tagName: 'ul',
    className: 'coffeeSingle',

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

      this.$el.empty();

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
