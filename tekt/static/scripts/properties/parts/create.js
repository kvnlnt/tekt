/** 
 * Add Property form
 * @module ARK.Properties_part_create
 */
ARK.Properties_part_create = ARK.FormView.extend({

    el:'.properties_part_create',

    events: {

        'click .save': "save"

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
            that.reset();
            ARK.PAGE.navigate('list', true);
        };
        var error   = function(model, xhr, options){ 
            that.renderErrors(xhr.responseJSON.errors);
            // ARK.Messenger(xhr.responseJSON.errors);
        };

        // save model and update collection
        model.save(data, { wait:true, success:success, error:error });

    },

});