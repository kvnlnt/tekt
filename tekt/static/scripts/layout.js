/**
 * The Layout class provides typeahead ajax support for various selectors in TEKT. 
 * @summary Typeahead / AJAX selector 
 * @param  {object} config           
 * @param  {string} config.el  jquery element of object
 * @return {object}            selector function instance
 * @class Layout
 */
TEKT.Layout = function(config){

    // default settings
    var that     = this;
    var defaults = {  el:null, regions:null };

    // settings
    this.settings = _.assign(defaults, config);

    // required settings
    if(null === this.el){ throw new TEKT.errors.RequirementError('el is required'); }

    /**
     * Getter
     * @param  {string} key element key
     * @function Layout.get
     * @return {object} whatever object exists
     */
    this.get = function(key) {
        return this.settings[key];
    };

    /**
     * Setter
     * @param  {string} key element key
     * @param  {object} val value being set
     * @function Layout.set
     * @return {object} whatever object exists
     */
    this.set = function(key, val) {
        this.settings[key] = val;
        return this.get(key);
    };

    /**
     * Toggle collapse state of region
     * @function Layout.toggle_collapse
     * @return {object} region object
     */
    this.toggle_collapse = function(region){
        region.$el.toggleClass('collapsed');
        var collapsed = TEKT.cookies.get(region.collapse_key) === "true" ? "false" : "true";
        TEKT.cookies.set(region.collapse_key, collapsed);
        return region;
    };

    /**
     * Configure a region
     * @function Layout.config_region
     * @param  {object} region
     * @param  {string} region.name          name of region
     * @param  {string} region.selector      jquery selector of region
     * @param  {boolean} [region.collapsible]  is this collapsible?
     * @param  {string} [region.collapse_on]   on which event does it toggle
     * @param  {string} [region.collapse_key]  what cookie key will it be based on
     */
    this.config_region = function(region){

        var that = this;
        region.$el = this.get('el').find(region.selector);

        if(region.collapsible){
            TEKT.pubsub.subscribe(region.collapse_on, function(){
                that.toggle_collapse(region);
            });
        }

        return region;

    };

    /**
     * Initialize selector
     * @function Layout.init
     */
    this.init = function(){

        // get element
        this.regions = _.map(this.settings.regions, this.config_region.bind(this));

    };

    this.init();

    return this;

};
