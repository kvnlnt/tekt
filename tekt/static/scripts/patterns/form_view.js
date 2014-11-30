ARK.FormView = Backbone.View.extend({

    initialize: function() {

        this.form = this.$el.find('form');
        this.errors = this.$el.find('.errors');

    },

    reset: function(){

        this.form.trigger('reset');
        this.errors.empty();
        this.form.find('*').removeClass('error');

    },

    renderErrors:function(errors){

        var that = this;

        // empty it
        this.errors.empty();

        // remove all errors
        this.form.find('*').removeClass('error');

        // now render all errors
        _.each(errors, function(error, key){
            var field = that.$el.find('[name="'+key+'"]');
            field.addClass('error');
            _.each(error, function(msg){
                that.errors.append('<li>'+msg+'</li>');
            });
        });

    }

});