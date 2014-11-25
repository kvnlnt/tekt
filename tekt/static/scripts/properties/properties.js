ARK.Property = Backbone.Model.extend({

    urlRoot: ARK.TEKTONIK + '/properties',
    parse: function(response) { 

        // is this model part of a collection?
        var hasResult = void 0 !== response.result;
        return hasResult ? response.result : response;

    }

});

ARK.Properties = Backbone.Collection.extend({
    
    url: ARK.TEKTONIK + '/properties',
    model:ARK.Property,
    parse: function(response, options) { return response.result; },

});
