define(function(require) {
  
  var _    = require('underscore');
  var Base = require('webgl/controller/base');
  
  var LabThree = function() {
    
  };
  
  _.extend(LabThree.prototype, Base.prototype);
  
  LabThree.prototype.onInit = function() {
    Base.prototype.onInit();
  };
  
  LabThree.prototype.onRender = function(canvasHandler, delta) {
    console.log("lab three render.");
  };
  
  return LabThree;
});