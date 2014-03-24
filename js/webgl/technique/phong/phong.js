define(function(require) {
  
  // Required modules
  var $ = require('jquery');
  var vsScript = require('text!webgl/technique/phong/vertex.vs');
  var fsScript = require('text!webgl/technique/phong/fragment.fs');
  
  var PhongTechinque = {
    
    program : undefined,
    gl : undefined,
    
    location : {
      uniform : {
        modelViewMatrix  : undefined,
        projectionMatrix : undefined,
        normalMatrix     : undefined,
        textureSampler   : undefined,
        textureScale     : undefined,
        directionalLight : {
          ambient : undefined,
          diffuse : undefined,
          direction : undefined
        }
      },
      
      attrib : {
        position     : undefined,
        normal       : undefined,
        textureCoord : undefined
      }
    },
    
    onInit : function(context) {
      this.program = context.createProgram(vsScript, fsScript);
      this.initLocations(context.gl);
    },
    
    initLocations : function(gl) {
      
      var program = this.program;
      var attrib = this.location.attrib;
      var uniform = this.location.uniform;
      
      uniform.modelViewMatrix = gl.getUniformLocation(program, 'modelViewMatrix');
      uniform.projectionMatrix = gl.getUniformLocation(program, 'projectionMatrix');
      uniform.normalMatrix = gl.getUniformLocation(program, 'normalMatrix');
      uniform.textureSampler = gl.getUniformLocation(program, 'textureSampler');
      uniform.textureScale = gl.getUniformLocation(program, 'textureScale');
      
      uniform.directionalLight.ambient = gl.getUniformLocation(program, 'directionalLight.ambient');
      uniform.directionalLight.diffuse = gl.getUniformLocation(program, 'directionalLight.diffuse');
      uniform.directionalLight.direction = gl.getUniformLocation(program, 'directionalLight.direction');
      
      attrib.position = gl.getAttribLocation(program, 'position');
      gl.enableVertexAttribArray(attrib.position);
      
      attrib.normal = gl.getAttribLocation(program, 'normal');
      gl.enableVertexAttribArray(attrib.normal);
      
      attrib.textureCoord = gl.getAttribLocation(program, 'textureCoord');
      gl.enableVertexAttribArray(attrib.textureCoord);
      
    }
  };
  
  return PhongTechinque;
  
});