/**
* Menu logic
* @module menus
* @version 1.0
*/
ARK.menus = (function(module){

    /* exports menus */

    module.el = {};
    module.el.menu = '#menu';
    module.el.toggle = '#menu-toggle';
    module.collapse_key = 'menu-toggle';

    /**
     * Toggle menu
     * @param  {object} e jquery click event
     * @function toggle
     * @memberOf module:menus
     */
    module.toggle = function(e){
        module.el.$menu.toggleClass('collapsed');
        var btn = module.el.$toggle.children('.fa');
        if(btn.hasClass('fa-chevron-left')){
            btn.removeClass('fa-chevron-left').addClass('fa-chevron-right');
        } else {
            btn.removeClass('fa-chevron-right').addClass('fa-chevron-left');
        }
        var collapsed = ARK.cookies.get(module.collapse_key) === "true" ? "false" : "true";
        ARK.cookies.set(module.collapse_key, collapsed);
    };

    /**
     * Initialize menu
     * @function init
     * @memberOf module:menus
     */
    module.init = function(){
        module.el.$menu = $(module.el.menu);
        module.el.$toggle = $(module.el.toggle);
        module.el.$toggle.click(module.toggle);
        ARK.cookies.default(module.collapse_key, "false");
    };

    module.init();

    return module;

}(ARK.menus || {}));