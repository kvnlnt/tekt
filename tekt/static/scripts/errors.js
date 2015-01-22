/**
* System wide errors
* @module errors
* @version 1.0
*/

TEKT.errors = (function(module){

    /* exports errors */

    /**
     * Enable autoscrolling to offscreen errors
     * @type {Boolean}
     * @member enabled
     * @memberOf module:errors
     */
    module.autoscroll_enabled = true;

    /**
     * Requirement error
     * @param {string} message error message
     * @class RequirementError
     */
    module.RequirementError = function(message) {
       this.message = message;
       this.name = "RequirementError";
    };

    module.RequirementError.prototype = Object.create(Error.prototype);

    /**
     * DOM selector for errors
     * @member el
     * @memberOf module:errors
     */
    module.el = '.errors';

    /**
     * Current instances
     * @member instances
     * @memberOf module:errors
     */
    module.instances = [];

    /**
     * Register an error
     * @param  {object} el dom element
     * @function register
     * @memberOf module:selectors
     * @return {object}    selector instance
     */
    module.register = function(el){

        var $el = $(el);
        module.instances.push($el);
        return $el;

    };

    /**
     * Highlight errors on the page for the user
     */
    module.highlight = function(){

        // if there's at least one error, scroll to the first one
        if(module.instances.length){

            var first_error = module.instances[0];
            var top = first_error.position().top;
            if(module.enabled){
                TEKT.scrolling.scrollTo(top, 1000, 'swing');  
            }
        }

    };

    /**
     * Initialize any current errors
     * @return {array} Instances of errors
     */
    module.init = function(){

        var errors = $(module.el);
        _.each(errors, module.register);

        // highlight any errors on the page for the user
        module.highlight();

        return errors;

    };

    // on domready initialize
    $(document).ready(module.init);

    return module;

}(TEKT.errors || {}));
