/**
* Auto register selectors
* @module selectors
* @version 1.0
*/
ARK.selectors = (function(module) {

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
    module.directive = '[ark-selector]';

    /**
     * Pages callback
     * @function pages_handler
     * @memberOf module:selectors
     */
    module.pages_handler = function(obj){

        $('#page_id').val(obj.key);
        $('[ark-selector="page"]').val(obj.val);

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
        }
    };

    /**
     * Register a directive
     * @param  {object} el dom element
     * @function register
     * @memberOf module:selectors
     * @return {object}    selector instance
     */
    module.register = function(el){

        var $el = $(el);
        var type = module.type[$el.attr('ark-selector')];

        // config selector
        var config = {};
            config.el = $el;
            config.src = type.src;
            config.callback = type.callback;

        // create selector
        var selector = new ARK.Selector(config);

        // add to collection
        module.instances.push(selector);

        return selector;

    };

    /**
     * Initialize selectors
     * @function init
     * @memberOf module:selectors
     */
    module.init = function() {

        var selectors = $(module.directive);
        _.each(selectors, module.register);

    };

    // on domready initialize
    $(document).ready(module.init);

    return module;

}(ARK.selectors || {}));