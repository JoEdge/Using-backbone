
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

    //set var to convert date to UTC code
    //var utc_date = Date.parse($("#date").val());

    //grab info from input
    var smile = new App.Models.Holiday({
      event_shop: $("#event_shop").val(),
      date: $("#date").val(), //utc_date
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
