define(function(require) {
  
  var DirectionalLight = function() {
    this._ambient = [1.0, 0.5, 0.5];
  };

  DirectionalLight.prototype.setUniforms = function(context) {
    var gl = context.gl;
    var uniforms = context.handles.uniform;
    
    gl.uniform3f(uniforms.directionalLight.ambient, this._ambient[0], this._ambient[1], this._ambient[2]);
  };
  
  return DirectionalLight;
  
});