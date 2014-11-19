ARK.Properties_create = Backbone.View.extend({

    events: {
        'click .save': "save"
    },

    initialize: function() {

        this.collection = new ARK.Properties();

    },

    save: function(e) {

        e.preventDefault();
        var data = this.$el.find('form').serializeJSON();
        var model = new ARK.Property(data);
        
        console.log(data, model);

    },

});

// autoload view
ARK.Autoload.view('.properties_create', ARK.Properties_create, true);