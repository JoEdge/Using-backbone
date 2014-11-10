Parse.initialize("XOGK5nk2lWKVLAO0VVWxiLwMJ6Td6qfFtmwVXQxc", "eo2L7dhhVf0Y56cOCeRXbkaKmimxLdkb7f0RmzUM");

(function () {

App.all_holidays = new App.Collections.HolidaysCollection();

App.all_holidays.fetch().done(function () {

  App.router = new App.Routers.HolidayRouter();

});

}());
