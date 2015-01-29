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
    var defaults = { el:null, threshold:null, fadeout:false };

    // settings
    this.settings = _.assign(defaults, config);
    this.original_state =  {
        position:this.settings.el.css('position'),
        width:this.settings.el.css('width'),
        z_index:this.settings.el.css('z-index'),
        classes:this.settings.el.attr('class')
    };

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
     * Reset to original state
     * @return {object} return self
     */
    this.reset = function(){
        this.get('el')
        .removeClass('animated fadeInDown fadeOutUp')
        .addClass(this.original_state.classes)
        .css({
            position:this.original_state.position,
            width:this.original_state.width,
            'z-index':this.original_state.z_index,
        });
        return this;
    };

    /**
     * Fix to top of screen then fade out
     * @function Fixate.fixate
     */
    this.fixate = function(top){

        var that = this;
        if(top < this.get('threshold')) { 

            this.reset();

        } else {

            // fade in
            this
            .get('el')
            .css({ position:'fixed', width:'100%', 'z-index':100 })
            .addClass('animated fadeInDown');

            // if fadeout it set, run it
            if(false !== this.get('fadeout')){
                this
                .get('el')
                .delay(this.get('fadeout'))
                .queue(function(){
                    that.get('el').addClass('animated fadeOutUp').dequeue();
                    setTimeout(1000, function(){
                        that.reset();
                    });
                });
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
