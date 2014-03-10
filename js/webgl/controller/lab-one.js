define(function(require) {
  
  var _      = require('underscore');
  var Base   = require('webgl/controller/base');
  var Matrix = require('utility/matrix');
  
  // Models
  var CubeModel = require('model/cube');
  
  var LabOne = function() {
    
  };
  
  _.extend(LabOne.prototype, Base.prototype);
  
  LabOne.prototype.onInit = function(canvasHandler) {
    var gl      = canvasHandler.getContext();
    var program = canvasHandler.getProgram();
    
    this._matrix = gl.getUniformLocation(program, 'matrix');
    
    this._triangleBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this._triangleBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(CubeModel.vertexPositions.buffer), gl.STATIC_DRAW);
    
    this._triangleFacesBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._triangleFacesBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(CubeModel.vertexPositions.faces), gl.STATIC_DRAW);

    this._positionHandle = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(this._positionHandle);
    
    // Send positions once since they are static (for now)
    gl.vertexAttribPointer(this._positionHandle, CubeModel.vertexPositions.itemSize, gl.FLOAT, false, 0, 0);
    
    this._colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this._colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(CubeModel.vertexColors.buffer), gl.STATIC_DRAW);
    
    this._colorHandle = gl.getAttribLocation(program, 'color');
    gl.enableVertexAttribArray(this._colorHandle);
    
    // Send positions once since they are static (for now)
    gl.vertexAttribPointer(this._colorHandle, CubeModel.vertexColors.itemSize, gl.FLOAT, false, 0, 0);
    
    this._movementMatrix = [
      1.0, 0.0, 0.0, 0.0,
      0.0, 1.0, 0.0, 0.0,
      0.0, 0.0, 1.0, 0.0,
      0.0, 0.0, 0.0, 1.0
    ];//Matrix.getIdentityMatrix();
    
    Base.prototype.onInit();
  };
  
  LabOne.prototype.onRender = function(canvasHandler, delta) {
    console.log("lab one render.");
    
    var gl = canvasHandler.getContext();
    
    // Pass in mat4 movementMatrix as matrix to shaders
    gl.uniformMatrix4fv(this._matrix, false, this._movementMatrix);
    
    // Pass in square vertex positions and colors
    gl.bindBuffer(gl.ARRAY_BUFFER, this._colorBuffer);
    gl.bindBuffer(gl.ARRAY_BUFFER, this._triangleBuffer);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this._triangleFacesBuffer);
    gl.drawElements(gl.TRIANGLES, CubeModel.vertexPositions.numItems, gl.UNSIGNED_SHORT, 0);
  };
  
  return LabOne;
});