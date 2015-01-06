/**
* Cookie facade
* @module cookies
* @version 1.0
*/
ARK.cookies = (function(module){

    /* exports cookies */

    module.name = 'ARK';
    module.json = {};

    /**
     * Set cookie
     * @param {string} key  cookie key
     * @param {string} val  cookie val
     * @param {string} path cookie path
     * @function set
     * @memberOf module:cookies
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
     * @memberOf module:cookies
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
     * @memberOf module:cookies
     */
    module.get = function(key){
        key = module.name + '.' + key;
        return $.cookie(key);
    };

    return module;

}(ARK.cookies || {}));