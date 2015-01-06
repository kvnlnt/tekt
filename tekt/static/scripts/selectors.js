/**
* Typeahead / AJAX selector
* @module Selector
* @version 1.0
*/
ARK.Selector = (function(module) {

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
     * @param  {object} config configuration object
     * @return {object}        selector function instance
     */
    module.selector = function(config){

        // default settings
        var that     = this;
        var defaults = { el:null, endpoint:'', delay:500 };

        // settings
        this.settings = _.assign(defaults, config);
        this.el       = this.settings.el;
        this.endpoint = this.settings.endpoint;
        this.delay    = this.settings.delay;

        // fetch function
        this.fetch = function(){

            var field = $(this);
            var term = field.val();

        };

        // register keyup
        this.el.on('keyup', _.debounce(this.fetch, this.delay));

        return this;

    };

    module.init = function() {

        // init selectors
        _.each(module.auto_registered_selectors, function(v, k){
            var selector = new module.selector({
                el:$(v.selector),
                endpoint:v.endpoint
            });
            module.selectors.push(selector);
        });

    };

    module.init();

    return module;

}(ARK.selectors || {}));