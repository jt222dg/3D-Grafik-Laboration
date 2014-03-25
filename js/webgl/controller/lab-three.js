define(function(require) {
  
  var _             = require('underscore');
  var Base          = require('webgl/controller/base');
  var Camera        = require('webgl/camera');
  var Matrix        = require('utility/glmatrix');
  var DirectionalLight = require('light/directional');
  var PhongTechnique = require('technique/phong/phong');
  
  // Models
  var CubeModel = require('model/cube');
  
  var LabThree = function() {
    
    this._rotationVelocity = 100.0;
    this._cubeRotation = 0.0;
    this._directionalLight = new DirectionalLight();
    
  };
  
  _.extend(LabThree.prototype, Base.prototype);
  
  LabThree.prototype.onInit = function(context) {
    
    PhongTechnique.useProgram(context.gl);
    
  };
  
  LabThree.prototype.onLogic = function(delta) {
    
    this._cubeRotation += (delta * this._rotationVelocity);
    if (this._cubeRotation > 360.0) {
      this._cubeRotation = 0.0;
    }
    
  };
  
  LabThree.prototype.onRender = function(context, delta) {
    
    Camera.resetMvMatrix();
    
    Camera.translate([-1.5, 0.0, -7.0]);
    Camera.rotate(Matrix.glMatrix.toRadian(this._cubeRotation), [1, 1, 1]);
    Camera.scale([0.5, 0.5, 0.5]);
    
    this._directionalLight.setUniforms(context.gl, PhongTechnique);
    Camera.setMatrixUniforms(context.gl, PhongTechnique);
    CubeModel.draw(context.gl, PhongTechnique);
    
    Camera.resetMvMatrix();
    
    Camera.translate([1.0, 0.0, -8.0]);
    Camera.rotate(Matrix.glMatrix.toRadian(-this._cubeRotation), [1, 0, 0]);
    Camera.rotate(Matrix.glMatrix.toRadian(20), [0, 1, 0]);
    
    this._directionalLight.setUniforms(context.gl, PhongTechnique);
    Camera.setMatrixUniforms(context.gl, PhongTechnique);
    CubeModel.draw(context.gl, PhongTechnique);
    
  };
  
  LabThree.prototype.onCleanUp = function() {
    
  };
  
  return LabThree;
  
});