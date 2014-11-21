/**
* Load and compile underscore template
* @function ARK.Template
* @version 1.0
*/
ARK.Template = function(source, data) {

    var template = _.template(source);
    var compiled = template(data);

    return compiled;
}