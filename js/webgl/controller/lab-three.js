define(function(require) {
  
  var _    = require('underscore');
  var Base = require('webgl/controller/base');
  
  var LabThree = function() {
    
  };
  
  _.extend(LabThree.prototype, Base.prototype);
  
  LabThree.prototype.onInit = function(context) {
    var gl      = context.gl;
    var program = context.program;
    Base.prototype.onInit();
  };
  
  LabThree.prototype.onRender = function(context, delta) {
  };
  
  return LabThree;
});