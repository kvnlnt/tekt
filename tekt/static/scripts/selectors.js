/**
* Selectors module
* @module selectors
* @version 1.0
*/
TEKT.selectors = (function(module) {

    /* exports selectors */

    /**
     * Current instances
     * @member instances
     * @memberOf module:selectors
     */
    module.instances = [];

    /**
     * HTML directive
     * @member directive
     * @memberOf module:directive
     */
    module.directive_attr = TEKT.DIRECTIVE.SELECTOR;
    module.directive = '['+module.directive_attr+']';

    /**
     * Pages callback
     * @function pages_handler
     * @memberOf module:selectors
     */
    module.pages_handler = function(obj){

        $('#page_id').val(obj.key);
        $('['+TEKT.DIRECTIVE.SELECTOR+'="page"]').val(obj.val);

    };

    /**
     * Selector type configs
     * @member  type
     * @memberof module:selectors
     */
    module.type = {
        page:{
            src:'/pages/search',
            callback:module.pages_handler,
            title:'Find Page'
        }
    };

    /**
     * Register a selector
     * @param  {object} el dom element
     * @function register
     * @memberOf module:selectors
     * @return {object}    selector instance
     */
    module.register = function(el){

        var $el = $(el);
        var type = module.type[$el.attr(module.directive_attr)];

        // config selector
        var config = {};
            config.el = $el;
            config.src = type.src;
            config.callback = type.callback;
            config.target = $el;
            config.title = type.title;

        // create selector
        var selector = new TEKT.Selector(config);

        // add to collection
        module.instances.push(selector);

        return selector;

    };

    /**
     * Initialize selectors
     * @function init
     * @memberOf module:selectors
     * @return {array} array of selectors to be registered
     */
    module.init = function() {

        var selectors = $(module.directive);
        _.each(selectors, module.register);

        return selectors;

    };

    // on domready initialize
    $(document).ready(module.init);

    return module;

}(TEKT.selectors || {}));
