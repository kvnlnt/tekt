/**
 * The Selector class provides typeahead ajax support for various selectors in TEKT. 
 * @summary Typeahead / AJAX selector 
 * @param  {object} config           
 * @param  {string} config.el        jquery element of object
 * @param  {string} config.src       iframe src
 * @param  {object} config.callback  callback function upon selection
 * @param  {string} config.target    jquery element of target object (usually itself)
 * @return {object}                  selector function instance
 * @class Selector
 */
TEKT.Selector = function(config){

    // default settings
    var that     = this;
    var defaults = { el:null, src:null, callback:null, title:'Search' };

    // settings
    this.settings = _.assign(defaults, config);
    this.modal = null;

    // required settings
    if(null === this.settings.el){ throw new TEKT.errors.RequirementError('el is required'); }
    if(null === this.settings.src){ throw new TEKT.errors.RequirementError('src is required'); }
    if(null === this.settings.callback){ throw new TEKT.errors.RequirementError('callback is required'); }
    if(null === this.settings.target){ throw new TEKT.errors.RequirementError('target is required'); }

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
     * Run callback
     * @function Selector.callback
     */
    this.callback = function(e){

        e.preventDefault();
        e.stopPropagation();
        var item = $(e.target);
        var key = item.attr('tekt-key');
        var val = item.attr('tekt-val');
        this.get('callback')({ key:key, val:val });
        this.modal.hide();

    };

    /**
     * Initialize iframe functions
     * @param  {object} e jquery load event
     * @function Selector.init_iframe
     */
    this.init_iframe = function(e){
        var that = this;
        var close = this.iframe.contents().find('[tekt-id="close_iframe"]');
        close.on('click', function(){ that.modal.hide(); });
        var item = this.iframe.contents().find('.item');
        item.on('click', this.callback.bind(this));
    };

    /**
     * Show selector page in iframe in a modal
     * @function Selector.show
     */
    this.show = function(){

        this.iframe = $('<iframe>');
        this.iframe.prop('src', this.get('src'));
        this.iframe.on('load', this.init_iframe.bind(this));
        this.modal = new TEKT.Modal({title:this.get('title'), content:this.iframe});
        this.modal.show();

    };

    /**
     * Initialize selector
     * @function Selector.init
     */
    
    this.init = function(){

        this.get('el').on('click', this.show.bind(this));

    };

    this.init();

    return this;

};
