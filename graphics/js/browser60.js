  /* Helper stuff to make life easier */
var _callbacks = {};

function exec(funcName) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    var callback = null, ret = false;
    if (args.length > 0) {
        callback = args[args.length - 1];
        if (callback instanceof Function) {
            args.pop();
        }
        else {
            callback = null;
        }
    }
    
    if (window.external &&
        window.external[funcName] &&
        window.external[funcName] instanceof Function) {
        ret = window.external[funcName](args[0], args[1]);
    }
    // register callback if present
    if (callback !== null) {
        _callbacks[ret] = callback;
    }
    return ret;
}

window.OnAsyncCallback = function (asyncID, result) {
    var callback = _callbacks[asyncID];
    if (callback instanceof Function) {
        callback.call(this, decodeURIComponent(result));
    }
};

/* Actual Logic here: */
exec('GetLocalPropertyAsync', 'itemlist', function(itemId) {
  external.AttachVideoItem1(itemId);
  exec('SetLocalPropertyAsync1', 'prop:Browser60fps', '1'); // Enable browser60fps
});