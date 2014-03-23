define(function(require) {
  
  var Matrix = require('utility/glmatrix');
  
  var Camera = {
    modelViewMatrix  : Matrix.mat4.create(),
    projectionMatrix : Matrix.mat4.create(),
    
    setMatrixUniforms : function(context) {
      var gl = context.gl;
      var uniforms = context.handles.uniform;
      
      gl.uniformMatrix4fv(uniforms.modelViewMatrix, false, this.modelViewMatrix);
      gl.uniformMatrix4fv(uniforms.projectionMatrix, false, this.projectionMatrix);
      
      var normalMatrix = Matrix.mat3.create();
      normalMatrix = Matrix.mat3.normalFromMat4(normalMatrix, this.modelViewMatrix);
      gl.uniformMatrix3fv(uniforms.normalMatrix, false, normalMatrix);
    },
    
    setViewport : function(gl) {
      gl.viewport(0.0, 0.0, gl.viewportWidth, gl.viewportHeight);
    },
    
    setPerspective : function(gl) {
      Matrix.mat4.perspective(this.projectionMatrix, 45, gl.viewportWidth / gl.viewportHeight, 0.1, 100.0);
    },
    
    resetMvMatrix : function() {
      Matrix.mat4.identity(this.modelViewMatrix);
    },
    
    translate : function(vector) {
      Matrix.mat4.translate(this.modelViewMatrix, this.modelViewMatrix, vector);
    },
    
    rotate : function(rad, axis) {
      Matrix.mat4.rotate(this.modelViewMatrix, this.modelViewMatrix, rad, axis);
    },
    
    scale : function(vector) {
      Matrix.mat4.scale(this.modelViewMatrix, this.modelViewMatrix, vector);
    }
  };
  
  return Camera;
  
});