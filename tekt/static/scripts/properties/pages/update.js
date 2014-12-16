/** 
 * Used to configure the Properties list page
 * @module ARK.Properties_page_list
 */

ARK.Properties_page_update = Backbone.Router.extend({

  routes: {
    "": "update",
  },

  initialize: function(args){

    var model = new ARK.Property({id:args.id});
    var view  = new ARK.Form({model:model});
    var update = new ARK.Properties_part_update({model:model});

    this.model = model;
    this.view = view;
    this.update = update;

    Backbone.history.start();

  },

  update: function() {

    // load
    this.model.fetch({ reset:true });

  },

});