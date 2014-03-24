define(function(require) {
  
  var DirectionalLight = function() {
    this._ambient   = [0.25, 0.25, 0.25];
    this._diffuse   = [1.0,  1.0,  1.0];
    this._direction = [0.5,  1.0,  0.0];
  };

  DirectionalLight.prototype.setUniforms = function(gl, technique) {
    var uniforms = technique.location.uniform;
    
    gl.uniform3f(uniforms.directionalLight.ambient, this._ambient[0], this._ambient[1], this._ambient[2]);
    gl.uniform3f(uniforms.directionalLight.diffuse, this._diffuse[0], this._diffuse[1], this._diffuse[2]);
    gl.uniform3f(uniforms.directionalLight.direction, this._direction[0], this._direction[1], this._direction[2]);
  };
  
  DirectionalLight.prototype.setAmbient = function(vector) {
    this._ambient = vector;
  };
  
  DirectionalLight.prototype.setDiffuse = function(vector) {
    this._diffuse = vector;
  };
  
  DirectionalLight.prototype.setDirection = function(vector) {
    this._direction = vector;
  };
  
  return DirectionalLight;
  
});