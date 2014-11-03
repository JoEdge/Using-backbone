var Holiday = Backbone.Model.extend ({

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

  var xmas = new Holiday({
    name: "Christmas",
    date: "December 25th",
    character: "Santa Claus",
    food: "Sugar Plums",
    plant: "Mistletoe"
  });

  var halloween = new Holiday({
    name: "Halloween",
    date: "October 31st",
    character: "Ghosts",
    food: "Candy",
    plant: "Pumpkins"
  });

  var thanksgiving = new Holiday({
    name: "Thanksgiving",
    date: "November 27th",
    character: "Tom Turkey",
    food: "Roasted Turkey",
    plant: "Cranberries"
  });
