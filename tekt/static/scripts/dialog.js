/**
 * The Dialog class provides typeahead ajax support for various selectors in TEKT. 
 * @summary Typeahead / AJAX selector 
 * @param  {object} config           
 * @param  {string} config.el        jquery element of object
 * @param  {string} config.type      type of dialog
 * @param  {string} config.message   message to display
 * @return {object}                  selector function instance
 * @class Dialog
 */
TEKT.Dialog = function(config){

    // default settings
    var types    = { ALERT:'alert', CONFIRM:'confirm' };
    var that     = this;
    var defaults = { type:types.ALERT, message:null };

    // settings
    this.settings = _.assign(defaults, config);
    this.modal    = null;
    this.href     = '';

    // required settings
    if(null === this.message){ throw new TEKT.errors.RequirementError('message is required'); }

    // modal template
    this.template = '<div class="dialog"></div>';
    this.$template = $(this.template);

    /**
     * Getter
     * @param  {string} key element key
     * @function Dialog.get
     * @return {object} whatever object exists
     */
    this.get = function(key) {
        return this.settings[key];
    };

    /**
     * Get message with markup
     * @function Dialog.get_alert_message
     * @return {object} template populated with message
     */
    this.get_alert_message = function() {
        var template = this.$template;
        var message = '<p class="message">' + this.get('message') + '</p>';
        template.html(message);
        return template;
    };

    /**
     * Initialize confirm buttons
     * @param  {object} buttons html buttons
     * @return {object}         object instance
     */
    this.init_confirm_buttons = function(buttons) {

        var that = this;
        var $buttons = $(buttons);
        var yes = $buttons.find('.yes');
        var no = $buttons.find('.no');

        yes.on('click', function(){
            window.location.href = that.href;
        });

        no.on('click', function(){
            that.modal.hide();
        });

        return this;

    };

    /**
     * Get message with markup
     * @function Dialog.get_alert_message
     * @return {object} template populated with message
     */
    this.get_confirm_message = function() {
        var template = this.$template;
        var message = '<p class="message">' + this.get('message') + '</p>';
            message += '<button class="yes">Yes</button>';
            message += '<button class="no">No</button>';
        template.html(message);
        return template;
    };

    /**
     * Setter
     * @param  {string} key element key
     * @param  {object} val value being set
     * @function Dialog.set
     * @return {object} whatever object exists
     */
    this.set = function(key, val) {
        this.settings[key] = val;
        return this.get(key);
    };

    /**
     * Alert
     * @param  {object} e jquery event
     * @function Dialog.alert
     * @return {object}   object instance
     */
    this.alert = function(e) {

        // config 
        var message = this.get_alert_message();
        this.modal = new TEKT.Modal({title:'Confirm', content:message});
        this.modal.show();
        return this;

    };

    /**
     * Confirm
     * @param  {object} e jquery event
     * @function Dialog.confirm
     * @return {object}   object instance
     */
    this.confirm = function(e) {

        // config 
        var message = this.get_confirm_message();
        this.modal = new TEKT.Modal({title:'Confirm', content:message});
        this.init_confirm_buttons(message, this.modal);
        this.modal.show();
        return this;

    };

    /**
     * Initialize selector
     * @function Dialog.init
     */
    this.init = function(){

        // get element
        var el = this.get('el');

        // init type
        switch(this.get('type')){

            case 'alert':
                el.on('click', function(e){
                    e.preventDefault();
                    that.alert();
                });
                break;

            case 'confirm':
                el.on('click', function(e){
                    e.preventDefault();
                    that.href = $(this).attr('href');
                    that.confirm();
                });
                break;

        }

    };

    this.init();

    return this;

};
