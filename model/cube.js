define(function(require) {
  
  var Cube = {
    name : "Cube",
    
    texture : undefined,
    
    buffers : {
      vertex       : undefined,
      index        : undefined,
      textureCoord : undefined
    },
    
    createBuffers : function(gl) {
      this.buffers.vertex = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.vertex);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertexPositions.buffer), gl.STATIC_DRAW);
    
      this.buffers.index = gl.createBuffer();
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.buffers.index);
      gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.vertexIndicies.buffer), gl.STATIC_DRAW);
      
      this.buffers.textureCoord = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.textureCoord);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.textureCoords.buffer), gl.STATIC_DRAW);
    },
    
    draw : function(context) {
      
      if (Cube.texture.image === undefined || Cube.texture.image === null) {
        return;
      }
      
      var gl = context.gl;
      
      gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.textureCoord);
      gl.vertexAttribPointer(context.handles.attrib.textureCoord, this.textureCoords.itemSize, gl.FLOAT, false, 0, 0);
      
      
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, Cube.texture);
      gl.uniform1i(context.handles.uniform.textureSampler, 0);
        
      gl.bindBuffer(gl.ARRAY_BUFFER , this.buffers.vertex);
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.buffers.index);
      gl.vertexAttribPointer(context.handles.attrib.position, this.vertexPositions.itemSize, gl.FLOAT, false, 0, 0);
      
      gl.drawElements(gl.TRIANGLES, this.vertexIndicies.numItems, gl.UNSIGNED_SHORT, 0);
    },
    
    vertexPositions : {
      buffer : [
        // Front face
        -1.0, -1.0,  1.0,
         1.0, -1.0,  1.0,
         1.0,  1.0,  1.0,
        -1.0,  1.0,  1.0,

        // Back face
        -1.0, -1.0, -1.0,
        -1.0,  1.0, -1.0,
         1.0,  1.0, -1.0,
         1.0, -1.0, -1.0,

        // Top face
        -1.0,  1.0, -1.0,
        -1.0,  1.0,  1.0,
         1.0,  1.0,  1.0,
         1.0,  1.0, -1.0,

        // Bottom face
        -1.0, -1.0, -1.0,
         1.0, -1.0, -1.0,
         1.0, -1.0,  1.0,
        -1.0, -1.0,  1.0,

        // Right face
         1.0, -1.0, -1.0,
         1.0,  1.0, -1.0,
         1.0,  1.0,  1.0,
         1.0, -1.0,  1.0,

        // Left face
        -1.0, -1.0, -1.0,
        -1.0, -1.0,  1.0,
        -1.0,  1.0,  1.0,
        -1.0,  1.0, -1.0
      ],
        //[
       //-1.0,  1.0,  1.0, // 0 left  top    front
       //-1.0, -1.0,  1.0, // 1 left  bottom front
        //1.0,  1.0,  1.0, // 2 right top    front
        //1.0, -1.0,  1.0, // 3 right bottom front
     //-1.0,  1.0, -1.0, // 4 left  top    back
     //-1.0, -1.0, -1.0, // 5 left  bottom back
     // 1.0,  1.0, -1.0, // 6 right top    back
     // 1.0, -1.0, -1.0  // 7 right bottom back
      //],
      
      itemSize : 3,
      numItems : 0
    },
    
    vertexIndicies : {
      buffer : [
        0, 1, 2,      0, 2, 3,    // Front face
        4, 5, 6,      4, 6, 7,    // Back face
        8, 9, 10,     8, 10, 11,  // Top face
        12, 13, 14,   12, 14, 15, // Bottom face
        16, 17, 18,   16, 18, 19, // Right face
        20, 21, 22,   20, 22, 23  // Left face
      ],
        //[
        //0, 1, 2,  1, 2, 3, // Front
      //4, 5, 6,  5, 6, 7, // Back
      //0, 1, 4,  1, 4, 5, // Left
      //2, 3, 6,  3, 6, 7, // Right
      //0, 2, 4,  2, 4, 6, // Top
      //1, 3, 5,  3, 5, 7  // Bottom
      //],
            
      itemSize : 1,
      numItems : 0
    },
    
    textureCoords : {
      buffer : [
        // Front face
        0.0, 0.0,
        1.0, 0.0,
        1.0, 1.0,
        0.0, 1.0,
  
        // Back face
        1.0, 0.0,
        1.0, 1.0,
        0.0, 1.0,
        0.0, 0.0,
  
        // Top face
        0.0, 1.0,
        0.0, 0.0,
        1.0, 0.0,
        1.0, 1.0,
  
        // Bottom face
        1.0, 1.0,
        0.0, 1.0,
        0.0, 0.0,
        1.0, 0.0,
  
        // Right face
        1.0, 0.0,
        1.0, 1.0,
        0.0, 1.0,
        0.0, 0.0,
  
        // Left face
        0.0, 0.0,
        1.0, 0.0,
        1.0, 1.0,
        0.0, 1.0
      ],
      
      itemSize : 2,
      numItems : 0
    }
  };

  Cube.vertexIndicies.numItems = Cube.vertexIndicies.buffer.length;
  Cube.vertexPositions.numItems = Cube.vertexPositions.buffer.length;
  Cube.textureCoords.numItems = Math.floor(Cube.textureCoords.buffer.length / Cube.textureCoords.itemSize);
  
  return Cube;
  
});