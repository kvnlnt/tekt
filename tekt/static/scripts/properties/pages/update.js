/** 
 * Used to configure the Properties list page
 * @module ARK.Properties_page_list
 */

ARK.Properties_page_update = Backbone.Router.extend({

  routes: {
    "": "update",    // #list page
  },

  initialize: function(args){

    var model = new ARK.Property({id:args.id});
    var view  = new ARK.Properties_part_update({model:model});

    this.model = model;
    this.view = view;

    Backbone.history.start();

  },

  update: function() {

    // load
    this.model.fetch({ reset:true });

  },

});