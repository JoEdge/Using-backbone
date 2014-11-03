var my_server = "http://tiy-atl-fe-server.herokuapp.com/collections/joanna3";


var HolidaysCollection = Backbone.Collection.extend ({
  model: Holidays,
  url: my_server

});
