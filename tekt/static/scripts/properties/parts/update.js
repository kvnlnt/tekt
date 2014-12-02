/** 
 * Add Property form
 * @module ARK.Properties_part_update
 */
ARK.Properties_part_update = ARK.FormView.extend({

    el:'.properties_part_update',

    events: {

        'click .save': "save",
        'click .edit': "render_edit",
        'click .cancel': "render"

    },

    initialize: function() {

        // dom elements
        this.dom               = {};
        this.dom.form          = this.$el.find('form');
        this.dom.form_property = this.$el.find('[name="property"]');
        this.dom.errors        = this.$el.find('.errors');
        this.dom.property      = this.$el.find('.property');
        this.dom.edit_button   = this.$el.find('.edit');

        // model bindings
        this.model.bind('change', this.render, this);

    },

    render_edit: function(e){

        e.preventDefault();
        this.dom.form.show();
        this.dom.form_property.focus();
        this.dom.property.hide();
        this.dom.edit_button.hide();

    },

    render: function() {

        var property = this.model.get('property');
        this.dom.property.html(property);
        this.dom.form_property.val(property);
        this.dom.errors.empty();
        this.dom.form.hide();
        this.dom.property.show();
        this.dom.edit_button.show();
        return this;

    },

    save: function(e) {

        // prevent click
        e.preventDefault();

        // prep
        var that    = this;
        var form    = this.$el.find('form');
        var that    = this;
        var data    = form.serializeJSON();

        // on success
        var success = function(model, resp){
            ARK.Messenger('Property updated');
            that.render();
        };

        // save model and update collection
        this.model.save(data, { 
            wait:true, 
            success:success, 
            error:this.save_error,
            context:this
        });
        

    },

});