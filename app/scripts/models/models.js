(function () {

App.Models.Holiday = Backbone.Model.extend ({

    defaults: {
    event_shop: "",
    date: "",
    name: "",
    age: "",
    street_address: "",
    city_address:"",
    comments: "",
  },

  idAttribute: "_id",

  initialize: function () {
    var n = this.get('name');
    //console.log( n + ' has been added');
  }

});

}());
