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
    var defaults = { title:null, content:null };

    // settings
    this.bg = $('<div class="modal-bg"></div>');
    this.template = '<div class="modal card animate fadeIn">';
    this.template += '<header>Title</header>';
    this.template += '<div class="content">Content</div>';
    this.template += '<footer>Footer</footer>';
    this.template += '</div>';
    this.modal = $(this.template);
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
     * @return {object} whatever object exists
     */
    this.set = function(key, val) {
        this.settings[key] = val;
        return this.get(key);
    };

    /**
     * Set the title
     * @param {string} title modal title
     * @function Modal.set_title
     */
    this.set_title = function(title){

        this.set('title', title);
        this.modal.children('header').html(title);

    };

    /**
     * Set the content
     * @param {string} title modal title
     * @function Modal.set_title
     */
    this.set_content = function(content){

        this.set('content', content);
        this.modal.children('.content').html(content);

    };

    /**
     * Align modal in middle of view port
     */
    this.align = function(){

        var win_height = $(window).height();
        var win_width = $(window).width();
        var win_top = $(window).scrollTop();
        var modal_width = this.modal.width();
        var modal_height = this.modal.height();
        var top = win_top + (win_height - modal_height) / 2;
        var left = (win_width - modal_width) / 2;
        this.modal.css({top:top, left:left});

    };

    /**
     * Show window
     * @function Modal.show
     */
    this.hide = function(){

        // // attach to body
        $('body').toggleClass('modal-body');
        this.bg.remove();
        this.modal.remove();

    };

    /**
     * Show window
     * @function Modal.show
     */
    this.show = function(){

        // // attach to body
        $('body').toggleClass('modal-body');
        $('body').prepend(this.bg).prepend(this.modal);
        this.align();

    };

    /**
     * Initialize modal
     * @function Modal.init
     */
    this.init = function(){

        // setup content
        this.set_title(this.get('title'));
        this.set_content(this.get('content'));

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
