define(function(require) {
  
  var Matrix = require('utility/glmatrix');
  
  var Camera = {
    movementMatrix : Matrix.mat4.create(),
    
    setMatrixUniforms : function(context) {
      var gl = context.gl;
      
      gl.uniformMatrix4fv(context.handles.uniform.matrix, false, this.movementMatrix);
    }
  };
  
  return Camera;
  
});