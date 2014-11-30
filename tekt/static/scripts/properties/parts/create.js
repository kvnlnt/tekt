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

        this.form = this.$el.find('form');

    },

    save: function(e) {

        // prevent click
        e.preventDefault();

        // prep
        var that    = this;
        var data    = this.form.serializeJSON();
        var model   = new ARK.Property();
        var success = function(model, resp){ 
            that.collection.add(model);
            ARK.PAGE.navigate('list', true);
        };
        var error   = function(model, xhr, options){ 
            ARK.Messenger(xhr.responseJSON.result);
        };

        // save model and update collection
        model.save(data, { wait:true, success:success, error:error });
        
        // reset form
        this.form.trigger('reset');

    },

});