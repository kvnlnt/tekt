/** 
 * Properties list view item
 * @module ARK.Properties_part_list_item
 */
ARK.Properties_part_list_item = Backbone.View.extend({

  tagName: 'li',
  className: 'properties_part_list_item',
  events: { 'click .delete': "delete" },

  delete:function(){

    var prompt = ARK.Prompt('Are you sure you want to delete this property? This will also delete any paths connected to this property. Any pages, parts and pieces used by this property will NOT be deleted, however they may be orphaned if they are not used by any other property. To confirm this deletion, type DELETE');
    if(prompt){
      this.remove();
      this.model.destroy({wait: true});
    } else {
      ARK.Messenger('Deletion cancelled');
    }

    return this;
    
  },

  render: function() {

    var template = ARK.Template(ARK.Properties_piece_list_item, this.model.toJSON());
    this.$el.html(template);

    return this;

  }

});

/** 
 * Properties list view
 * @module ARK.Properties_part_list
 */
ARK.Properties_part_list = Backbone.View.extend({

  el:'.properties_part_list',
  items:{},

  initialize: function() {

    this.collection.bind('reset', this.addAll, this);
    this.collection.bind('add', this.addOne, this);
    this.collection.bind('error', this.error, this);

  },

  error:function(model, xhr){

    var message =  xhr.responseJSON === void 0 ? 'There was an error' : xhr.responseJSON.error;
    ARK.Messenger(message);

  },

  addOne: function(model) {

    var config = { model: model };
    var item   = new ARK.Properties_part_list_item(config);
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

    // fill container
    $(this.container).html(this.el);

    return this;

  }

});
