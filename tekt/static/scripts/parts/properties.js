/**
* Lists all properties
* @module properties
* @version 1.0
*/

"use strict";

ARK.properties = (function(module){

    /** @exports properties */

    /**
     * Endpoints
     * @private
     * @memberOf module:properties
     * @type {Object}
     */
    module.endpoint = {};
    module.endpoint.get = { url: ARK.BACKEND + '/properties', type:'GET' };

    /**
     * Get properties from backend api
     * @function ARK.properties_list.get
     * @param  {Object} endpoint api endpoint
     */
    module.get = function(endpoint){

        // override
        var endpoint = endpoint || module.endpoint.get;

        // config request
        var ajax = { 
            type: endpoint.type, 
            url: endpoint.url,
            async:false,
            success:function(data){
                ARK.pubsub.publish('PROPERTIES:GET', data);
                return data; 
            },
        };

        // get properties
        return $.ajax(ajax).responseJSON;

    };


    // export
    return module;

})(ARK.properties || {});