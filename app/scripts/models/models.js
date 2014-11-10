(function () {

App.Models.Holiday = Parse.Object.extend ({

    defaults: {
    event_shop: "",
    date: "",
    name: "",
    last: "",
    street_address: "",
    city_address:"",
    comments: "",
  },

  idAttribute: "_id",

  initialize: function () {
    var n = this.get('name');
    //console.log( n + ' has been added');
  },

});

}());
