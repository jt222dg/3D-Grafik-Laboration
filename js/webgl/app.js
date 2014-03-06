console.log("System: WebGL Application loading...");

define(function(require) {
  
  // Required modules
  var $                = require('jquery');
  
  var Raf              = require('utility/raf');
  var CanvasHandler    = require('webgl/canvas-handler');
  var BaseController   = require('webgl/controller/base');
  var LabOneController = require('webgl/controller/lab-one');
  var LabTwoController = require('webgl/controller/lab-two');
  
  var App = function() {
  };
  
  App.prototype.onInit = function() {
    this._running = true;
    
    this._canvasHandler = new CanvasHandler();
    this._canvasHandler.onInit();
    
    this._controller = new BaseController();
    this._controller.onInit();
    
    $('#lab-one-button').click(function() {
        console.log("button one clicked");
    });
    
    $('#lab-two-button').click(function() {
        console.log("button two clicked");
    });
  };
  
  App.prototype.onCleanUp = function() {

    this._canvasHandler = undefined;
    this._controller    = undefined;
    
  };
  
  App.prototype.onLoop = function() {
    
    var startTime = Date.now();
    var endTime   = startTime;
    var delta     = 0.0;
    
    var that = this;
    (function loop(){
      
      if (that._running) {  
        that._requestId = Raf.requestAnimFrame.call(window, loop);
      }
      
      startTime = Date.now();
      delta     = (startTime - endTime) / 1000;
      delta     = delta < 0.016 ? delta : 0.016;
      endTime   = startTime;

      that._canvasHandler.clearScreen();
      that._controller.onRender(delta);
          
    })();
    
  };
    
  return App;
  
});