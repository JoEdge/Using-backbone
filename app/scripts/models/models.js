(function () {

App.Models.Holiday = Backbone.Model.extend ({

    defaults: {
    name: "",
    date: "",
    character: "",
    food: "",
    plant: ""
  },

  idAttribute: "_id",

  initialize: function () {
    var n = this.get('name');
    console.log( n + ' has been added');
  }

});

}());
