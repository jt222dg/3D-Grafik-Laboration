define(function(require) {
  
  // Required modules
  var $ = require('jquery');
                 
  var CanvasHandler = function() {
    this.canvas = undefined;
    this.ctx    = undefined;
    this.onInit();
  };
  
  CanvasHandler.prototype.onInit = function() {
    this.canvas = $('#canvas').get(0);
    if (this.canvas !== undefined) {
      
      // Set canvas width to css width and rescale canvas height to give the canvas the scale 4:2 width:height
      this.canvas.width  = Math.round(this.canvas.offsetWidth);
      this.canvas.height = Math.round(this.canvas.width / 2);
      
      this.ctx = this.canvas.getContext("2d");
    }
  };
  
  CanvasHandler.prototype.grayScreen = function() {
    if (this.ctx !== undefined) {
      this.ctx.save();
      
      // Use identity matrix to fill the screen
      this.ctx.setTransform(1,0,0,1,0,0);
      this.ctx.fillStyle = "rgba(150,150,150,0.75)";
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      
      this.ctx.restore();
    }
  };
  
  CanvasHandler.prototype.clearScreen = function() {
    if (this.ctx !== undefined) {
      this.ctx.save();
      
      // Use identity matrix while clearing the screen
      this.ctx.setTransform(1,0,0,1,0,0);
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      
      this.ctx.restore();
    }
  };
  
  return CanvasHandler;
  
});