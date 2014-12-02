/** 
 * Add Property form
 * @module ARK.Properties_part_create
 */
ARK.Properties_part_create = ARK.FormView.extend({

    el: '.properties_part_create',

    events: {

        'click .save': "save"

    },

    initialize: function() {

        // elements
        this.dom        = {};
        this.dom.form   = this.$el.find('form');
        this.dom.errors = this.$el.find('.errors');

    },

    save: function(e) {

        // prevent click
        e.preventDefault();

        // prep
        var that  = this;
        var data  = this.dom.form.serializeJSON();
        var model = new ARK.Property();

        // on success
        var success = function(model, resp) {
            that.collection.add(model);
            that.resetForm();
            ARK.Messenger('Property added');
        };

        // save model and update collection
        model.save(data, {
            wait: true,
            success: success,
            error: this.save_error,
            context: this
        });

    }

});