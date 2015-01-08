/**
* Auto register selectors
* @module selectors
* @version 1.0
*/
ARK.selectors = (function(module) {

    /* exports selectors */

    // keep track of registered selectors
    module.collection = [];

    // auto register
    module.selectors = [
        {
            selector: '.page_selector', 
            endpoint: '/pages/search/',
            callback: module.on_select,
            label:'Find Page'
        }
    ];

    /**
     * On select handler
     * @function on_select
     * @memberOf module:selectors
     */
    module.on_select = function(obj){

        console.log('selected', obj);

    };

    /**
     * Initialize selectors
     * @function init
     * @memberOf module:selectors
     */
    module.init = function() {

        // init selectors
        _.each(module.selectors, function(v, k){

            // create new instance of Selecotr
            var selector = new ARK.Selector({
                key:'id',
                val:'page',
                el:$(v.selector),
                endpoint:v.endpoint,
                callback:v.callback,
                label:v.label
            });

            // add to collection
            module.collection.push(selector);
        });

    };

    // on domready initialize
    $(document).ready(module.init);

    return module;

}(ARK.selectors || {}));