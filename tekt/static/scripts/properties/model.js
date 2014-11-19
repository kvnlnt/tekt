ARK.Property = Backbone.Model.extend();

ARK.Properties = Backbone.Collection.extend({
    
    url: ARK.TEKTONIK + '/properties',
    model:ARK.Property,

});
