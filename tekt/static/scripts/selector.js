/**
 * The Selector class provides typeahead ajax support for various selectors in ARK. 
 * @summary Typeahead / AJAX selector 
 * @param  {object} config           
 * @param  {string} config.el        jquery element of object
 * @param  {string} config.endpoint  endpoint to call for key, val
 * @param  {number} config.delay     debounce delay
 * @return {object}        selector function instance
 * @class Selector
 */
ARK.Selector = function(config){

    // default settings
    var that     = this;
    var defaults = { key:null, val:null, el:null, endpoint:null, delay:500, minlength:3 };

    // settings
    this.settings  = _.assign(defaults, config);
    this.key       = this.settings.key;
    this.val       = this.settings.val;
    this.el        = this.settings.el;
    this.endpoint  = this.settings.endpoint;
    this.delay     = this.settings.delay;
    this.minlength = this.settings.minlength;

    // required settings
    if(null === this.key){ throw new RequirementError('key is required'); }
    if(null === this.val){ throw new RequirementError('val is required'); }
    if(null === this.el){ throw new RequirementError('el is required'); }
    if(null === this.endpoint){ throw new RequirementError('endpoint is required'); }

    // validate types
    if(false === this.el instanceof jQuery){ throw TypeError('el must be a jquery object'); }

    /**
     * Show typeahead suggestions
     * @function Selector.typeahead
     */
    this.typeahead = function(){

        var field = this.el;
        var term = field.val();
        var url = this.endpoint + term;

        // if term meets length reqs, proceec
        if(term.length < this.minlength){ return false; }

        // get suggestions
        var suggestions = this.fetch(url);

        // and render
        this.render(suggestions);
        
    };

    /**
     * Render suggestions
     * @function Selector.render
     * @param {array} suggestions list of key:value objects for suggestion list
     */
    this.render = function(suggestions){

        // XXX: hide suggestion box
        var that = this;
        _.each(suggestions, function(suggestion){
            console.log(suggestion[that.val]);
        });

    };


    /**
     * Fetch results
     * @function Selector.fetch
     */
    this.fetch = function(url){

        // format ajax packet
        var ajax = { 
            url: url,
            type: 'GET',
            async:false,
            context: this,
        };

        // get Properties
        var response = $.ajax(ajax).responseJSON;

        return response.result;

    };

    // register keyup
    this.el.on('keyup', _.debounce(this.typeahead, this.delay).bind(this));

    return this;

};