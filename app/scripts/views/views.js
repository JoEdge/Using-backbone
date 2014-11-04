(function () {
App.Views.HolidaysView = Backbone.View.extend ({

  tagName: 'ul',
  className: 'happy',

    events: {
    "click li": "deleteHoliday"
  },

  initialize: function(options) {
    console.log(options);
    this.render();

    App.all_holidays.on('sync', this.render, this);
    App.all_holidays.on('destroy', this.render, this);

  },

  render: function(){
    var self = this;

    var template= $('#happy').html();
    var rendered = _.template(template);

    //clears our element
    this.$el.empty();


    _.each(App.all_holidays.models, function(holidaysC){
      self.$el.append(rendered(holidaysC.attributes));
    });


    console.log(this.el);

    $('#happy_holidays').html(this.el);

    return this;
  },

    deleteHoliday: function(e) {

    e.preventDefault();

    var id = $(e.target).attr('id');

    var gone = App.all_holidays.get(id);

    console.log(gone);

    gone.destroy();

  }


});

}());
