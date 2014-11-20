/**
* Proxy to underscore templates
* @function ARK.Template
* @version 1.0
*/
ARK.Template = function(source, data) {

    var jst      = ARK.JST[source];
    var template = _.template(jst);
    var compiled = template(data);

    return compiled;

};