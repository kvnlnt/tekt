/**
* System wide fx
* @module fx
* @version 1.0
*/

TEKT.fx = (function(module){

    /* exports fx */

    /**
     * Sequence the application of a class to a list of elements
     * @param {object} els list of objects
     * @param {string} classes space delimited string of classes to be applied
     * @param {number} delay number of milliseconds to sequence application
     * @function sequence
     * @memberOf module:fx 
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

    /**
     * Run a bunch of fx automatically
     * @return {object} jquery collection of elements
     */
    module.auto_fx = function(){

        // collect elements
        var collection = [];
            collection.push('.card');
            collection.push('form');

        // create seleector
        var els = $(collection.join(', '));

        // run animation sequence
        TEKT.fx.sequence(els, 'animated fadeIn', 200);

        return els;

    };

    module.init = function(){

        module.auto_fx();

    };

    $(document).ready(module.init);

    return module;

}(TEKT.fx || {}));
