/**
* Proxy to underscore templates
* @function ARK.Template
* @version 1.0
*/
ARK.Template = function(view) {

    var source   = $(view.template).html();
    var template = _.template(source);
    var compiled = template(view.model.toJSON());

    return compiled;

};