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
    var defaults = {
        key:null,
        val:null,
        el:null,
        endpoint:null,
        callback:null,
        delay:500,
        minlength:3,
    };

    // settings
    this.settings    = _.assign(defaults, config);
    this.key         = this.settings.key;
    this.val         = this.settings.val;
    this.el          = this.settings.el;
    this.endpoint    = this.settings.endpoint;
    this.delay       = this.settings.delay;
    this.minlength   = this.settings.minlength;
    this.callback    = this.settings.callback;

    // required settings
    if(null === this.key){ throw new ARK.errors.RequirementError('key is required'); }
    if(null === this.val){ throw new ARK.errors.RequirementError('val is required'); }
    if(null === this.el){ throw new ARK.errors.RequirementError('el is required'); }
    if(null === this.callback){ throw new ARK.errors.RequirementError('callback is required'); }
    if(null === this.endpoint){ throw new ARK.errors.RequirementError('endpoint is required'); }

    // validate types
    if(false === this.el instanceof jQuery){ throw TypeError('el must be a jquery object'); }

    /**
     * Search for suggestions
     * @function Selector.typeahead
     */
    this.search = function(){

        var field = this.selector;
        var term = field.val();
        var url = this.endpoint + term;

        // if term meets length reqs, proceec
        if(term.length < this.minlength){ return false; }

        // get suggestions
        var suggestions = this.fetch(url);

        // and render
        if(suggestions.length){
            this.expand_target();
            this.populate(suggestions);
        }

    };

    /**
     * Populate the target select box with suggestions
     * @function Selector.popoulate
     * @param {array} suggestions list of key:value objects for suggestion list
     */
    this.populate = function(suggestions){

        var that = this;

        // flush current entries
        this.el.empty();

        _.each(suggestions, function(suggestion){
            that.el.append($("<option />")
                .val(suggestion[that.key]).text(suggestion[that.val]));
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

    /**
     * Create text box search selector
     * @function Selector.create
     * @return {object} selector dom object
     */
    this.create = function(){

        var selector = $('<input>');
            selector.prop('type', 'text');
            selector.prop('id', this.el.attr('id') + '_selector');
            selector.prop('class', 'selector');
            selector.prop('placeholder', 'Search');
            selector.data('target', this.el);

        return selector;

    };

    /**
     * Expand select box
     * @function Selector.expand_target
     * @return {[type]} [description]
     */
    this.expand_target = function(){
        this.el.prop('size', 5);
    };

    /**
     * Initialize selector
     * @function Selector.init
     */
    this.init = function(){

        // create the selector
        this.selector = this.create();

        // attach it to the dom
        this.el.before(this.selector);

        // register a keyup event on it for interactive searches
        this.selector.on('keyup', _.debounce(this.search, this.delay).bind(this));

        // manage size of select box
        this.el.on('change', function(){
            $(this).prop('size', 1);
        });

    };

    // initialize this thing
    this.init();

    return this;

};