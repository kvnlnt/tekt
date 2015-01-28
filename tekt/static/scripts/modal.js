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

    // modal template
    this.template = '<div class="modal grid">
                        <header class="grid-row">
                            <div class="grid-col">
                                <div class="title grid-col fluid-width"></div>
                                <div class="actions grid-col">
                                    <a class="close button link"><i class="fa fa-times"></i></a></div>
                                </div>
                        </header>
                        <div class="grid-row">
                            <div class="content grid-col fluid-height"></div>
                        </div>
                    </div>';

    this.modal = $(this.template);
    this.modal_content = this.modal.find('.content');
    this.modal_title = this.modal.find('.title');
    this.modal_close = this.modal.find('header .close');
    this.settings = _.assign(defaults, config);

    // required settings
    if(null === this.settings.title){ throw new TEKT.errors.RequirementError('Title is required'); }
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
     * Set content
     * @param {string} content modal content
     * @function Modal.set_content
     * @return {object} modal instance
     */
    this.set_content = function(content){

        this.set('content', content);
        this.modal_content.html(content);

        return this;

    };

    /**
     * Set title
     * @param {string} title modal title
     * @function Modal.set_title
     * @return {object} modal instance
     */
    this.set_title = function(title){

        this.set('title', title);
        this.modal_title.html(title);

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
        this.set_title(this.get('title'))
        .set_content(this.get('content'))
        .align();

        var that = this;
        this.modal_close.on('click', this.hide.bind(this));
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
