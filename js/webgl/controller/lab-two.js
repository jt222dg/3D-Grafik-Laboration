define(function(require) {
  
  var _             = require('underscore');
  var Base          = require('webgl/controller/base');
  var Camera        = require('webgl/camera');
  var Matrix        = require('utility/glmatrix');
  var DirectionalLight = require('light/directional');
  var PhongTechnique = require('technique/phong/phong');
  
  // Models
  var CubeModel = require('model/cube');
  
  var LabTwo = function() {
    
    this._directionalLight = new DirectionalLight();
    this._directionalLight.setAmbient([0.4, 0.4, 0.4]);
    
    this._textureScale = 1.0;
    this._textureIsRepeating = false;
    
    var buttons = '<button id="repeat-texture-button">Repeat Texture</button>';
    
    $('<div class="center-div" id="alternatives-div">' + buttons + '</div>').insertAfter('#canvas');
    
    var that = this;
    $('#repeat-texture-button').click(function() {
      that._textureIsRepeating = !that._textureIsRepeating;
      
      if (that._textureIsRepeating) {
        that._textureScale = 2.0;
        $('#repeat-texture-button').html('Single Texture');
      } else {
        that._textureScale = 1.0;
        $('#repeat-texture-button').html('Repeating Texture');
      }
    });
  };
  
  _.extend(LabTwo.prototype, Base.prototype);
  
  LabTwo.prototype.onInit = function(context) {
    
    PhongTechnique.onInit(context);
    
  };
  
  LabTwo.prototype.onLogic = function(delta) {
    
  };
  
  LabTwo.prototype.onRender = function(context, delta) {
    
    Camera.resetMvMatrix();
    
    Camera.translate([0.0, 0.0, -4.0]);
    Camera.rotate(Matrix.glMatrix.toRadian(60), [1, 1, 1]);
    
    context.gl.uniform1f(PhongTechnique.location.uniform.textureScale, this._textureScale);
    
    this._directionalLight.setUniforms(context.gl, PhongTechnique);
    Camera.setMatrixUniforms(context.gl, PhongTechnique);
    CubeModel.draw(context.gl, PhongTechnique);
    
  };
  
  LabTwo.prototype.onCleanUp = function() {
    $('#alternatives-div').remove();
  };
  
  return LabTwo;
  
});