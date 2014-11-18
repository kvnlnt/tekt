/**
* Lists all Loader
* @module Loader
* @version 1.0
*/

"use strict";

ARK.Loader = (function(module){

    /** @exports Loader */

    /**
     * Load a resource into element
     * @function ARK.Loader.load
     * @memberOf module:Loader
     */
    module.load = function(el, resource, callback){

        var el       = el || null;
        var callback = callback || '';
        var resource = resource || null;

        // load resource
        el.load('/load/'+resource, eval(callback));

    };

    // export
    return module;

})(ARK.Loader || {});