/**
* Scrolling module
* @summary Manages scrolling functions and tools
* @module scrolling
* @version 1.0
*/
TEKT.scrolling = (function(module){

    /* exports cookies */

    module.el = '[tekt-piece="scroll_to_top"]';
    module.delay = 150;

    /**
     * Manage show hide of toggle button
     * @function manage
     * @memberOf module:scrolling
     * @return {boolean} button state (true = showing)
     */
    module.manage = function(){

        if(module.$win.scrollTop() >= 50){
            module.$el.fadeIn(200);
        } else {
            module.$el.fadeOut(200);
        }

        // publish scrolling event
        TEKT.pubsub.publish('SCROLLING', {top:module.$win.scrollTop()});

    };

    /** 
     * Scroll back to top
     * @function scrollTop
     * @memberOf module:scrolling
    */
    module.scrollTop = function(){
        module.scrollTo(0, 500, 'swing');
    };

    /** 
     * Scroll back to top
     * @function scrollTop
     * @memberOf module:scrolling
    */
    module.scrollTo = function(top, speed, easing){
        var easing = easing || 'linear';
        module.$body.animate({scrollTop:top}, speed, easing);
    };

    /**
     * Initialize scroll to top button
     * @function init
     * @memberOf module:scrolling
     */
    module.init = function(key){
        module.$win = $(window);
        module.$body = $('body, html');
        module.$el = $(module.el);
        module.$el.on('click', module.scrollTop);
        module.$win.on('scroll', _.debounce(module.manage, module.delay));
    };

    $(document).ready(module.init);

    return module;

}(TEKT.scrolling || {}));
