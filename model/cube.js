define(function(require) {
  
  var Cube = {
    texture : undefined,
    
    draw : function(gl, technique) {
      if (this.texture.isLoaded) {
        var buffers = this.buffers;
        var attrib = technique.location.attrib;
        var uniform = technique.location.uniform;
        
        gl.bindBuffer(gl.ARRAY_BUFFER, buffers.textureCoords.id);
        gl.vertexAttribPointer(attrib.textureCoord, buffers.textureCoords.itemSize, gl.FLOAT, false, 0, 0);
        
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, this.texture);
        gl.uniform1i(uniform.textureSampler, 0);
          
        gl.bindBuffer(gl.ARRAY_BUFFER , buffers.vertexPositions.id);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.vertexIndicies.id);
        gl.vertexAttribPointer(attrib.position, buffers.vertexPositions.itemSize, gl.FLOAT, false, 0, 0);
        
        gl.bindBuffer(gl.ARRAY_BUFFER, buffers.vertexNormals.id);
        gl.vertexAttribPointer(attrib.normal, buffers.vertexNormals.itemSize, gl.FLOAT, false, 0, 0);
        
        gl.drawElements(gl.TRIANGLES, buffers.vertexIndicies.numItems, gl.UNSIGNED_SHORT, 0);
      }
    },
    
    buffers : {
      vertexPositions : {
        
        id : undefined,
        dataType   : 'float',
        bufferType : 'array',
        
        data : [
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
        
        itemSize : 3,
        numItems : 0
      },
      
      vertexNormals : {
        
        id : undefined,
        dataType   : 'float',
        bufferType : 'array',
        
        data : [
          // Front face
           0.0,  0.0,  1.0,
           0.0,  0.0,  1.0,
           0.0,  0.0,  1.0,
           0.0,  0.0,  1.0,
    
          // Back face
           0.0,  0.0, -1.0,
           0.0,  0.0, -1.0,
           0.0,  0.0, -1.0,
           0.0,  0.0, -1.0,
    
          // Top face
           0.0,  1.0,  0.0,
           0.0,  1.0,  0.0,
           0.0,  1.0,  0.0,
           0.0,  1.0,  0.0,
    
          // Bottom face
           0.0, -1.0,  0.0,
           0.0, -1.0,  0.0,
           0.0, -1.0,  0.0,
           0.0, -1.0,  0.0,
    
          // Right face
           1.0,  0.0,  0.0,
           1.0,  0.0,  0.0,
           1.0,  0.0,  0.0,
           1.0,  0.0,  0.0,
    
          // Left face
          -1.0,  0.0,  0.0,
          -1.0,  0.0,  0.0,
          -1.0,  0.0,  0.0,
          -1.0,  0.0,  0.0
        ],
        
        itemSize : 3,
        numItems : 0
      },
      
      textureCoords : {
        
        id : undefined,
        dataType   : 'float',
        bufferType : 'array',
        
        data : [
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
      },
      
      vertexIndicies : {
        
        id : undefined,
        dataType   : 'int',
        bufferType : 'element',
        
        data : [
           0,  1,  2,    0,  2,  3, // Front face
           4,  5,  6,    4,  6,  7, // Back face
           8,  9, 10,    8, 10, 11, // Top face
          12, 13, 14,   12, 14, 15, // Bottom face
          16, 17, 18,   16, 18, 19, // Right face
          20, 21, 22,   20, 22, 23  // Left face
        ],
              
        itemSize : 1,
        numItems : 0
      },
    }
  };

  Cube.buffers.vertexNormals.numItems   = Math.floor(Cube.buffers.vertexNormals.data.length   / Cube.buffers.vertexNormals.itemSize);
  Cube.buffers.vertexPositions.numItems = Math.floor(Cube.buffers.vertexPositions.data.length / Cube.buffers.vertexPositions.itemSize);
  Cube.buffers.vertexIndicies.numItems  = Math.floor(Cube.buffers.vertexIndicies.data.length  / Cube.buffers.vertexIndicies.itemSize);
  Cube.buffers.textureCoords.numItems   = Math.floor(Cube.buffers.textureCoords.data.length   / Cube.buffers.textureCoords.itemSize);
  
  return Cube;
  
});