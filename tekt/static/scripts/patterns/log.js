/**
* Log action
* @function ARK.Log
* @version 1.0
*/
ARK.Log = function() {

    if(console){
        console.log.apply(console, arguments);
    }

};