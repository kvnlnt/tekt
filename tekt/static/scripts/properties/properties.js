ARK.Property = Backbone.Model.extend({

    urlRoot: ARK.TEKTONIK + '/properties',
    
});

ARK.Properties = Backbone.Collection.extend({
    
    url: ARK.TEKTONIK + '/properties',
    model:ARK.Property,

});
