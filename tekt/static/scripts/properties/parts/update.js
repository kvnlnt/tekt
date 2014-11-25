/** 
 * Add Property form
 * @module ARK.Properties_part_update
 */
ARK.Properties_part_update = Backbone.View.extend({

    el:'.properties_part_update',

    events: {

        'click .save': "save"

    },

    initialize: function() {

        // this.form = this.$el.find('form');
        this.model.bind('change', this.render, this);

    },

    render: function() {

        var template = ARK.Template(ARK.Properties_piece_update_form, this.model.toJSON());
        this.$el.html(template);

        return this;

    },

    save: function(e) {

        // prevent click
        e.preventDefault();

        // prep
        var form    = this.$el.find('form');
        var that    = this;
        var data    = form.serializeJSON();
        var success = function(model, resp){
            ARK.Messenger('success', resp);
        };
        var error   = function(model, xhr, options){ 
            ARK.Messenger('error', xhr.responseJSON.result);
        };

        // save model and update collection
        this.model.save(data, { wait:true, success:success, error:error });
        

    },

});