(function () {
App.Views.HolidaysView = Backbone.View.extend ({

  tagName: 'ul',
  className: 'happy',

    events: {
    "click li": "deleteHoliday"
  },

  initialize: function() {
    this.render();

    App.all_holidays.on('sync', this.render, this);
    App.all_holidays.on('destroy', this.render, this);

    $('#happy_holidays').html(this.el);

  },

  render: function(){
    var self = this;

    var template= $('#happy').html();
    var rendered = _.template(template);

    //clears our element
    this.$el.empty();


    App.all_holidays.each(function(c){
      self.$el.append(rendered(c.toJSON()));
    });

    return this;
  },

    deleteHoliday: function(e) {

    e.preventDefault();

    var id = $(e.target).attr('id');

    var gone = App.all_holidays.get(id);

    gone.destroy();

  }


});

}());
