(function () {

//$(document).ready(function() {
//  $('#date').pickadate()
//});

App.all_holidays = new App.Collections.HolidaysCollection();

App.all_holidays.fetch().done(function () {

  //Below gets moved to Router files
  //new App.Views.AddHolidays();

  //new App.Views.ListHolidays({ collection: App.all_holidays});

  App.router = new App.Routers.HolidayRouter();

});

}());
