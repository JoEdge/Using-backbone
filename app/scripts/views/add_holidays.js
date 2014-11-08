
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
