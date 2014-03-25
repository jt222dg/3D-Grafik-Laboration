define(function(require) {
  
  var _                = require('underscore');
  var Base             = require('webgl/controller/base');
  var Camera           = require('webgl/camera');
  var Matrix           = require('utility/glmatrix');
  var DirectionalLight = require('light/directional');
  var EffectTechnique  = require('technique/effect/effect');
  
  // Models
  var CubeModel = require('model/cube');
  
  var LabTwo = function() {
    
    this._directionalLight = new DirectionalLight();
    this._directionalLight.setAmbient([0.4, 0.4, 0.4]);
    
    this._textureScale = 1.0;
    this._textureIsRepeating = false;
    
  };
  
  _.extend(LabTwo.prototype, Base.prototype);
  
  LabTwo.prototype.onInit = function(context) {
    
    EffectTechnique.useProgram(context.gl);
    
    var buttons = '<li><button id="repeat-texture-button">Repeat Texture</button></li>';
    buttons += '<li><button id="inverted-button">Inverted</button></li>';
    buttons += '<li><button id="greyscale-button">Greyscale</button></li>';
    buttons += '<li><button id="texture-as-color-button">Texture As Colo</button></li>';
    
    $('<div class="center-div" id="alternatives-div"><ul>' + buttons + '</ul></div>').insertAfter('#canvas');
    
    var that = this;
    $('#repeat-texture-button').click(function() {
      that._textureIsRepeating = !that._textureIsRepeating;
      
      if (that._textureIsRepeating) {
        that._textureScale = 2.0;
        $('#repeat-texture-button').html('Single Texture');
      } else {
        that._textureScale = 1.0;
        $('#repeat-texture-button').html('Repeate Texture');
      }
    });
    
    $('#inverted-button').click(function() {
      EffectTechnique.toggleInverted(context.gl);
      
      if (EffectTechnique.mode.inverted) {
        $('#inverted-button').html('Revert');
      } else {
        $('#inverted-button').html('Invert');
      }
    });
    
    $('#texture-as-color-button').click(function() {
      EffectTechnique.toggleTexcoordsAsColors(context.gl);
      
      if (EffectTechnique.mode.texcoordsAsColors) {
        $('#texture-as-color-button').html('RGB As Color ');
      } else {
        $('#texture-as-color-button').html('Texture Coords As Color');
      }
    });

    $('#greyscale-button').click(function() {
      EffectTechnique.toggleGreyscale(context.gl);
      
      if (EffectTechnique.mode.greyscale) {
        $('#greyscale-button').html('Color');
      } else {
        $('#greyscale-button').html('Greyscale');
      }
    });
    
  };
  
  LabTwo.prototype.onLogic = function(delta) {
    
  };
  
  LabTwo.prototype.onRender = function(context, delta) {
    
    Camera.resetMvMatrix();
    
    Camera.translate([0.0, 0.0, -4.0]);
    Camera.rotate(Matrix.glMatrix.toRadian(60), [1, 1, 1]);
    
    context.gl.uniform1f(EffectTechnique.location.uniform.textureScale, this._textureScale);
    
    this._directionalLight.setUniforms(context.gl, EffectTechnique);
    Camera.setMatrixUniforms(context.gl, EffectTechnique);
    CubeModel.draw(context.gl, EffectTechnique);
    
  };
  
  LabTwo.prototype.onCleanUp = function() {
    $('#alternatives-div').remove();
  };
  
  return LabTwo;
  
});