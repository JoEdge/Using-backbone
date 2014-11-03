var HolidaysView = Backbone.View.extend ({

  tagName: 'div',
  className: 'happy',


  initialize: function(options) {
    console.log(options);
    this.render(options.collection);

  },

  render: function(collection){
    console.log(collection);
    var self = this;

    var template= $('#happy').html();
    var rendered = _.template(template);

    _.each(collection.models, function(holidaysC){
      self.$el.append(rendered(holidaysC.attributes));
    });


    console.log(this.el);

    $('#happy_holidays').html(this.el);

    return this;
  }



});
