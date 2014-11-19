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
    module.view = function(selector, view, makeSelectorEl){

        var makeSelectorEl = makeSelectorEl || false;

        // on docment ready
        $(document).on('ready', function() {

            // find all the elements
            var els = $(selector);

            // loop them
            if (els.length) {

                // for each one, create and attach a view object
                els.each(function(i, container) {
                    var config = makeSelectorEl ? { el:selector } : {};
                    var v = new view(config);
                    v.container = container;
                });
            }

        });

    };

    // export
    return module;

})(ARK.Autoloader || {});