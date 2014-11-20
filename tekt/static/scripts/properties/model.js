ARK.Property = Backbone.Model.extend({
    id:null,
    property:""
});

ARK.Properties = Backbone.Collection.extend({
    
    url: ARK.TEKTONIK + '/properties',
    model:ARK.Property,

});
