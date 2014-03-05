define(function(require) {
  
  // Required modules
  var $                = require('jquery');
  
  var Raf              = require('utility/raf');
  var CanvasHandler    = require('game/canvas-handler');
  var Basecontroller   = require('game/controller/base');
  var LabOneController = require('game/controller/lab-one');
  var LabOneController = require('game/controller/lab-two');
  
  var Game = function() {
  };
  
  Game.prototype.onInit = function() {
    
    this._running       = true;
    
    this._canvasHandler = new CanvasHandler();
    this._controller    = new BaseController();
    this._controller.onInit();
    
  };
  
  Game.prototype.onCleanUp = function() {

    this._canvasHandler = undefined;
    this._controller    = undefined;
    
  };
  
  Game.prototype.onLoop = function() {
    
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
    
  return Game;
  
});