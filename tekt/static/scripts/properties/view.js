ARK.Properties_View = Backbone.View.extend({

  tagName: "div",

  className: "properties-view",

  events: {},

  initialize: function() {

    this.collection = new ARK.Properties_Collection();
    this.collection.bind('change reset', this.render, this);
    this.collection.fetch({reset:true});

  },

  render: function() {
    
    console.log('now render', this);

  }

});
