ARK.menu = (function(module){

    module.el = {};
    module.el.menu = '#menu';
    module.el.toggle = '#menu-toggle';
    module.cookie = 'menu_collapsed';

    module.toggle = function(e){
        module.el.$menu.toggleClass('collapsed');
        
        var collapsed;
        if ($.cookie(module.cookie) === "true"){
            $.cookie(module.cookie, false, { path: '/' });
        } else {
            $.cookie(module.cookie, true, { path: '/' });
        }
        
    };

    module.init = function(){
        module.el.$menu = $(module.el.menu);
        module.el.$toggle = $(module.el.toggle);
        module.el.$toggle.click(module.toggle);
    };

    module.init();

    return module;

}(ARK.menu || {}));