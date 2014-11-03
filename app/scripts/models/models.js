var Holidays = Backbone.Model.extend ({

    defaults: {
    name: '',
    date: '',
    character: '',
    food: '',
    plant: ''
  },

  idAttribute: "_id",

  initialize: function () {
    var cheers = this.get('name');
    //console.log("Here we go!");
  }

});
