
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
      food: $("#food").val(),
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
