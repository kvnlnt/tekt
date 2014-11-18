/**
* Lists all Properties
* @module Properties
* @version 1.0
*/

"use strict";

ARK.Properties = (function(module){

    /** @exports Properties */

    /**
     * DOM elements
     * @member ARK.Properties.el
     * @memberOf module:Properties
     */
    module.el = {};
    module.el.property_delete    = $(".property_delete");
    module.el.properties_list    = $(".properties_list");
    module.el.form               = $(".Properties_form");
    module.el.form_submit        = $(".Properties_form_submit");

    /**
     * Render Properties
     * @function ARK.Properties.render
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
                window.location.href = '/Properties';
                return data; 
            },
        };

        // get Properties
        var response = $.ajax(ajax).responseJSON;

    };

    /**
     * Delete a property
     * @function ARK.Properties.delete
     * @memberOf module:Properties
     */
    module.delete = function(e){

        // get element
        var el = $(e.target);

        // get data id
        var id = el.data('id');

        // run ajax
        ARK.Exec.run('Properties.delete('+id+')', module.delete_complete);

    };

    /**
     * Delete a property result
     * @function ARK.Properties.delete
     * @memberOf module:Properties
     */
    module.delete_complete = function(response, status, xhr){

        // reload any property lists
        ARK.Loader.load(module.el.properties_list[0]);

    };

    module.loaded = function(){

        alert('loaded');

    };

    /**
     * Initialize o
     * @function ARK.Properties.init
     * @memberOf module:Properties
     */
    module.init = function(){

        // populate list
        // module.el.form_submit.on('click', module.save);
        $("body").on('click', module.el.property_delete, module.delete);
        
    };

    // boot file
    $(document).on('ready', module.init);

    // export
    return module;

})(ARK.Properties || {});