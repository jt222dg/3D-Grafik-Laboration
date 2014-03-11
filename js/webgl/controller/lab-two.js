define(function(require) {
  
  var _    = require('underscore');
  var Base = require('webgl/controller/base');
  
  var LabTwo = function() {
    
  };
  
  _.extend(LabTwo.prototype, Base.prototype);
  
  LabTwo.prototype.onInit = function(context) {
    var gl      = context.gl;
    var program = context.program;
    Base.prototype.onInit();
  };
  
  LabTwo.prototype.onRender = function(context, delta) {
  };
  
  return LabTwo;
});