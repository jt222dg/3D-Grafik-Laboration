define(function(require) {
  
  var Cube = {
    name : "Cube",
    
    buffers : {
      vertex : undefined,
      faces  : undefined,
      color  : undefined
    },
    
    createBuffers : function(gl) {
      this.buffers.vertex = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.vertex);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertexPositions.buffer), gl.STATIC_DRAW);
    
      this.buffers.faces = gl.createBuffer();
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.buffers.faces);
      gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.vertexPositions.faces), gl.STATIC_DRAW);
    
      this.buffers.color = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.color);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertexColors.buffer), gl.STATIC_DRAW);
    },
    
    draw : function(context) {
      var gl = context.gl;
      
      gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.color);
      gl.vertexAttribPointer(context.handles.attrib.color, this.vertexColors.itemSize, gl.FLOAT, false, 0, 0);
      
      gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.vertex);
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.buffers.faces);
      gl.vertexAttribPointer(context.handles.attrib.position, this.vertexPositions.itemSize, gl.FLOAT, false, 0, 0);
      
      gl.drawElements(gl.TRIANGLES, this.vertexPositions.numItems, gl.UNSIGNED_SHORT, 0);
    },
    
    vertexPositions : {
      buffer : [
        // front
       -0.5, -0.5, 0.0,
        0.5, -0.5, 0.0,
       -0.5,  0.5, 0.0,
        0.5,  0.5, 0.0
      ],
      
      faces : [
        0, 1, 2,
        1, 2, 3
      ],
      
      itemSize : 3,
      numItems : 0
    },
    
    vertexColors : {
      buffer : [
        1.0, 0.5, 0.5, 1.0,
        0.5, 0.5, 1.0, 1.0,
        0.5, 1.0, 0.5, 1.0,
        1.0, 0.5, 0.5, 1.0
      ],
      
      itemSize : 4,
      numItems : 0
    }
  };

  Cube.vertexPositions.numItems = Cube.vertexPositions.faces.length;
  Cube.vertexColors.numItems = Math.floor(Cube.vertexColors.buffer.length / Cube.vertexColors.itemSize);
  
  console.log(Cube.vertexColors.numItems);
  
  return Cube;
  
});