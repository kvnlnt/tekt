/**
* Lists all pubsub
* @module pubsub
* @version 1.0
*/

"use strict";

ARK.pubsub = (function(module){

    /** @exports pubsub */

    /**
     * Endpoints
     * @memberOf module:pubsub
     * @type {Object}
     */
    module.e = $({});

    /**
     * pubsub subscribe to event
     * @function ARK.pubsub.subscribe
     */
    module.subscribe = function() {
      this.e.on.apply(this.e, arguments);
    };

    /**
     * pubsub unsubscribe from event
     * @function ARK.pubsub.unsubscribe
     */
    module.unsubscribe = function() {
      this.e.off.apply(this.e, arguments);
    };

    /**
     * pubsub publish an event
     * @function ARK.pubsub.publish
     */
    module.publish = function() {
      this.e.trigger.apply(this.e, arguments);
    };

    // export
    return module;

})(ARK.pubsub || {});