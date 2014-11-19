/**
* All menu functionality is contained within this module.
* @module Autoload
* @version 1.0
*/

ARK.Autoload = (function(module) {

    /** @exports menu */

    /**
     * Auto load view
     * @function ARK.Autoload.view
     * @memberOf module:Autoload
     */
    module.view = function(selector, view){

        // on docment ready
        $(document).on('ready', function() {

            // find all the elements
            var els = $(selector);

            // loop them
            if (els.length) {

                // for each one, create and attach a view object
                els.each(function(i, container) {
                    var v = new view();
                    v.container = container;
                });
            }

        });

    };

    // export
    return module;

})(ARK.Autoloader || {});