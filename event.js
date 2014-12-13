var callbacks = {};

function on(eventName, callback){
    var previosCallback = callbacks[eventName];
    callbacks[eventName] = function(){
        if(previosCallback){
            previosCallback();
        }
        callback();
    }

};

function trigger(eventName){
    callbacks[eventName]();
}

module.exports = {
    on: on,
    trigger: trigger
}