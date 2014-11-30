// ARK.forms = (function(module){

//     var DOM = {};

//     module.errors = function(error, element){

//         var errors = $("#errors");
//         errors.append(error);

//     };

//     module.submit = function(form, e){

//         // stop form submission
//         e.preventDefault();
//         e.stopPropagation();

//         // ajax settings
//         var submit = {
//           type: $(form).attr('method'),
//           url: $(form).attr('action'),
//           data: $(form).serializeJSON(), 
//           context: this,
//           success: module.submit_success,
//           error: module.submit_error
//         };

//         // ajax request
//         $.ajax(submit);
        

//     };

//     module.submit_success = function(response, status, xhr){

//         ARK.messenger(response);
//         this.currentForm.reset();

//     };

//     module.submit_error = function(response, status, xhr){

//         var errors = response.responseJSON.errors;
//         this.showErrors(errors); 

//     };

//     module.register_form = function(form){

//         // setup validation
//         $(form).validate({
//             onsubmit:true,
//             onfocusout:false,
//             submitHandler:module.submit,
//             validClass:"validField",
//             errorPlacement:module.errors,
//             errorLabelContainer:'#errors',
//         });

//     };

//     module.init = function(){

//         DOM.forms = _.map($('form'), function(v, k){ return v; });
//         _.each(DOM.forms, module.register_form);

//     };

//     $(document).on('ready', module.init);

//     return module;

// })(ARK.forms || {});