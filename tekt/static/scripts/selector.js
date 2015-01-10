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
        target:null,
        callback:null,
        delay:500,
        minlength:2,
        suggestion_template:'<%= suggestion.id %>',
        suggestions_wrapper:null,
    };

    // settings
    this.settings    = _.assign(defaults, config);
    this.key         = this.settings.key;
    this.attr_key    = 'ark-key';
    this.val         = this.settings.val;
    this.attr_val    = 'ark-val';
    this.term        = '';
    this.el          = this.settings.el;
    this.endpoint    = this.settings.endpoint;
    this.delay       = this.settings.delay;
    this.minlength   = this.settings.minlength;
    this.callback    = this.settings.callback;
    this.target      = this.settings.target;

    // required settings
    if(null === this.key){ throw new ARK.errors.RequirementError('key is required'); }
    if(null === this.val){ throw new ARK.errors.RequirementError('val is required'); }
    if(null === this.el){ throw new ARK.errors.RequirementError('el is required'); }
    if(null === this.endpoint){ throw new ARK.errors.RequirementError('endpoint is required'); }
    if(null === this.target){ throw new ARK.errors.RequirementError('target is required'); }

    // validate types
    if(false === this.el instanceof jQuery){ throw TypeError('el must be a jquery object'); }

    /**
     * List template
     * @memberOf  Selector.template
     */
    this.template_string = '<ul><% _.forEach(suggestions, function(suggestion) { %><li><a '+this.attr_key+'="<%= suggestion.'+this.key+' %>" '+this.attr_val+'="<%= suggestion.'+this.val+' %>">'+this.settings.suggestion_template+'</a></li><% }); %></ul>';
    this.template = _.template(this.template_string);

    /**
     * Search for suggestions
     * @function Selector.typeahead
     */
    this.search = function(){


        var field = this.el;
        var term = field.val();
        var url = this.endpoint + term;

        // stop if the term hasn't changed, no point
        if(term === this.term){ return false; }

        // reset target 
        this.target.val(0);
        this.el.removeClass('legit');

        // fetch possible suggestions
        var suggestions = term.length < this.minlength ? [] : this.fetch(url);

        // and render
        this.render(suggestions, term);

        // update term
        this.term = term;

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
     * Render suggestions
     * @function Selector.render
     * @param {array} suggestions list of key:value objects for suggestion list
     */
    this.render = function(suggestions, term){

        if(term.length > this.minlength){
            this.settings.suggestions_wrapper.show();
        } else {
            this.settings.suggestions_wrapper.hide();
        }

        if(suggestions.length > 0){
            var that = this;
            var template = this.template({suggestions:suggestions});
            this.settings.suggestions_wrapper.html(template);
        } else {
            this.settings.suggestions_wrapper.html('no results for "'+term+'"');
        }
        

    };

    /**
     * On suggestion selection
     * @return {[type]} [description]
     */
    this.selected = function(e){

        // stop tomfoolery
        e.stopPropagation();
        e.preventDefault();
        e.stopImmediatePropagation();

        // get params
        var scope = e.data.context;
        var key = $(this).attr(scope.attr_key);
        var val = $(this).attr(scope.attr_val);

        // collect data
        var result = {};
        result[scope.key] = key;
        result[scope.val] = val;

        // assign key value back to target
        scope.target.val(key);

        // update the current term
        scope.term = val;

        // reset text in selector
        scope.el.val(val);

        // add legit class to show that this is a real value
        scope.el.addClass('legit');

        // send data back to any callbacks
        if(null !== scope.callback){
            scope.callback(result);
        }

        // hide selection
        scope.settings.suggestions_wrapper.hide();

    };

    /**
     * Initialize selector
     * @function Selector.init
     */
    this.init = function(){

        // register a keyup event on it for interactive searches
        var that = this;
        this.el.on('keyup', _.debounce(this.search, this.delay).bind(this));
        this.el.val(this.term);
        this.settings.suggestions_wrapper.on('click', 'a', {context:this}, this.selected);

    };

    this.de_init = function(){

        this.settings.suggestions_wrapper.hide();
        this.settings.suggestions_wrapper.html('');
        this.el.off('keyup');

        if(this.target.val() === '0'){
            this.el.val('');
            this.term = '';
        }

    };

    // initialize this thing
    this.el.on('focus', this.init.bind(this));
    this.el.on('blur', _.debounce(this.de_init, 100).bind(this));
    this.init();

    return this;

};

// - initialize on focus
// - deinitialize on blur while capturing selected events
// - only search when term changes
// - 