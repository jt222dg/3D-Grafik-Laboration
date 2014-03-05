define([], function () {
    'use strict';
    var happytime = {};
 
    happytime.requestAnimFrame = (function(){
        return  window.requestAnimationFrame       ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame    ||
                function( callback ){
                    window.setTimeout(callback, 1000 / 60);
                };
    })();
 
    var requestAnimFrame = happytime.requestAnimFrame;
 
    happytime.requestTimeout = function(fn, delay) {
        if (!window.requestAnimationFrame       &&
            !window.webkitRequestAnimationFrame &&
            !window.mozRequestAnimationFrame    &&
            !window.oRequestAnimationFrame      &&
            !window.msRequestAnimationFrame) {
            return window.setTimeout(fn, delay);
        }
 
        var start = new Date().getTime(),
            handle = {};
 
        function loop(){
            var current = new Date().getTime(),
            delta = current - start;
            if (delta >= delay) {
                fn.call();
            } else {
                handle.value = requestAnimFrame(loop);
            }
        }
 
        handle.value = requestAnimFrame(loop);
        return handle;
    };
 
    happytime.clearRequestTimeout = function(handle) {
        if (window.cancelAnimationFrame) {
            return window.cancelAnimationFrame(handle.value);
        }
        if (window.webkitCancelRequestAnimationFrame) {
            return window.webkitCancelRequestAnimationFrame(handle.value);
        }
        if (window.mozCancelRequestAnimationFrame) {
            return window.mozCancelRequestAnimationFrame(handle.value);
        }
        if (window.oCancelRequestAnimationFrame) {
            return window.oCancelRequestAnimationFrame(handle.value);
        }
        if (window.msCancelRequestAnimationFrame) {
            return window.msCancelRequestAnimationFrame(handle.value);
        }
        return clearTimeout(handle);
    };
 
    happytime.requestInterval = function(fn, delay) {
        if (!window.requestAnimationFrame       &&
            !window.webkitRequestAnimationFrame &&
            !window.mozRequestAnimationFrame    &&
            !window.oRequestAnimationFrame      &&
            !window.msRequestAnimationFrame) {
            return window.setInterval(fn, delay);
        }
 
        var start = new Date().getTime(),
        handle = {};
 
        function loop() {
            var current = new Date().getTime(),
            delta = current - start;
 
            if(delta >= delay) {
                fn.call();
                start = new Date().getTime();
            }
 
            handle.value = requestAnimFrame(loop);
        }
 
        handle.value = requestAnimFrame(loop);
        return handle;
    };
 
    happytime.clearRequestInterval = function(handle) {
        if (window.cancelAnimationFrame) {
            return window.cancelAnimationFrame(handle.value);
        }
        if (window.webkitCancelRequestAnimationFrame) {
            return window.webkitCancelRequestAnimationFrame(handle.value);
        }
        if (window.mozCancelRequestAnimationFrame) {
            return window.mozCancelRequestAnimationFrame(handle.value);
        }
        if (window.oCancelRequestAnimationFrame) {
            return window.oCancelRequestAnimationFrame(handle.value);
        }
        if (window.msCancelRequestAnimationFrame) {
            return window.msCancelRequestAnimationFrame(handle.value);
        }
        return clearInterval(handle);
    };
 
    return happytime;
});