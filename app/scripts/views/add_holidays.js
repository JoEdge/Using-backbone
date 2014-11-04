
(function () {

App.Views.AddHolidays = Backbone.View.extend ({

  el:'#holidayAdder',
//always delegated events
  events: {
    "submit #holidayForm" : "addNewHoliday"
  },

  initialize: function() {
    this.render();
  },

  render:function(){
    var form_html = $('#addHoliday').html();
    this.$el.html(form_html);
  },

  addNewHoliday: function(e) {
    e.preventDefault();

  //grab info from input
  var holiday_name = $("#name").val();
  var holiday_date = $("#date").val();
  var holiday_character = $("#character").val();
  var holiday_symbol = $("#symbol").val();
  var holiday_food = $("#food").val();
  var holiday_plant = $("#plant").val();


  var smile = new App.Models.Holiday ({
    name: holiday_name,
    date: holiday_date,
    character: holiday_character,
    symbol: holiday_symbol,
    food: holiday_food,
    plant: holiday_plant
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
