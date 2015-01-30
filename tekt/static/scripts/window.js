/**
* Window module
* @summary Manages window functions and tools
* @module window
* @version 1.0
*/
TEKT.window = (function(module){

    /* exports window */


    /**
     * Elements
     * @member module.el
     * @memberOf module:window
     */
    module.el = {};

    /**
     * Debounce delay setting
     * @member module.delay
     * @memberOf module:window
     */
    module.delay = 150;

    /**
     * Manage show hide of toggle button
     * @function manage
     * @memberOf module:window
     * @return {boolean} button state (true = showing)
     */
    module.scroll = function(){

        // publish window event
        TEKT.pubsub.publish(TEKT.EVENT.WIN_SCROLL, {top:module.$win.scrollTop()});

    };

    /**
     * Broadcase resize event
     * @function resize
     * @memberOf module:window
     */
    module.resize = function(){

        // broadacast event
        TEKT.pubsub.publish(TEKT.EVENT.WIN_RESIZE);

    };

    /**
     * Initialize scroll to top button
     * @function init
     * @memberOf module:window
     */
    module.init = function(key){
        module.$win = $(window);
        module.$body = $('body, html');
        module.$win.on('scroll', _.debounce(module.scroll, module.delay));
        module.$win.on('resize', _.debounce(module.resize, module.delay));
    };

    $(document).ready(module.init);

    return module;

}(TEKT.window || {}));
