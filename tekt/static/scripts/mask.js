/**
 * The Mask class provides typeahead ajax support for various selectors in TEKT. 
 * @summary Typeahead / AJAX selector 
 * @param  {object} config           
 * @param  {object} config.el        jquery element of object
 * @param  {array}  config.maskex    array of {mask, regex patterns and validations}
 * @param  {object} config.hint      jquery element for hinting
 * @return {object}                  mask function instance
 * @class Mask
 */
TEKT.Mask = function(config){

    // default settings
    var that     = this;
    var defaults = { el:null, maskex:null, hint_container:null, last_index:0 };

    // settings
    this.settings = _.assign(defaults, config);

    // required settings
    if(null === this.settings.el){ throw new TEKT.errors.RequirementError('el is required'); }
    if(null === this.settings.maskex){ throw new TEKT.errors.RequirementError('maskex is required'); }
    if(null === this.settings.hint_container){ throw new TEKT.errors.RequirementError('hint_container is required'); }

    /**
     * Getter
     * @param  {string} key element key
     * @function Mask.get
     * @return {object} whatever object exists
     */
    this.get = function(key) {
        return this.settings[key];
    };

    /**
     * Get concatenated string of mask
     * @function Mask.get_mask
     * @return {string} mask string
     */
    this.get_mask = function(){
        return _.map(this.get('maskex'), function(m){ return m.mask }).join('');
    };

    /**
     * Get hint
     * @param  {string} mask  string of mask
     * @param  {string} match string of match
     * @function Mask.get_hint
     * @return {string} hint
     */
    this.get_hint = function(match){
        var mask = this.get_mask();
        return mask.length === match.length ? '' : '<span class="praise">' + match + '</span>' + mask.substr(match.length, mask.length);
    };

    /**
     * Setter
     * @param  {string} key element key
     * @param  {object} val value being set
     * @function Mask.set
     * @return {object} whatever object exists
     */
    this.set = function(key, val) {
        this.settings[key] = val;
        return this.get(key);
    };

    /**
     * Match as many groups as possible and return matching string
     * @param {string}  input               string to be matched
     * @param {array}   maskex              array of maskexes
     * @param {string}  maskex.mask         group string
     * @param {object}  maskex.regex        group regex
     * @param {number}  regex_index         index of maskex group being evaluted
     * @param {string}  matching_string     concatenated string of matches
     * @function Mask.match
     * @return {string} string of matched groups
     */
    this.match = function(input, maskex, regex_index, matching_string){ 

        var matching_string = matching_string || '';
        var regex_index     = regex_index || 1;
        var regex_string    = _.map(maskex.slice(0, regex_index), function(mask){ return mask.regex.source; }).join('');
        var regex           = new RegExp(regex_string);
        var regex_test      = new RegExp('^'+regex_string).test(input);

        // if group test failed or all groups have been evaluated, return aggregated string
        if(false === regex_test || regex_index > maskex.length + 1){
            this.set('last_index', regex_index-1);
            return matching_string;
        } else {
            regex_index += 1;
            var matches = regex.exec(input);
            matching_string = matches[0];

            // recursive return
            return this.match(input, maskex, regex_index, matching_string);
        }

    };

    /**
     * Autcomplete maskex group chars set to autocomplete
     * @param  {number} keyCode number of keyCode entered
     * @return {object}         instance
     */
    this.autocomplete = function(keyCode){

        // jump out if out of bounds
        if(this.get('last_index') > this.get('maskex').length){
            return this;
        }

        // autocomplete automation
        var input                           = this.get('el').val();
        var next_is_autocompleted           = void 0 !== this.get('maskex')[this.get('last_index')].autocomplete;
        var is_delete_key                   = keyCode === 8 || keyCode === 46;
        var character_entered               = String.fromCharCode(keyCode);
        var next_character                  = this.get('maskex')[this.get('last_index')].mask;
        var key_is_autocomplete_character   = character_entered === next_character;

        // do autcompletion
        if(
            true  === next_is_autocompleted && 
            false === is_delete_key && 
            false === key_is_autocomplete_character
        ){
            this.get('el').val(input + next_character);
        }

        return this;

    };

    /**
     * Input event
     * @param {object} e jquery event
     * @return {object} instance
     */
    this.on_input = function(e){

        var input = this.get('el').val();
        var match = this.match(input, this.get('maskex'));
        var hint  = this.get_hint(match);
        
        // if has text input and hint is new
        if(input.length){
            this.get('hint_container').html(hint);
        } else {
            this.get('hint_container').html('');
        };

        // try autcomplete
        this.autocomplete(e.keyCode);

        return this;

    };

    /**
     * Initialize selector
     * @function Mask.init
     */
    this.init = function(){

        this.get('el').on('keypress keyup change', this.on_input.bind(this));

    };

    this.init();

    return this;

};
