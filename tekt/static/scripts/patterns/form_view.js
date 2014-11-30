ARK.FormView = Backbone.View.extend({

    save_error: function(model, xhr, options){

        options.context.resetErrors(xhr.responseJSON.errors);

    },

    resetForm: function(){

        this.form.trigger('reset');
        this.errors.empty();
        this.form.find('*').removeClass('error');

    },

    resetErrors:function(errors){

        var that = this;

        // empty it
        this.errors.empty();

        // remove all errors
        this.form.find('*').removeClass('error');

        // now render all errors
        _.each(errors, function(error, key){

            // get field
            var field = that.$el.find('[name="'+key+'"]');

            // add error class
            field.addClass('error');

            // render each error
            _.each(error, function(msg){
                that.errors.append('<li>'+msg+'</li>');
            });
            
        });

    },

});