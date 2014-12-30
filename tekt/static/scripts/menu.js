ARK.menu = (function(module){


    module.el = {};
    module.el.menu = '#menu';
    module.el.toggle = '#menu-toggle';

    module.toggle = function(e){
        module.el.$menu.toggleClass('collapsed');
    };

    module.init = function(){
        module.el.$menu = $(module.el.menu);
        module.el.$toggle = $(module.el.toggle);
        module.el.$toggle.click(module.toggle);
    };

    module.init();

    return module;

}(ARK.menu || {}));