/**
 * The Scroller class provides typeahead ajax support for various selectors in TEKT. 
 * @summary Typeahead / AJAX selector 
 * @param  {object} config           
 * @param  {string} config.el        jquery element of object
 * @param  {number} config.top       top position
 * @return {object}                  selector function instance
 * @class Scroller
 */
TEKT.Scroller = function(config){

    var MODES = { TOP:'top', EL:'el' };

    // default settings
    var defaults = { top:null, tekt_id:null };

    // settings
    this.settings = _.assign(defaults, config);
    this.mode = null === this.settings.tekt_id ? MODES.TOP : MODES.EL;

    // required settings
    if(null === this.settings.el){ throw new TEKT.errors.RequirementError('el is required'); }
    if(null === this.settings.top && null === this.settings.tekt_id){ throw new TEKT.errors.RequirementError('either top or a tekt_id is required'); }

    /**
     * Getter
     * @param  {string} key element key
     * @function Scroller.get
     * @return {object} whatever object exists
     */
    this.get = function(key) {
        return this.settings[key];
    };

    /**
     * Setter
     * @param  {string} key element key
     * @param  {object} val value being set
     * @function Scroller.set
     * @return {object} whatever object exists
     */
    this.set = function(key, val) {
        this.settings[key] = val;
        return this.get(key);
    };

    /** 
     * Scroll back to top
     * @function Scroller.scroll_to_top
     * @memberOf module:window
    */
    this.scroll_to_top = function(){
        this.scroll_to(0, 500, 'swing');
    };

    /** 
     * Scroll to element
     * @function Scroller.scroll_to_element
     * @memberOf module:window
    */
    this.scroll_to_element = function(el){
        var top = el.position().top;
        this.scroll_to(top, 500, 'swing');
    };

    /** 
     * Scroll to location
     * @function Scroller.scroll_to
     * @memberOf module:window
    */
    this.scroll_to = function(top, speed, easing){
        var easing = easing || 'linear';
        TEKT.window.$body.animate({scrollTop:top}, speed, easing);
    };


    /**
     * Initialize
     * @function Scroller.init
     */
    this.init = function(){

        var that = this; 
        this.get('el').on('click', function(){
            if(that.mode === MODES.EL){
                var el = $('['+that.get('tekt_id')+']');
                that.scroll_to_element(el);
            } else {
                var top = that.get('top');
                that.scroll_to(top);
            }
        });

    };

    this.init();

    return this;

};
