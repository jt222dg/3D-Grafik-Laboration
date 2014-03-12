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
    var gl = context.gl;
    
    CubeModel.createBuffers(gl);
    Camera.setPerspective(gl);
    
    Base.prototype.onInit();
  };
  
  LabOne.prototype.onRender = function(context, delta) {
    
    
    Camera.resetMvMatrix();
    
    Camera.translate([-1.5, 0.0, -7.0]);
    Camera.rotate(-1.0, [1, 1, 1]);
    
    Camera.setMatrixUniforms(context);
    CubeModel.draw(context, Camera);
    
  };
  
  return LabOne;
  
});