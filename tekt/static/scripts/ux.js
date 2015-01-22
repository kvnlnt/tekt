/**
* Cards module
* @module ux
* @version 1.0
*/
TEKT.ux = (function(module){

    /* exports ux */

    /**
     * Dom elements
     * @member el
     * @memberOf module:ux
     */
    module.el = {};
    module.el.showhide = '.tekt-ux-showhide';

    /**
     * Show hide target
     * @param  {object} e jquery event
     * @return {object}   element
     */
    module.showhide = function(e){

        var target = $(this).attr('tekt-target');
        var $target = $('[tekt-id='+target+']');
        $target.toggleClass('display-hidden');
        return this;

    };

    /**
     * Initialize ux
     * @function init
     * @memberOf module:ux
     */
    module.init = function() {

        module.el.$showhide = $(module.el.showhide);
        module.el.$showhide.on('click', module.showhide);

    };

    $(document).ready(module.init);

    return module;

}(TEKT.ux || {}));
