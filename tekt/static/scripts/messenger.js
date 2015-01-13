/**
* Menu logic
* @module messenger
* @version 1.0
*/
ARK.messenger = (function(module){

    /* exports messenger */

    /**
     * Dom elements
     * @member el
     * @memberOf module:messenger
     */
    module.el = '[ark-messenger]';

    /**
     * Collection of instantiated messenger
     * @memberOf  el
     * @memberOf module:messenger
     */
    module.instances = [];

    /**
     * Fix to top of screen then fade out
     * @function fixate
     * @memberOf module:messenger
     */
    module.fixate = function(){

        module.$el
        .css({ position:'fixed' })
        .delay(2000)
        .queue(function(){
            module.$el.addClass('animated fadeOutUp').dequeue();
        });

    };

    /**
     * Initialize messenger
     * @function init
     * @memberOf module:messenger
     */
    module.init = function() {

        module.$el = $(module.el);
        ARK.pubsub.subscribe('SCROLLING', module.fixate);

    };

    module.init();

    return module;

}(ARK.messenger || {}));