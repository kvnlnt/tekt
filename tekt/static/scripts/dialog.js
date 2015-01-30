// /**
//  * The Dialog class provides typeahead ajax support for various selectors in TEKT. 
//  * @summary Typeahead / AJAX selector 
//  * @param  {object} config           
//  * @param  {string} config.el        jquery element of object
//  * @param  {string} config.type      type of dialog
//  * @return {object}                  selector function instance
//  * @class Dialog
//  */
// TEKT.Dialog = function(config){

//     // default settings
//     var that     = this;
//     var defaults = {  el:null, };

//     // settings
//     this.settings = _.assign(defaults, config);
//     this.el       = this.settings.el;
//     this.type     = this.settings.type;
//     this.options  = this.settings.options;

//     // required settings
//     if(null === this.el){ throw new TEKT.errors.RequirementError('el is required'); }
//     if(null === this.type){ throw new TEKT.errors.RequirementError('type is required'); }

//     /**
//      * Getter
//      * @param  {string} key element key
//      * @function Dialog.get
//      * @return {object} whatever object exists
//      */
//     this.get = function(key) {
//         return this.settings[key];
//     };

//     /**
//      * Setter
//      * @param  {string} key element key
//      * @param  {object} val value being set
//      * @function Dialog.set
//      * @return {object} whatever object exists
//      */
//     this.set = function(key, val) {
//         this.settings[key] = val;
//         return this.get(key);
//     };


//     /**
//      * Show prompt
//      * @return {object} vex object
//      */
//     this.delete_prompt = function(){

//         var that = this;

//         // delete callback function
//         var callback = function(value){
//             var commit_delete = value === 'DELETE';
//             if(commit_delete){
//                 var url = that.get('el').attr('href');
//                 window.location.href = url;
//             }
//             return commit_delete;
//         };

//         // use config options for vex
//         var options = {
//             message: this.options.message,
//             placeholder: 'Type DELETE to confirm',
//             callback: callback
//         };

//         // return and run vex prompt
//         return vex.dialog.prompt(options);

//     };

//     /**
//      * Initialize selector
//      * @function Dialog.init
//      */
//     this.init = function(){

//         vex.defaultOptions.className = 'vex-theme-wireframe';

//         // get element
//         var el = this.get('el');
//         var that = this;
//         switch(this.type){
//             case 'delete-prompt':
//                 el.on('click', function(e){
//                     e.preventDefault();
//                     that.delete_prompt();
//                 });
//                 break;
//         }

//     };

//     this.init();

//     return this;

// };
