define(function(require) {
  
  var _    = require('underscore');
  var Base = require('webgl/controller/base');
  
  var LabOne = function() {
    
  };
  
  _.extend(LabOne.prototype, Base.prototype);
  
  LabOne.prototype.onInit = function() {
    Base.prototype.onInit();
  };
  
  LabOne.prototype.onRender = function(canvasHandler, delta) {
    console.log("lab one render.");
  };
  
  return LabOne;
});