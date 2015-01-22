/**
* Messenger module
* @module messenger
* @version 1.0
*/
TEKT.messenger = (function(module){

    /* exports messenger */

    /**
     * Dom elements
     * @member el
     * @memberOf module:messenger
     */
    module.el = '[tekt-part="messenger"]';

    /**
     * Collection of instantiated messenger
     * @member instances
     * @memberOf module:messenger
     */
    module.instances = [];

    /**
     * Fix to top of screen then fade out
     * @function fixate
     * @memberOf module:messenger
     */
    module.fixate = function(top){

        var threshold = 200;
        var is_sticky = Boolean(module.$el.find('sticky').length);
        if(true === is_sticky || top < threshold) { return false; }

        // else continue
        module.$el
        .css({ position:'fixed', width:'100%' })
        .addClass('animated fadeInDown')
        .delay(5000)
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
        TEKT.pubsub.subscribe('SCROLLING', function(e, top){
            module.fixate(top.top);
        });

    };

    $(document).ready(module.init);

    return module;

}(TEKT.messenger || {}));
