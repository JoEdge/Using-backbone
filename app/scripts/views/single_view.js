

(function () {

  App.Views.SingleHoliday = Parse.View.extend({

    tagName: 'ul',
    className: 'HolidaySingle',

    events: {
      'click #commentButton' : 'editHoliday',
      'click #delete' : 'deleteHoliday',
    //  'click #addNote' : 'addNote'
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

  //    var noteTemplate = _.template($('#noteTemp').html());
  //    var notes_query = new Parse.Query(App.Models.Note);

  //    notes_query.equalTo('parent', this.options.holiday);

  //    this.$el.append('<h2>Shopping Notes</h2><ul class="notes"></ul>');

  //    notes_query.find({
  //      success: function (results) {

  //        _.each(results, function(notes) {
  //          $('ul.notes').append(noteTemplate(notes.toJSON()));
  //        })
  //      }
  //    })
    },

//    addNote: function (e) {
  //    e.preventDefault();

  //    var note = new App.Models.Note({

    //    notes: $('#notes').val(),
    //    parent: this.options.holiday

  //    });

    //  note.save(null, {
      //  success: function () {
        //  console.log('Note has been added');
        //  App.router.navigate('', {trigger: true});
    //    }
    //  });

  //  },

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

    },

  });

}());
