/**
* Cards module
* @module fixator
* @version 1.0
*/
TEKT.fixator = (function(module){

    /* exports fixator */

    /**
     * Dom elements
     * @member el
     * @memberOf module:fixator
     */
    module.directive = TEKT.DIRECTIVE.FIXATE;

    /**
     * Collection of instantiated fixator
     * @member instances
     * @memberOf module:fixator
     */
    module.instances = [];

    /**
     * Register a dialog
     * @param  {object} el dom element
     * @function register
     * @memberOf module:fixator
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
     * Initialize fixator
     * @function init
     * @memberOf module:fixator
     * @return {array} array dialog els to be registered
     */
    module.init = function() {

        var fixator = $('['+module.directive+']');
        _.each(fixator, module.register);

        return fixator;

    };

    $(document).ready(module.init);

    return module;

}(TEKT.fixator || {}));
