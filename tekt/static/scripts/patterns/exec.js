/**
* Lists all Exec
* @module Exec
* @version 1.0
*/

"use strict";

ARK.Exec = (function(module){

    /** @exports Exec */

    /**
     * Load a resource into element
     * @function ARK.Exec.load
     * @memberOf module:Exec
     */
    module.run = function( resource, callback){

        // load resource
        $.get('/exec/'+resource, eval(callback));

    };

    // export
    return module;

})(ARK.Exec || {});