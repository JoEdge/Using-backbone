(function () {

new App.Views.AddHolidays();

App.all_holidays = new App.Collections.HolidaysCollection();

App.all_holidays.fetch().done(function () {
  new App.Views.HolidaysView ();
});

}());
