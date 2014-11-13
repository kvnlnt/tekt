ARK.pages = (function(module){
    
    /**
     * Initialize module
     * @function ARK.pages.init
     * @memberOf module:menu
     */
    var init = function(){};

    // boot file
    $(document).on('ready', init);

    // export
    return {
        init:init,
    };

})(ARK.pages || {});