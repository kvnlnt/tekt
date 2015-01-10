/**
* Auto register selectors
* @module selectors
* @version 1.0
*/
ARK.selectors = (function(module) {

    /* exports selectors */

    // keep track of registered selectors
    module.collection = [];

    /**
     * On select handler
     * @function on_select
     * @memberOf module:selectors
     */
    module.on_select = function(obj){};

    /**
     * Selectors that are auto registered
     * @member selectors
     * @memberOf module:selectors
     */
    module.selectors = [
        {
            key: 'id',
            val: 'page',
            dom_selector: '[ark-selector="page"]', 
            endpoint: '/pages/search/',
            target:'#page_id',
            suggestions_wrapper:'[ark-selector-suggestions="page"]',
            suggestion_template:'<%= suggestion.page %>'
        }
    ];

    /**
     * Initialize selectors
     * @function init
     * @memberOf module:selectors
     */
    module.init = function() {

        // init selectors
        _.each(module.selectors, function(v, k){

            // config selector
            var config = {
                key:v.key,
                val:v.val,
                el:$(v.dom_selector),
                endpoint:v.endpoint,
                target:$(v.target),
                suggestions_wrapper:$(v.suggestions_wrapper),
                suggestion_template:v.suggestion_template
            };

            // create selector
            var selector = new ARK.Selector(config);

            // add to collection
            module.collection.push(selector);
        });

    };

    // on domready initialize
    $(document).ready(module.init);

    return module;

}(ARK.selectors || {}));