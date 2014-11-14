/**
* Lists all properties
* @module properties_list
* @version 1.0
*/

"use strict";

ARK.properties_list = (function(module){

    /** @exports properties_list */

    /**
     * DOM elements
     * @member ARK.menu.el
     * @memberOf module:properties_list
     */
    module.el = {};
    module.el.properties_list = $("#properties_list");

    /**
     * Properties container
     * @member ARK.properties_list.properties
     * @memberOf module:properties_list
     * @type {json}
     */
    module.list = null;


    /**
     * Render properties
     * @function ARK.properties_list.render
     * @param  {[type]} data [description]
     * @return {[type]}      [description]
     */
    module.render = function(data){

        console.log(data);

    };

    /**
     * Initialize o
     * @function ARK.menu.init
     * @memberOf module:menu
     */
    module.init = function(){

        // populate list
        module.list = ARK.properties.get();

        // render list
        module.render(module.list);

    };

    // boot file
    $(document).on('ready', module.init);

    // export
    return module;

})(ARK.properties_list || {});