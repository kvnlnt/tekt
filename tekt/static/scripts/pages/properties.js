/**
* Lists all properties
* @module properties
* @version 1.0
*/

"use strict";

ARK.properties = (function(module){

    /** @exports properties */

    /**
     * DOM elements
     * @member ARK.menu.el
     * @memberOf module:properties
     */
    module.el = {};
    module.el.form               = $(".properties_form");
    module.el.form_submit        = $(".properties_form_submit");

    /**
     * Render properties
     * @function ARK.properties.render
     * @param  {[type]} data [description]
     * @return {[type]}      [description]
     */
    module.save = function(e){

        // stop click event
        e.preventDefault();

        // get data
        var data = module.el.form.serializeObject();

        // format ajax packet
        var ajax = { 
            type: 'POST',
            async:false,
            data:data,
            success:function(data, status){
                window.location.href = '/properties';
                return data; 
            },
        };

        // get properties
        var response = $.ajax(ajax).responseJSON;

    };

    /**
     * Initialize o
     * @function ARK.menu.init
     * @memberOf module:menu
     */
    module.init = function(){

        // populate list
        // module.el.form_submit.on('click', module.save);

    };

    // boot file
    $(document).on('ready', module.init);

    // export
    return module;

})(ARK.properties || {});