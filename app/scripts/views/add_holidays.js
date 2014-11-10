
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

    //Because parse uses an older model of Backbone the below function wont work. CHange to what is below
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
