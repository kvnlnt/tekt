/**
* Cards module
* @module cards
* @version 1.0
*/
TEKT.cards = (function(module){

    /* exports cards */

    /**
     * Dom elements
     * @member el
     * @memberOf module:cards
     */
    module.el = '.card';

    /**
     * Collection of instantiated cards
     * @member instances
     * @memberOf module:cards
     */
    module.instances = [];

    /**
     * Register a card
     * @param  {object} el dom element
     * @function register
     * @memberOf module:cards
     * @return {object}    selector instance
     */
    module.register = function(el){

        var $el = $(el);

        // config selector
        var config = {};
            config.el = $el;

        // create selector
        var card = new TEKT.Card(config);

        // add to collection
        module.instances.push(card);

        return card;

    };

    /**
     * Initialize cards
     * @function init
     * @memberOf module:cards
     * @return {array} array card els to be registered
     */
    module.init = function() {

        var cards = $(module.el);
        _.each(cards, module.register);
        TEKT.fx.sequence(cards, 'animated fadeIn', 200);

        return cards;

    };

    module.init();

    return module;

}(TEKT.cards || {}));
