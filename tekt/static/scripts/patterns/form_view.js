ARK.FormView = Backbone.View.extend({

    save_error: function(model, xhr, options){

        options.context.resetErrors(xhr.responseJSON.errors);

    },

    resetForm: function(){

        this.dom.form.trigger('reset');
        this.dom.errors.empty();
        this.dom.form.find('*').removeClass('error');

    },

    resetErrors:function(errors){

        var that = this;

        // empty it
        this.dom.errors.empty();

        // remove all errors
        this.dom.form.find('*').removeClass('error');

        // now render all errors
        _.each(errors, function(error, key){

            // get field
            var field = that.dom.form.find('[name="'+key+'"]');

            // add error class
            field.addClass('error');

            // render each error
            _.each(error, function(msg){
                that.dom.errors.append('<li>'+msg+'</li>');
            });
            
        });

    },

});