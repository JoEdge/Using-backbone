

all_holidays.fetch().done(function () {
  var holidaysView = new HolidaysView ({
    collection: all_holidays
  });
});
