ARK.Properties_list_item = Backbone.View.extend({

  tagName: 'li',
  template: _.template($('#properties_list_record').html()),
  events: { 'click .delete': "delete" },

  delete:function(){

    this.remove();
    this.model.destroy({wait: true});
    
  },

  render: function() {

    this.$el.html(this.template(this.model.toJSON()));
    return this;

  }

});

ARK.Properties_list = Backbone.View.extend({

  tagName: 'ul',
  className: 'list',
  items:{},

  initialize: function() {

    this.collection = new ARK.Properties();
    this.collection.bind('reset', this.addAll, this);
    this.collection.bind('add', this.addOne, this);
    this.collection.fetch({ reset: true });

  },

  addOne: function(model) {

    var config = { model: model };
    var item   = new ARK.Properties_list_item(config);
    this.items[model.cid] = item;

  },

  addAll: function() {

    _.each(this.collection.models, this.addOne, this);
    this.render();

  },

  renderItem: function(item) {
    
    this.$el.append(item.render().el);

  },  

  render: function() {

    // render all items
    _.each(this.items, this.renderItem, this);
    
    // fill container
    $(this.container).html(this.el);

  }

});

// autoload view
ARK.Autoload.view('.properties_list', ARK.Properties_list);