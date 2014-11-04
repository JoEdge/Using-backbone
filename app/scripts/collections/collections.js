(function () {
var my_server = "http://tiy-atl-fe-server.herokuapp.com/collections/joanna3";

App.Collections.HolidaysCollection = Backbone.Collection.extend ({
  model: App.Models.Holiday,
  url: my_server

});

}());
