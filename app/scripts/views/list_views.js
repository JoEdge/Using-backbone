(function () {
App.Views.ListHolidays = Backbone.View.extend ({

  tagName: 'ul',
  className: 'cheers',

//    events: {
//    "click li": "deleteHoliday"
//  },

    events: {},

    template: _.template($('#listHoliday').html()),

  initialize: function() {
    this.render();

    this.collection.off();
    this.collection.on('sync', this.render, this);

    $('#happy_holidays').html(this.$el);

  },

  render: function(){
    var self = this;

    //clears our element
    this.$el.empty();

    this.collection.each(function(c){
      self.$el.append(self.template(c.toJSON()));
    });

    return this;
  },

  /*  deleteHoliday: function(e) {

    e.preventDefault();

    var id = $(e.target).attr('id');

    var gone = App.all_holidays.get(id);

    gone.destroy();

  } */

});

}());
