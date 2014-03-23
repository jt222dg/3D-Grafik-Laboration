define(function(require) {
  
  var _             = require('underscore');
  var Base          = require('webgl/controller/base');
  var Camera        = require('webgl/camera');
  var Matrix        = require('utility/glmatrix');
  var TextureLoader = require('loader/texture');
  var DirectionalLight = require('light/directional');
  
  // Models
  var CubeModel = require('model/cube');
  
  var LabOne = function() {
    
    this._rotationVelocity = 100.0;
    this._cubeRotation = 0.0;
    this._directionalLight = new DirectionalLight();
    
  };
  
  _.extend(LabOne.prototype, Base.prototype);
  
  LabOne.prototype.onInit = function(context) {
    var gl = context.gl;
    
    var buffers = CubeModel.buffers;
    for (var key in buffers) {
      context.bindBuffer(buffers[key]);
    }
    
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
    Camera.scale([0.5, 0.5, 0.5]);
    
    Camera.setMatrixUniforms(context);
    CubeModel.draw(context, Camera);
    
    Camera.resetMvMatrix();
    
    Camera.translate([1.0, 0.0, -8.0]);
    Camera.rotate(Matrix.glMatrix.toRadian(-this._cubeRotation), [1, 0, 0]);
    Camera.rotate(Matrix.glMatrix.toRadian(20), [0, 1, 0]);
    
    this._directionalLight.setUniforms(context);
    Camera.setMatrixUniforms(context);
    CubeModel.draw(context, Camera);
    
  };
  
  return LabOne;
  
});