/** 
 * Add Property form
 * @module ARK.Properties_part_create
 */
ARK.Properties_part_create = Backbone.View.extend({

    el:'.properties_part_create',

    events: {

        'click .save': "save"

    },

    initialize: function() {

        this.createForm = this.$el.find('form');

    },

    save: function(e) {

        // prevent click
        e.preventDefault();

        // prep
        var that    = this;
        var data    = this.createForm.serializeJSON();
        var model   = new ARK.Property();
        var success = function(model, resp){ that.collection.add(model); };
        var error   = function(model, xhr){ 
            console.log(xhr); 
        };

        // save model and update collection
        model.save(data, { wait:true, success:success, error:error });
        
        // reset form
        this.createForm.trigger('reset');

    },

});