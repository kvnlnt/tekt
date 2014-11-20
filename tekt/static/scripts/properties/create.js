ARK.Properties_create = Backbone.View.extend({

    events: {
        'click .save': "save"
    },

    initialize: function() {

        this.createForm = this.$el.find('form');
        this.collection = new ARK.Properties();

    },

    save: function(e) {

        e.preventDefault();
        var data = this.createForm.serializeJSON();
        var model = new ARK.Property(data);
        this.collection.create(model, {
            success:function(){
                ARK.pubsub.trigger('properties_list:addOne', model);
            }
        });
        this.createForm.trigger('reset');

    },

});

// autoload view
ARK.Autoload.view('.properties_create', ARK.Properties_create, true);