define(function(require) {
  
  var _             = require('underscore');
  var Base          = require('webgl/controller/base');
  var Camera        = require('webgl/camera');
  var Matrix        = require('utility/glmatrix');
  var TextureLoader = require('loader/texture');
  
  // Models
  var CubeModel = require('model/cube');
  
  var LabOne = function() {
    
    this._rotationVelocity = 100.0;
    this._cubeRotation = 0.0;
    
  };
  
  _.extend(LabOne.prototype, Base.prototype);
  
  LabOne.prototype.onInit = function(context) {
    var gl = context.gl;
    
    CubeModel.createBuffers(gl);
    Camera.setPerspective(gl);
    CubeModel.texture = TextureLoader.loadTexture(gl, 'texture/crate.gif');
    
    Base.prototype.onInit();
  };
  
  LabOne.prototype.onLogic = function(delta) {
    
    this._cubeRotation += (delta * this._rotationVelocity);
    if (this._cubeRotation > 360.0) {
      this._cubeRotation = 0.0;
    }
    
  };
  
  LabOne.prototype.onRender = function(context, delta) {
    
    Camera.resetMvMatrix();
    
    Camera.translate([-1.5, 0.0, -7.0]);
    Camera.rotate(Matrix.glMatrix.toRadian(this._cubeRotation), [1, 1, 1]);
    
    Camera.setMatrixUniforms(context);
    CubeModel.draw(context, Camera);
    
  };
  
  return LabOne;
  
});