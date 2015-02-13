/**
* Masks module
* @module masks
* @version 1.0
*/
TEKT.masks = (function(module) {

    /* exports masks */

    /**
     * Current instances
     * @member instances
     * @memberOf module:masks
     */
    module.instances = [];

    /**
     * HTML directive
     * @member directive
     * @memberOf module:directive
     */
    module.directive_attr = TEKT.DIRECTIVE.MASK;
    module.directive = '['+module.directive_attr+']';

    /**
     * Mask type configs
     * @member  TYPES
     * @memberof module:masks
     */
    module.TYPES = {
        datetime:{
            maskex:[
                { mask:'MM',   regex:/([0-9]{2})/ },
                { mask:'/',    regex:/(\/)/, autocomplete:true },
                { mask:'DD',   regex:/([0-9]{2})/ },
                { mask:'/',    regex:/(\/)/, autocomplete:true  },
                { mask:'YYYY', regex:/([0-9]{4})/},
                { mask:' ',    regex:/(\s)/, autocomplete:true  },
                { mask:'HH',   regex:/([0-9]{2})/ },
                { mask:':',    regex:/(:)/, autocomplete:true  },
                { mask:'MM',   regex:/([0-9]{2})/ },
                { mask:'aa',   regex:/(am|pm)/ },
            ]
        }
    };

    /**
     * Register a mask
     * @param  {object} el dom element
     * @function register
     * @memberOf module:masks
     * @return {object}    mask instance
     */
    module.register = function(el){

        var $el = $(el);
        var type = module.TYPES[$el.attr(module.directive_attr)];

        // config mask
        var config = {};
            config.el = $el;
            config.maskex = type.maskex;
            config.hint_container = $el.next('label').find('.hint');

        // create mask
        var mask = new TEKT.Mask(config);

        // add to collection
        module.instances.push(mask);

        return mask;

    };

    /**
     * Initialize masks
     * @function init
     * @memberOf module:masks
     * @return {array} array of masks to be registered
     */
    module.init = function() {

        var masks = $(module.directive);
        _.each(masks, module.register);

        return masks;

    };

    // on domready initialize
    $(document).ready(module.init);

    return module;

}(TEKT.masks || {}));
