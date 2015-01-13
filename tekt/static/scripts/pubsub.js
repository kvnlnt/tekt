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
     * @function subscribe
     * @memberOf pubsub
     */
    module.subscribe = function() {
      this.e.on.apply(this.e, arguments);
    };

    /**
     * pubsub unsubscribe from event
     * @function unsubscribe
     * @memberOf pubsub
     */
    module.unsubscribe = function() {
      this.e.off.apply(this.e, arguments);
    };

    /**
     * pubsub publish an event
     * @function publish
     * @memberOf pubsub
     */
    module.publish = function() {
      this.e.trigger.apply(this.e, arguments);
    };

    // export
    return module;

})(ARK.pubsub || {});