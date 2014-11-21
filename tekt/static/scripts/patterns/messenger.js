/**
* Communicate message to user
* @function ARK.Messenger
* @version 1.0
*/
ARK.Messenger = function() {

    if(console){
        console.log.apply(console, arguments);
    }

};