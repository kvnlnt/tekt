/**
* System wide errors
* @module errors
* @version 1.0
*/

ARK.errors = (function(module){


    /**
     * Requirement error
     * @param {string} message error message
     * @class RequirementError
     * @memberOf module:errors
     */
    module.RequirementError = function(message) {
       this.message = message;
       this.name = "RequirementError";
    };

    module.RequirementError.prototype = Object.create(Error.prototype);

    return module;

}(ARK.errors || {}));
