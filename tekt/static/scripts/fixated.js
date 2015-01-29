/**
* Cards module
* @module fixated
* @version 1.0
*/
TEKT.fixated = (function(module){

    /* exports fixated */

    /**
     * Dom elements
     * @member el
     * @memberOf module:fixated
     */
    module.directive = TEKT.DIRECTIVE.FIXATE;

    /**
     * Collection of instantiated fixated
     * @member instances
     * @memberOf module:fixated
     */
    module.instances = [];

    /**
     * Register a dialog
     * @param  {object} el dom element
     * @function register
     * @memberOf module:fixated
     * @return {object}    selector instance
     */
    module.register = function(el){

        var $el = $(el);
        var config = TEKT.util.deparam($el.attr(module.directive));
            config.el = $el;

        // create selector
        var fixate = new TEKT.Fixate(config);

        // // add to collection
        module.instances.push(fixate);

        return fixate;

    };

    /**
     * Initialize fixated
     * @function init
     * @memberOf module:fixated
     * @return {array} array dialog els to be registered
     */
    module.init = function() {

        var fixated = $('['+module.directive+']');
        _.each(fixated, module.register);

        return fixated;

    };

    $(document).ready(module.init);

    return module;

}(TEKT.fixated || {}));
