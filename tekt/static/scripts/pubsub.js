/**
* Pubsub module
* @module pubsub
* @version 1.0
*/

"use strict";

TEKT.pubsub = (function(module){

    /** @exports pubsub */

    /**
     * Endpoints
     * @member e
     * @memberOf module:pubsub
     * @type {Object}
     */
    module.e = $({});

    /**
     * pubsub subscribe to event
     * @function subscribe
     * @memberOf pubsub:subscribe
     */
    module.subscribe = function() {
      this.e.on.apply(this.e, arguments);
    };

    /**
     * pubsub unsubscribe from event
     * @function unsubscribe
     * @memberOf pubsub:unsubscribe
     */
    module.unsubscribe = function() {
      this.e.off.apply(this.e, arguments);
    };

    /**
     * pubsub publish an event
     * @function publish
     * @memberOf pubsub:publish
     */
    module.publish = function() {
      this.e.trigger.apply(this.e, arguments);
    };

    // export
    return module;

})(TEKT.pubsub || {});
