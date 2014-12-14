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
    if(callbacks[eventName]){
        callbacks[eventName]();
    }
}

function end(eventName) {
    if (callbacks[eventName]) {
        delete callbacks[eventName];
    }
}

module.exports = {
    on: on,
    trigger: trigger,
    end: end
};