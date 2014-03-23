define(function(require) {
  
  var DirectionalLight = function() {
    this._ambient   = [0.25, 0.25, 0.25];
    this._diffuse   = [1.0,  1.0,  1.0];
    this._direction = [0.5,  1.0,  0.0];
  };

  DirectionalLight.prototype.setUniforms = function(context) {
    var gl = context.gl;
    var uniforms = context.handles.uniform;
    
    gl.uniform3f(uniforms.directionalLight.ambient, this._ambient[0], this._ambient[1], this._ambient[2]);
    gl.uniform3f(uniforms.directionalLight.diffuse, this._diffuse[0], this._diffuse[1], this._diffuse[2]);
    gl.uniform3f(uniforms.directionalLight.direction, this._direction[0], this._direction[1], this._direction[2]);
  };
  
  return DirectionalLight;
  
});