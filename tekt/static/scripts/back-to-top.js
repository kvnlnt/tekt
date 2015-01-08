/**
* Manages back to top button
* @module back_to_top
* @version 1.0
*/
ARK.back_to_top = (function(module){

    /* exports cookies */

    module.el = '#top';
    module.delay = 150;

    /**
     * Manage show hide of toggle button
     * @function manage
     * @memberOf module:back_to_top
     * @return {boolean} button state (true = showing)
     */
    module.manage = function(){

        if(module.$win.scrollTop() >= 50){
            module.$el.fadeIn(200);
        } else {
            module.$el.fadeOut(200);
        }

    };

    /** 
     * Scroll back to top
     * @function scrollTop
     * @memberOf module:back_to_top
    */
    module.scrollTop = function(){
        module.$body.animate({scrollTop:0}, 500);
    };

    /**
     * Initialize scroll to top button
     * @function init
     * @memberOf module:back_to_top
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

}(ARK.back_to_top || {}));