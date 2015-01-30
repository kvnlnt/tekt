/**
* Scrollers module
* @module scrollers
* @version 1.0
*/
TEKT.scrollers = (function(module){

    /* exports scrollers */

    /**
     * Dom elements
     * @member el
     * @memberOf module:scrollers
     */
    module.directive = TEKT.DIRECTIVE.SCROLLER;

    /**
     * Collection of instantiated scrollers
     * @member instances
     * @memberOf module:scrollers
     */
    module.instances = [];

    /**
     * Register a scroller
     * @param  {object} el dom element
     * @function register
     * @memberOf module:scrollers
     * @return {object}    selector instance
     */
    module.register = function(el){

        var $el = $(el);

        // config selector
        var config = TEKT.util.deparam($el.attr(module.directive));
            config.el = $el;

        // create selector
        var scroller = new TEKT.Scroller(config);

        // add to collection
        module.instances.push(scroller);

        return scroller;

    };

    /**
     * Initialize scrollers
     * @function init
     * @memberOf module:scrollers
     * @return {array} array scroller els to be registered
     */
    module.init = function() {

        var scrollers = $('['+module.directive+']');
        _.each(scrollers, module.register);
        return scrollers;

    };

    $(document).ready(module.init);

    return module;

}(TEKT.scrollers || {}));
