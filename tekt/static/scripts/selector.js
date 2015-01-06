/**
* Typeahead / AJAX selector
* @module selector
* @version 1.0
*/
ARK.selector = (function(module) {

    /* exports selector */

    // keep track of registered selectors
    module.selectors = [];

    // auto register
    module.auto_registered_selectors = [
        {
            selector: '.page_selector', 
            endpoint: '/pages/search/'
        }
    ];

    /**
     * Creates an ajax selector 
     * @param  {object} config           
     * @param  {string} config.el        jquery element of object
     * @param  {string} config.endpoint  endpoint to call for key, val
     * @param  {number} config.delay     debounce delay
     * @return {object}        selector function instance
     * @function Selector
     * @memberOf module:selector
     */
    module.Selector = function(config){

        // default settings
        var that     = this;
        var defaults = { el:null, endpoint:'', delay:500 };

        // settings
        this.settings = _.assign(defaults, config);
        this.el       = this.settings.el;
        this.endpoint = this.settings.endpoint;
        this.delay    = this.settings.delay;

        /**
         * Fetch results
         * @function Selector.fetch
         * @memberOf module:selector
         */
        this.fetch = function(){

            var field = $(this);
            var term = field.val();

        };

        // register keyup
        this.el.on('keyup', _.debounce(this.fetch, this.delay));

        return this;

    };

    /**
     * Initialize selector module
     * @function init
     * @memberOf module:selector
     */
    module.init = function() {

        // init selectors
        _.each(module.auto_registered_selectors, function(v, k){
            var selector = new module.Selector({
                el:$(v.selector),
                endpoint:v.endpoint
            });
            module.selectors.push(selector);
        });

    };

    module.init();

    return module;

}(ARK.selectors || {}));