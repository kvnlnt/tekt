/**
* Proxy to confirm prompts
* @function ARK.Prompt
* @version 1.0
*/
ARK.Log = function() {

    if(console){
        console.log.apply(console, arguments);
    }

};