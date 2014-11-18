/**
* Lists all Directive
* @module Directive
* @version 1.0
*/

"use strict";

ARK.Directive = (function(module){

    /** @exports Directive */

    /**
     * DOM elements
     * @member ARK.Directive.el
     * @memberOf module:Directive
     */
    module.el       = {};
    module.el.load  = $('[ark-load]');

    /**
     * Directive a resource into element
     * @function ARK.Directive.load
     * @memberOf module:Directive
     */
    module.load = function(el){

        // get el and attrs
        var el       = $(el);
        var resource = el.attr('ark-load');
        var callback = el.attr('ark-callback');

        // load html
        ARK.Loader.load(el, resource, callback);

    };
    
    /**
     * Initialize module
     * @function ARK.Directive.init
     * @memberOf module:menu
     */
    module.init = function(){

        // register loaders
        _.each(module.el.load, module.load);


    };

    // boot file
    $(document).on('ready', module.init);

    // export
    return module;

})(ARK.Directive || {});