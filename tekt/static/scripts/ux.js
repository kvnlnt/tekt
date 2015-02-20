/**
* Cards module
* @module ux
* @version 1.0
*/
TEKT.ux = (function(module){

    /* exports ux */

    /**
     * Collection of instantiated ux elements
     * @member instances
     * @memberOf module:cards
     */
    module.instances = [];

    /**
     * Dom elements
     * @member el
     * @memberOf module:ux
     */
    module.el = {};
    module.el.showhide_attr = TEKT.DIRECTIVE.SHOWHIDE;
    module.el.showhide = '['+module.el.showhide_attr+']';
    module.el.disable_attr = TEKT.DIRECTIVE.DISABLE;
    module.el.disable = '['+module.el.disable_attr+']';

    /**
     * Show hide target
     * @param  {object} e jquery event
     * @return {object}   element
     */
    module.showhide = function(e){

        var target = $(e.target).attr(module.el.showhide_attr);
        var $target = $('[tekt-id='+target+']');
        $target.toggleClass('view-hidden');
        return this;

    };

    /**
     * disable target
     * @param  {object} e jquery event
     * @return {object}   element
     */
    module.disable = function(e){

        var target  = $(e.target).attr(module.el.disable_attr);
        var $target = $('[tekt-id='+target+']');
        $target.toggleClass('disabled');
        var inputs  = $target.find('input');

        inputs.each(function(){
            var is_disabled = $(this).prop('disabled');
            if(is_disabled){
                $(this).prop("disabled", false);
            } else {
                $(this).prop("disabled", true);
            }
        });

        return this;

    };

    /**
     * Initialize ux
     * @function init
     * @memberOf module:ux
     */
    module.init = function() {

        module.el.$showhide = $(module.el.showhide);
        module.el.$showhide.on('click', module.showhide.bind(this));
        module.instances.push(module.el.$showhide);
        module.el.$disable = $(module.el.disable);
        module.el.$disable.on('click', module.disable.bind(this));
        module.instances.push(module.el.$disable);

    };

    $(document).ready(module.init);

    return module;

}(TEKT.ux || {}));
