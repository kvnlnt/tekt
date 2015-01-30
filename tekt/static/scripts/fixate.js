/**
 * The Fixate class provides typeahead ajax support for various selectors in TEKT. 
 * @summary Typeahead / AJAX selector 
 * @param  {object} config           
 * @param  {string} config.el        jquery element of object
 * @param  {string} config.type      type of fixate
 * @return {object}                  selector function instance
 * @class Fixate
 */
TEKT.Fixate = function(config){

    // default settings
    var defaults = { el:null, threshold:null, expire:false, fixate_class:'fixate' };

    // settings
    this.settings = _.assign(defaults, config);

    // required settings
    if(null === this.settings.el){ throw new TEKT.errors.RequirementError('el is required'); }

    // dynamically calc threshold if null
    if(this.settings.threshold === null){
        this.settings.threshold = this.settings.el.height();
    }

    /**
     * Getter
     * @param  {string} key element key
     * @function Fixate.get
     * @return {object} whatever object exists
     */
    this.get = function(key) {
        return this.settings[key];
    };

    /**
     * Setter
     * @param  {string} key element key
     * @param  {object} val value being set
     * @function Fixate.set
     * @return {object} whatever object exists
     */
    this.set = function(key, val) {
        this.settings[key] = val;
        return this.get(key);
    };

    /**
     * Reset by removing fixate class
     * @function Fixate.reset
     * @return {object} return instance
     */
    this.reset = function(){
        this.get('el').removeClass(this.get('fixate_class'));
        return this;
    };

    /**
     * Fix to top of screen then fade out
     * @function Fixate.fixate
     * @return {object} return instance
     */
    this.fixate = function(top){

        var that = this;
        if(top < this.get('threshold')) { 

            this.reset();

        } else {

            // add fixate class
            this.get('el').addClass(this.get('fixate_class'));

            // if expires, reset after expired time
            if(this.get('expire')){
                this.get('el').delay(this.get('expire')).queue(this.reset.bind(this));
            }

        }

        return this;

    };

    /**
     * Initialize
     * @function Fixate.init
     */
    this.init = function(){

        var that = this;
        TEKT.pubsub.subscribe(TEKT.EVENT.WIN_SCROLL, function(e, top){
            that.fixate(top.top);
        });

    };

    this.init();

    return this;

};
