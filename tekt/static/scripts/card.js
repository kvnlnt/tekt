/**
 * The Card class provides typeahead ajax support for various selectors in TEKT. 
 * @summary Typeahead / AJAX selector 
 * @param  {object} config           
 * @param  {string} config.el        jquery element of object
 * @param  {string} config.src       iframe src
 * @param  {object} config.callback  callback function upon selection
 * @return {object}                  selector function instance
 * @class Card
 */
TEKT.Card = function(config){

    // default settings
    var that     = this;
    var defaults = {  el:null, };

    // settings
    this.settings = _.assign(defaults, config);
    this.el       = this.settings.el;

    // element selectors
    this.dom = {
        header   : '.header',
        showhide : '.header .showhide',
        body     : '.body',
        footer   : '.footer'
    };

    // required settings
    if(null === this.el){ throw new TEKT.errors.RequirementError('el is required'); }

    /**
     * Getter
     * @param  {string} key element key
     * @function Card.get
     * @return {object} whatever object exists
     */
    this.get = function(key) {
        return this.settings[key];
    };

    /**
     * Setter
     * @param  {string} key element key
     * @param  {object} val value being set
     * @function Card.set
     * @return {object} whatever object exists
     */
    this.set = function(key, val) {
        this.settings[key] = val;
        return this.get(key);
    };

    /**
     * Toggle menu
     * @param  {object} e jquery click event
     * @function toggle
     * @memberOf module:cards
     */
    this.toggle = function(e){

        this.get('body').toggleClass('tekt-hidden');
        this.get('footer').toggleClass('tekt-hidden');
        this.get('showhide').toggleClass('fa-minus');
        this.get('showhide').toggleClass('fa-plus');

    };

    /**
     * Initialize selector
     * @function Card.init
     */
    this.init = function(){

        // get element
        var el = this.get('el');

        // init it's children
        this.set('header'         , el.find(this.dom.header));
        this.set('showhide'       , el.find(this.dom.showhide));
        this.set('body'           , el.find(this.dom.body));
        this.set('footer'         , el.find(this.dom.footer));

        // reg events
        this.get('showhide').on('click' , this.toggle.bind(this));

    };

    this.init();

    return this;

};
