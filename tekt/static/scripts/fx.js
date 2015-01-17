/**
* System wide fx
* @module fx
* @version 1.0
*/

TEKT.fx = (function(module){

    /* exports fx */

    /**
     * Draw attention to an element
     */
    module.sequence = function(els, classes, delay){

        _.each(els, function(v, k){
            $(v).css('opacity', 0);
            $(v).delay(k*delay).queue(function(){
                $(v).addClass(classes).dequeue();
            });
        });

        return els;

    };

    return module;

}(TEKT.fx || {}));
