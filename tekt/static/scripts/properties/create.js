ARK.Properties_create = Backbone.View.extend({

  events: { 'click .save': "save" },

  save: function(e){

    e.preventDefault();
    ARK.Log(this);

  },

});

// autoload view
ARK.Autoload.view('.properties_create', ARK.Properties_create, true);