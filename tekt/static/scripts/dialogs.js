// /**
// * Cards module
// * @module dialogs
// * @version 1.0
// */
// TEKT.dialogs = (function(module){

//     /* exports dialogs */

//     /**
//      * Dom elements
//      * @member el
//      * @memberOf module:dialogs
//      */
//     module.directive = 'tekt-dialog';

//     /**
//      * Collection of instantiated dialogs
//      * @member instances
//      * @memberOf module:dialogs
//      */
//     module.instances = [];

//     /**
//      * Register a dialog
//      * @param  {object} el dom element
//      * @function register
//      * @memberOf module:dialogs
//      * @return {object}    selector instance
//      */
//     module.register = function(el){

//         var $el = $(el);
//         var directive = $el.attr(module.directive).split('|');

//         // config selector
//         var config = {};
//             config.el = $el;
//             config.type = directive[0];
//             config.options = JSON.parse(directive[1]);

//         // create selector
//         var dialog = new TEKT.Dialog(config);

//         // // add to collection
//         module.instances.push(dialog);

//         return dialog;

//     };

//     /**
//      * Initialize dialogs
//      * @function init
//      * @memberOf module:dialogs
//      * @return {array} array dialog els to be registered
//      */
//     module.init = function() {

//         var dialogs = $('['+module.directive+']');
//         _.each(dialogs, module.register);

//         return dialogs;

//     };

//     $(document).ready(module.init);

//     return module;

// }(TEKT.dialogs || {}));
