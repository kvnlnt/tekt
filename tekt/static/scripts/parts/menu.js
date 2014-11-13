/**
* All menu functionality is contained within this module.
* @module menu
* @version 1.0
*/

"use strict";

ARK.menu = (function(module){

    /** @exports menu */

    /**
     * DOM elements
     * @member ARK.menu.el
     * @memberOf module:menu
     */
    var el           = {};

    /**
     * Initialize module
     * @function ARK.menu.init
     * @memberOf module:menu
     */
    var init = function(){};

    // boot file
    $(document).on('ready', init);

    // export
    return {
        init:init,
    };

})(ARK.menu || {});