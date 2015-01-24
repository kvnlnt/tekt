/**
* Layouts module
* @module layouts
* @version 1.0
*/
TEKT.layouts = (function(module) {

    /* exports layouts */

    /**
     * Current instances
     * @member instances
     * @memberOf module:layouts
     */
    module.instances = [];

    /**
     * HTML directive
     * @member directive
     * @memberOf module:directive
     */
    module.directive = '.template';

    /**
     * Layout type configs
     * @member  type
     * @memberof module:layouts
     */
    module.type = {
        main:{
            regions:{
                left_column:{
                    name:'left_column',
                    selector:'.cols > .col:eq(0)',
                    collapsible:true,
                    collapse_on:'MENU:TOGGLE',
                    collapse_key:'menu-toggle'
                },
                right_column:{
                    name:'right_column',
                    selector:'.cols > .col:eq(1)'
                }
            },
        },
        splash:{
            regions:{
                container:{
                    name:'body',
                    selector:'.body'
                }
            }
        },
        focused:{}
    };

    /**
     * Register a layout
     * @param  {object} el dom element
     * @function register
     * @memberOf module:layouts
     * @return {object}    layout instance
     */
    module.register = function(el){

        var $el = $(el);
        var type = module.type[$el.attr(TEKT.DIRECTIVE.TYPE)];
        var regions = void 0 === type.regions ? [] : type.regions;

        // config layout
        var config = {};
            config.el = $el;
            config.regions = regions;

        // create layout
        var layout = new TEKT.Layout(config);

        // add to collection
        module.instances.push(layout);

        return layout;

    };

    /**
     * Initialize layouts
     * @function init
     * @memberOf module:layouts
     * @return {array} array of layouts to be registered
     */
    module.init = function() {

        var layouts = $(module.directive);
        _.each(layouts, module.register);

        return layouts;

    };

    // on domready initialize
    $(document).ready(module.init);

    return module;

}(TEKT.layouts || {}));
