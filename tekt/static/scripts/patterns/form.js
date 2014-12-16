ARK.Form = Backbone.View.extend({

    events: {

        'click .save': "save"

    },

    initialize:function(options){

        this.dom           = {};
        this.dom.form      = this.$el.find('form');
        this.dom.errors    = this.$el.find('.errors');
        this.save_callback = options.save_callback;

    },

    save: function(e) {

        // prevent click
        e.preventDefault();

        // prep
        var data  = this.dom.form.serializeJSON();
        var model = new ARK.Property();

        // save model and update collection
        model.save(data, {
            wait: true,
            success: this.save_success,
            error: this.save_error,
            context: this
        });

    },

    // on success
    save_success: function(model, resp, options) {

        var scope = options.context;
        scope.collection.add(model.attributes.record);
        scope.resetForm();
        ARK.Messenger(model.attributes.message);
        if(void 0 !== scope.save_callback){
            scope.save_callback();
        }
        
    },

    save_error: function(model, xhr, options) {

        options.context.resetErrors();
        options.context.renderErrors(xhr.responseJSON.errors);

    },

    resetForm: function(){

        this.dom.form.trigger('reset');
        this.resetErrors();

        return this.dom.form;

    },

    resetErrors: function(){

        // empty errors
        this.dom.errors.empty();
        this.dom.form.find('*').removeClass('error');

        return this.dom.errors;

    },

    renderErrors:function(errors){

        var that = this;

        // now render all errors
        _.each(errors, function(error, key){

            var field = that.dom.form.find('[name="'+key+'"]');
            field.addClass('error');
            _.each(error, function(msg){
                that.dom.errors.append('<li>'+msg+'</li>');
            });
            
        });

        return that.dom.errors;

    },

});