ARK.Properties_Model = Backbone.Model.extend();

ARK.Properties_Collection = Backbone.Collection.extend({
    
    url: ARK.TEKTONIK + '/properties',
    model:ARK.Properties_Model,

});
