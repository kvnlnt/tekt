/**
 * The Selector class provides typeahead ajax support for various selectors in ARK. 
 * @summary Typeahead / AJAX selector 
 * @param  {object} config           
 * @param  {string} config.el        jquery element of object
 * @param  {string} config.src       iframe src
 * @param  {object} config.callback  callback function upon selection
 * @return {object}                  selector function instance
 * @class Selector
 */
ARK.Selector = function(config){

    // default settings
    var that     = this;
    var defaults = { el:null, src:null, callback:null };

    // settings
    this.settings = _.assign(defaults, config);

    // required settings
    if(null === this.el){ throw new ARK.errors.RequirementError('el is required'); }
    if(null === this.src){ throw new ARK.errors.RequirementError('src is required'); }
    if(null === this.callback){ throw new ARK.errors.RequirementError('callback is required'); }

    /**
     * Getter
     * @param  {string} key element key
     * @function Selector.get
     * @return {object} whatever object exists
     */
    this.get = function(key) {
        return this.settings[key];
    };

    /**
     * Setter
     * @param  {string} key element key
     * @param  {object} val value being set
     * @function Selector.set
     * @return {object} whatever object exists
     */
    this.set = function(key, val) {
        this.settings[key] = val;
        return this.get(key);
    };


    /**
     * Close iframe
     * @function Selector.teardown_iframe
     */
    this.teardown_iframe = function(){
        this.iframe.remove();
        $('body').css('overflow','auto');
    };

    /**
     * Run callback
     * @function Selector.callback
     */
    this.callback = function(e){

        e.preventDefault();
        e.stopPropagation();
        var item = $(e.target);
        var key = item.attr('ark-key');
        var val = item.attr('ark-val');
        this.get('callback')({ key:key, val:val });
        this.teardown_iframe();

    };

    /**
     * Initialize iframe functions
     * @param  {object} e jquery load event
     * @function Selector.init_iframe
     */
    this.init_iframe = function(e){
        var close = this.iframe.contents().find('.close_iframe');
        close.on('click', this.teardown_iframe.bind(this));
        var item = this.iframe.contents().find('.item');
        item.on('click', this.callback.bind(this));
    };

    /**
     * Render suggestions
     * @function Selector.render
     * @param {array} suggestions list of key:value objects for suggestion list
     */
    this.launch = function(){

        // setup iframe
        var iframe = $('<iframe>');
        iframe.attr('ark-selector-iframe', 'selector');
        iframe.prop('src', this.get('src'));
        iframe.on('load', this.init_iframe.bind(this));

        // let's keep a copy to ref
        this.iframe = iframe;

        // attach to body
        $('body').prepend(iframe).css('overflow','hidden');

    };

    /**
     * Initialize selector
     * @function Selector.init
     */
    
    this.init = function(){

        this.get('el').on('click', this.launch.bind(this));

    };

    this.init();

    return this;

};
