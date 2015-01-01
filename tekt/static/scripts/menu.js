ARK.menu = (function(module){

    module.el = {};
    module.el.menu = '#menu';
    module.el.toggle = '#menu-toggle';
    module.collapse_key = 'menu-toggle';

    module.toggle = function(e){
        module.el.$menu.toggleClass('collapsed');
        var btn = module.el.$toggle.children('.fa');
        if(btn.hasClass('fa-chevron-left')){
            btn.removeClass('fa-chevron-left').addClass('fa-chevron-right');
        } else {
            btn.removeClass('fa-chevron-right').addClass('fa-chevron-left');
        }
        var collapsed = ARK.cookie.get(module.collapse_key) === "true" ? "false" : "true";
        ARK.cookie.set(module.collapse_key, collapsed);
    };

    module.init = function(){
        module.el.$menu = $(module.el.menu);
        module.el.$toggle = $(module.el.toggle);
        module.el.$toggle.click(module.toggle);
        ARK.cookie.default(module.collapse_key, "false");
    };

    module.init();

    return module;

}(ARK.menu || {}));