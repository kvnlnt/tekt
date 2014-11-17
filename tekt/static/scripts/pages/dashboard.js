/**
* Lists all dashboard
* @module dashboard
* @version 1.0
*/

"use strict";

ARK.dashboard = (function(module){

    /**
     * Initialize o
     * @function ARK.menu.init
     * @memberOf module:menu
     */
    module.init = function(){};

    // boot file
    $(document).on('ready', module.init);

    // export
    return module;

})(ARK.dashboard || {});