(function () {
var my_server = "http://tiy-atl-fe-server.herokuapp.com/collections/joanna3";

App.Collections.HolidaysCollection = Backbone.Collection.extend ({
  model: App.Models.Holiday,
    comparator: function (model) {
    return (model.get('event_shop'));
    },
  url: my_server,

});

}());
