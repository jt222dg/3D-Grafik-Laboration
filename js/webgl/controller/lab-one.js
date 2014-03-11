define(function(require) {
  
  var _      = require('underscore');
  var Base   = require('webgl/controller/base');
  var Camera = require('webgl/camera');
  
  // Models
  var CubeModel = require('model/cube');
  
  var LabOne = function() {
    
  };
  
  _.extend(LabOne.prototype, Base.prototype);
  
  LabOne.prototype.onInit = function(context) {
    var gl      = context.gl;
    
    CubeModel.createBuffers(gl);
    
    Base.prototype.onInit();
  };
  
  LabOne.prototype.onRender = function(context, delta) {
    
    Camera.setMatrixUniforms(context);
    CubeModel.draw(context);
    
  };
  
  return LabOne;
  
});