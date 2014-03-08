define(function(require) {
  
  // Required modules
  var $ = require('jquery');
  var fsScript = require('text!shader/fragment-shader.fs');
  var vsScript = require('text!shader/vertex-shader.vs');
  
  var CanvasHandler = function() {
    this._canvas         = undefined;
    this._ctx            = undefined;
    this._vertexShader   = undefined;
    this._fragmentShader = undefined;
    this._program        = undefined;
  };
  
  CanvasHandler.prototype.onInit = function() {
    
    this._canvas = $('#canvas').get(0);
    if (this._canvas !== undefined) {
      
      // Set canvas width and height to css width and height
      this._canvas.width  = Math.round(this._canvas.offsetWidth);
      this._canvas.height = Math.round(this._canvas.offsetHeight);
      
      try {
        this._ctx = this._canvas.getContext("webgl");
      } catch (e) {
        console.log('A WebGL context could not be initialised:', e);
        return null;
      }
      
      this._ctx.viewport(0.0, 0.0, this._canvas.width, this._canvas.height);
      this._ctx.clearColor(0.0, 0.0, 0.0, 1.0);
      
      // Create shaders
      this._vertexShader = this._ctx.createShader(this._ctx.VERTEX_SHADER);
      this._ctx.shaderSource(this._vertexShader, vsScript);
      this._ctx.compileShader(this._vertexShader);
      
      this._fragmentShader = this._ctx.createShader(this._ctx.FRAGMENT_SHADER);
      this._ctx.shaderSource(this._fragmentShader, fsScript);
      this._ctx.compileShader(this._fragmentShader);
      
      // Link program with shaders
      this._program = this._ctx.createProgram();
      this._ctx.attachShader(this._program, this._vertexShader);
      this._ctx.attachShader(this._program, this._fragmentShader);
      this._ctx.linkProgram(this._program);
    }
    
  };
  
  CanvasHandler.prototype.clearScreen = function() {
    if (this._ctx !== undefined) {
      this._ctx.clear(this._ctx.COLOR_BUFFER_BIT | this._ctx.DEPTH_BUFFER_BIT);
    }
  };
  
  CanvasHandler.prototype.getAttribLocation = function(name) {
    return this._ctx.getAttribLocation(this._program, name);
  };
  
  CanvasHandler.prototype.getUniformLocation = function(name) {
    return this._ctx.getUniformLocation(this._program, name);
  };
  
  return CanvasHandler;
  
});