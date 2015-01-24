/**
* Menu module
* @module menus
* @version 1.0
*/
TEKT.menus = (function(module){

    /* exports menus */

    module.el = {};
    module.el.menu = '.menu';
    module.el.toggle = '.toggle';

    /**
     * Toggle menu
     * @param  {object} e jquery click event
     * @function toggle
     * @memberOf module:menus
     */
    module.toggle = function(e){
        
        var btn = module.el.$toggle.children('.fa');
        TEKT.pubsub.publish('MENU:TOGGLE', module.el);
        if(btn.hasClass('fa-chevron-left')){
            btn.removeClass('fa-chevron-left').addClass('fa-chevron-right');
        } else {
            btn.removeClass('fa-chevron-right').addClass('fa-chevron-left');
        }
        return e;
    };

    /**
     * Initialize menu
     * @function init
     * @memberOf module:menus
     */
    module.init = function(){
        module.el.$menu = $(module.el.menu);
        module.el.$toggle = module.el.$menu.find(module.el.toggle);
        module.el.$toggle.on('click', module.toggle);
    };

    module.init();

    return module;

}(TEKT.menus || {}));
