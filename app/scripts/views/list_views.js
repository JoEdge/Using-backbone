(function () {
App.Views.ListHolidays = Backbone.View.extend ({

  tagName: 'ul',
  className: 'cheers',

    events: {},

    template: _.template($('#listHoliday').html()),

  initialize: function(options) {

    this.options = options;

    this.render();

    this.collection.off();
    this.collection.on('sync', this.render, this);

    $('#happy_holidays').html(this.$el);

  },

  render: function(){

    var self = this;

    //clears our element
    this.$el.empty();

    this.collection.each(function(instances){
      self.$el.append(self.template(instances.toJSON()));
    });

    return this;
  },

});

}());
