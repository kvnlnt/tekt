ARK.Cookie = (function(module){

    module.name = 'ARK';
    module.json = {};

    module.set = function(key, val, path){
        key = module.name + '.' + key;
        val = val || '';
        path = path || '/';
        $.cookie(key, val, { path: path });
    };

    module.default = function(key, val, path){
        if($.cookie( module.name + '.' + key) === void 0){
            module.set(key, val, path);
        }
    };

    module.get = function(key){
        key = module.name + '.' + key;
        return $.cookie(key);
    };

    return module;

}(ARK.menu || {}));