ARK.Properties_list_item = Backbone.View.extend({

  tagName: 'li',
  template: '#properties_list_record',
  events: { 'click .delete': "delete" },

  delete:function(){

    // var prompt = ARK.Prompt('To delete this property, please type DELETE');
    if(true){
      this.remove();
      this.model.destroy({wait: true});
    } else {
      ARK.Messenger('Deletion cancelled');
    }
    
  },

  render: function() {

    var template = ARK.Template(this);
    this.$el.html(template);
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
    ARK.pubsub.on('properties_list:addOne', this.addOne, this);

  },

  addOne: function(model) {

    var config = { model: model };
    var item   = new ARK.Properties_list_item(config);
    this.renderItem(item);
    this.items[model.cid] = item;

  },

  addAll: function() {

    this.$el.empty();
    _.each(this.collection.models, this.addOne, this);
    this.render();

  },

  renderItem: function(item) {
    
    this.$el.append(item.render().el);

  },  

  render: function() {

    // render all items
    // _.each(this.items, this.renderItem, this);
    
    // fill container
    $(this.container).html(this.el);

  }

});

// autoload view
ARK.Autoload.view('.properties_list', ARK.Properties_list);