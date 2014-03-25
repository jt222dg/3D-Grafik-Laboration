console.log("System: WebGL Application loading...");

define(function(require) {
  
  // Required modules
  var $                  = require('jquery');
  var Raf                = require('utility/raf');
  var Context            = require('webgl/context');
  var BaseController     = require('webgl/controller/base');
  var LabOneController   = require('webgl/controller/lab-one');
  var LabTwoController   = require('webgl/controller/lab-two');
  var LabThreeController = require('webgl/controller/lab-three');
  var CubeModel          = require('model/cube');
  var TextureLoader      = require('loader/texture');
  var Camera             = require('webgl/camera');
  var PhongTechnique     = require('technique/phong/phong');
  var EffectTechnique    = require('technique/effect/effect');
  
  var App = function() {
  };
  
  App.prototype.onInit = function() {
    this._running = true;
    
    Context.onInit();
    PhongTechnique.onInit(Context);
    EffectTechnique.onInit(Context);
    
    this.initBuffers();
    
    CubeModel.texture = TextureLoader.loadTexture(Context.gl, 'texture/crate.gif');
    
    Camera.setPerspective(Context.gl);
    
    this._controller = new BaseController();
    this._controller.onInit();
    
    var that = this;
    $('#lab-one-button').click(function() {
      that._controller.onCleanUp();
      that._controller = new LabOneController();
      that._controller.onInit(Context);
    });
    
    $('#lab-two-button').click(function() {
      that._controller.onCleanUp();
      that._controller = new LabTwoController();
      that._controller.onInit(Context);
    });
    
    $('#lab-three-button').click(function() {
      that._controller.onCleanUp();
      that._controller = new LabThreeController();
      that._controller.onInit(Context);
    });
  };
  
  App.prototype.initBuffers = function() {
    for (var key in CubeModel.buffers) {
      Context.initBuffer(CubeModel.buffers[key]);
    }
  };
  
  App.prototype.onCleanUp = function() {
    this._controller = undefined;
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
      
      that._controller.onLogic(delta);
      Context.clearScreen();
      that._controller.onRender(Context, delta);
          
    })();
    
  };
    
  return App;
  
});