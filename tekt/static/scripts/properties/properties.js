ARK.Property = Backbone.Model.extend({

    urlRoot: ARK.TEKTONIK + '/properties',
    parse: function(response) { return response; }

});

ARK.Properties = Backbone.Collection.extend({
    
    url: ARK.TEKTONIK + '/properties',
    model:ARK.Property,
    parse: function(response, options) { return response.result; },

});
