/**
* Lists all loader
* @module loader
* @version 1.0
*/

"use strict";

ARK.loader = (function(module){

    /** @exports loader */

    /**
     * DOM elements
     * @member ARK.loader.el
     * @memberOf module:loader
     */
    module.el = {};
    module.el.resource = $('[ark-load]');

    /**
     * load part
     * @function ARK.loader.load
     * @memberOf module:loader
     */
    module.load = function(index, el){

        var el = $(el);
        var resource = el.attr('ark-load');
        el.load('/load/'+resource);

    };

    
    /**
     * Initialize module
     * @function ARK.loader.init
     * @memberOf module:menu
     */
    module.init = function(){

        // load all parts
        module.el.resource.each(module.load);

    };

    // boot file
    $(document).on('ready', module.init);

    // export
    return module;

})(ARK.loader || {});