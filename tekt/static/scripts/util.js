/**
* Utility module
* @module util
* @version 1.0
*/
TEKT.util = (function(module){

    /* exports util */

    /**
     * Turn key value params into object
     * @member deparam
     * @memberOf module:deparam
     */
    module.deparam = function(string){

        var key_values = string.split(',');
        var params = {}

        _.each(key_values, function(v, k){
            var item    = v.split('=');
            var key     = item[0].trim();
            var val     = item[1].trim();
            params[key] = val;
        });
        
        return params;
    };


    return module;

}(TEKT.util || {}));
