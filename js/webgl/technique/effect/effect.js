define(function(require) {
  
  // Required modules
  var $ = require('jquery');
  var vsScript = require('text!webgl/technique/effect/vertex.vs');
  var fsScript = require('text!webgl/technique/effect/fragment.fs');
  
  var PhongTechinque = {
    
    program : undefined,
    
    mode : {
      inverted          : false,
      greyscale         : false,
      gaussianBlur      : false,
      texcoordsAsColors : false,
      renderOdds        : false
    },
    
    location : {
      uniform : {
        modelViewMatrix  : undefined,
        projectionMatrix : undefined,
        normalMatrix     : undefined,
        textureSampler   : undefined,
        textureScale     : undefined,
        
        directionalLight : {
          ambient   : undefined,
          diffuse   : undefined,
          direction : undefined
        },
        
        mode : {
          inverted : undefined,
          greyscale : undefined
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
    
    useProgram : function(gl) {
      gl.useProgram(this.program);
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
      
      uniform.mode.inverted = gl.getUniformLocation(program, 'mode.inverted');
      uniform.mode.greyscale = gl.getUniformLocation(program, 'mode.greyscale');
      uniform.mode.texcoordsAsColors = gl.getUniformLocation(program, 'mode.texcoordsAsColors');
      
      uniform.directionalLight.ambient = gl.getUniformLocation(program, 'directionalLight.ambient');
      uniform.directionalLight.diffuse = gl.getUniformLocation(program, 'directionalLight.diffuse');
      uniform.directionalLight.direction = gl.getUniformLocation(program, 'directionalLight.direction');
      
      attrib.position = gl.getAttribLocation(program, 'position');
      gl.enableVertexAttribArray(attrib.position);
      
      attrib.normal = gl.getAttribLocation(program, 'normal');
      gl.enableVertexAttribArray(attrib.normal);
      
      attrib.textureCoord = gl.getAttribLocation(program, 'textureCoord');
      gl.enableVertexAttribArray(attrib.textureCoord);
      
    },
    
    toggleInverted : function(gl) {
      this.mode.inverted = !this.mode.inverted;
      gl.uniform1i(this.location.uniform.mode.inverted, this.mode.inverted);
    },
    
    toggleGreyscale : function(gl) {
      this.mode.greyscale = !this.mode.greyscale;
      gl.uniform1i(this.location.uniform.mode.greyscale, this.mode.greyscale);
    },
    
    toggleTexcoordsAsColors : function(gl) {
      this.mode.texcoordsAsColors = !this.mode.texcoordsAsColors;
      gl.uniform1i(this.location.uniform.mode.texcoordsAsColors, this.mode.texcoordsAsColors);
    }
  };
  
  return PhongTechinque;
  
});