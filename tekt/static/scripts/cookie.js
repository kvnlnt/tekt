/**
* Cookie facade
* @module cookie
* @version 1.0
*/
ARK.cookie = (function(module){

    /* exports cookie */

    module.name = 'ARK';
    module.json = {};

    /**
     * Set cookie
     * @param {string} key  cookie key
     * @param {string} val  cookie val
     * @param {string} path cookie path
     * @function set
     * @memberOf module:cookie
     */
    module.set = function(key, val, path){
        key = module.name + '.' + key;
        val = val || '';
        path = path || '/';
        $.cookie(key, val, { path: path });
    };

    /**
     * Set default cookie if cookie doesn't exist
     * @param {string} key  cookie key
     * @param {string} val  cookie val
     * @param {string} path cookie path
     * @function default
     * @memberOf module:cookie
     */
    module.default = function(key, val, path){
        if($.cookie( module.name + '.' + key) === void 0){
            module.set(key, val, path);
        }
    };

    /**
     * Get cookie by key
     * @param  {string} key cookie string
     * @return {object}     cookie contents
     * @function get
     * @memberOf module:cookie
     */
    module.get = function(key){
        key = module.name + '.' + key;
        return $.cookie(key);
    };

    return module;

}(ARK.menu || {}));