define(function(require) {
  
  var $             = require('jquery');
  var _             = require('underscore');
  var Base          = require('webgl/controller/base');
  var Camera        = require('webgl/camera');
  var Matrix        = require('utility/glmatrix');
  var DirectionalLight = require('light/directional');
  var PhongTechnique = require('technique/phong/phong');
  
  // Models
  var CubeModel = require('model/cube');
  
  var LabOne = function() {

    this._directionalLight = new DirectionalLight();
    this._directionalLight.setAmbient([0.5, 0.5, 0.5]);
    
    this._a = 0.75;
    this._b = 1.0;
    this._c = 1.0;
    this._directionalLight.setDiffuse([this._a, this._b, this._c]);
    
    this._goCrazy = false;
    
    $('<div class="center-div" id="crazy-div"><button id="crazy-button">Go Crazy</button></div>').insertAfter('#canvas');
    
    var that = this;
    $('#crazy-button').click(function() {
      that._goCrazy = !that._goCrazy;
      
      if (that._goCrazy) {
        $('#crazy-button').html('STOP!');
      } else {
        $('#crazy-button').html('Go Crazy');
      }
    });
    
  };
  
  _.extend(LabOne.prototype, Base.prototype);
  
  LabOne.prototype.onInit = function(context) {
    
    PhongTechnique.onInit(context);
    
  };
  
  LabOne.prototype.onLogic = function(delta) {
    
    this._a = Math.random() * 1.0;
    this._b = Math.random() * 1.0;
    this._c = Math.random() * 1.0;
    
  };
  
  LabOne.prototype.onRender = function(context, delta) {
    
    Camera.resetMvMatrix();
    
    Camera.translate([0.0, 0.0, -7.0]);
    Camera.rotate(Matrix.glMatrix.toRadian(30), [1, 1, 1]);
    
    context.gl.uniform1f(PhongTechnique.location.uniform.textureScale, 1.0);
    
    if (this._goCrazy) {
      this._directionalLight.setDiffuse([this._a, this._b, this._c]);
      this._directionalLight.setAmbient([this._b, this._c, this._a]);
      this._directionalLight.setDirection([this._c, this._a, this._b]);
    } else {
      this._directionalLight.setAmbient([0.45, 0.45, 0.45]);
      this._directionalLight.setDiffuse([1.0, 1.0, 1.0]);
      this._directionalLight.setDirection([0.5, 1.0, 0.0]);
    }
    
    this._directionalLight.setUniforms(context.gl, PhongTechnique);
    
    Camera.setMatrixUniforms(context.gl, PhongTechnique);
    CubeModel.draw(context.gl, PhongTechnique);
    
  };
  
  LabOne.prototype.onCleanUp = function() {
    $('#crazy-div').remove();
  };
  
  return LabOne;
  
});