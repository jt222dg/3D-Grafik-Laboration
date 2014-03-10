define(function(require) {
  
  var _    = require('underscore');
  var Base = require('webgl/controller/base');
  
  var LabTwo = function() {
    
  };
  
  _.extend(LabTwo.prototype, Base.prototype);
  
  LabTwo.prototype.onInit = function(canvasHandler) {
    var ctx     = canvasHandler.getContext();
    var program = canvasHandler.getProgram();
    Base.prototype.onInit();
  };
  
  LabTwo.prototype.onRender = function(canvasHandler, delta) {
    console.log("lab two render.");
  };
  
  return LabTwo;
});