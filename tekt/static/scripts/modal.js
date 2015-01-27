/**
 * The Modal class provides modal window support for TEKT
 * @summary Typeahead / AJAX modal 
 * @param  {object} config           
 * @param  {string} config.title     title of modal window
 * @param  {object} config.content   HTML content
 * @return {object}                  modal function instance
 * @class Modal
 */
TEKT.Modal = function(config){

    // default settings
    var that     = this;
    var defaults = { content:null };

    // settings
    this.bg = $('<div class="modal-bg"></div>');
    this.template = '<div class="modal">';
    this.template += '</div>';
    this.modal = $(this.template);
    this.settings = _.assign(defaults, config);

    // required settings
    if(null === this.settings.content){ throw new TEKT.errors.RequirementError('Content is required'); }

    /**
     * Getter
     * @param  {string} key element key
     * @function Modal.get
     * @return {object} whatever object exists
     */
    this.get = function(key) {
        return this.settings[key];
    };

    /**
     * Setter
     * @param  {string} key element key
     * @param  {object} val value being set
     * @function Modal.set
     * @return {object} modal instance
     */
    this.set = function(key, val) {
        this.settings[key] = val;
        return this;
    };

    /**
     * Fill with content
     * @param {string} title modal title
     * @function Modal.set_title
     * @return {object} modal instance
     */
    this.fill = function(content){

        this.set('content', content);
        this.modal.html(content);

        return this;

    };

    /**
     * Align modal in middle of view port
     * @return {object} modal instance
     */
    this.align = function(){

        var win_height = $(window).height();
        var win_width = $(window).width();
        var modal_width = this.modal.width();
        var modal_height = this.modal.height();
        var top = ((win_height - modal_height) / 2);
        var left = (win_width - modal_width) / 2;
        this.modal.css({top:top, left:left});

        return this;

    };

    /**
     * Show window
     * @function Modal.show
     * @return {object} modal instance
     */
    this.hide = function(){

        // // attach to body
        $('body').toggleClass('modal-body');
        this.bg.remove();
        this.modal.remove();

        return this;

    };

    /**
     * Show window
     * @function Modal.show
     * @return {object} modal instance
     */
    this.show = function(){

        // // attach to body
        $('body').toggleClass('modal-body');
        $('body').prepend(this.bg).prepend(this.modal);
        this.modal.addClass('animated bounceInRight');
        this.align();

        return this;

    };

    /**
     * Initialize modal
     * @function Modal.init
     */
    this.init = function(){

        // setup content
        this.fill(this.get('content')).align();

        var that = this;
        this.bg.on('click', this.hide.bind(this));
        TEKT.pubsub.subscribe(TEKT.EVENT.WIN_RESIZE, function(){ that.align(); });

    };

    /**
     * Initialize modal
     * @function Modal.init
     */

    this.init();

    return this;

};
