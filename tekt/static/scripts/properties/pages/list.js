/** 
 * Used to configure the Properties list page
 * @module ARK.Properties_page_list
 */

ARK.Properties_page_list = Backbone.Router.extend({

  routes: {
    "": "list",
  },

  initialize: function(){

    var listCollection = new ARK.Properties();
    var listView       = new ARK.Properties_part_list({collection:listCollection});
    var createView     = new ARK.Properties_part_create({collection:listCollection});

    this.listCollection = listCollection;
    this.listView = listView;
    this.createView = createView;

    Backbone.history.start();

  },

  list: function() {

    // load
    this.listCollection.fetch({ reset:true });

  },

});