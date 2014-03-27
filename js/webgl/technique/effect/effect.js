define(function(require) {
  
  // Required modules
  var $ = require('jquery');
  var vsScript = require('text!webgl/technique/effect/vertex.vs');
  var fsScript = require('text!webgl/technique/effect/fragment.fs');
  
  var EffectTechinque = {
    
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
      uniform.mode.gaussianBlur = gl.getUniformLocation(program, 'mode.gaussianBlur');
      uniform.mode.renderOdds = gl.getUniformLocation(program, 'mode.renderOdds');
      
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
    
    quad : {
      id          : undefined,
      framebuffer : undefined,
      
      texture : {
        color : undefined,
        depth : undefined
      },
      
      data : {
        vertecies : [
        // Vertecies         UV coords   Normals          Tex coords
          -1.0,  1.0, 0.0,   0.0, 1.0,   0.0, 0.0, 1.0,   1.0, 0.0, 0.0, // Top left
          -1.0, -1.0, 0.0,   0.0, 0.0,   0.0, 0.0, 1.0,   1.0, 0.0, 0.0, // Bottom left
           1.0, -1.0, 0.0,   1.0, 0.0,   0.0, 0.0, 1.0,   1.0, 0.0, 0.0, // Bottom right
           1.0,  1.0, 0.0,   1.0, 1.0,   0.0, 0.0, 1.0,   1.0, 0.0, 0.0  // Top right
        ]
      }
    },
    
    initScreenAlignedFullscreenBillboard : function(gl) {
      this.quad.id = gl.createBuffer();
      
      gl.bindBuffer(gl.ARRAY_BUFFER, this.quad.id);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.quad.data.vertecies), gl.STATIC_DRAW);
    },
    
    initFrameBuffer : function(gl, size) {
      
      // Create a color texture
      this.quad.texture.color = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, this.quad.texture.color);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, size, size, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
      
      // Create a depth texture
      this.quad.texture.depth = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, this.quad.texture.depth);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      
      // Z-buffer (not RGBA)
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.DEPTH_COMPONENT, size, size, 0, gl.DEPTH_COMPONENT, gl.UNSIGNED_SHORT, null);
      
      this.quad.framebuffer = gl.createFramebuffer();
      gl.bindFramebuffer(gl.FRAMEBUFFER, this.quad.framebuffer);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHEMENT0, gl.TEXTURE_2D, this.quad.texture.color, 0);
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.DEPTH_ATTACHEMENT, gl.TEXTURE_2D, this.quad.texture.depth, 0);
      
      if (gl.checkFramebufferStatus(gl.FRAMEBUFFER) !== gl.FRAMEBUFFER_COMPLETE) {
        console.log("framebuffer incomplete!");
      }
      
      // Set normal buffer as render target
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
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
    },
    
    toggleGaussianBlur : function(gl) {
      this.mode.gaussianBlur = !this.mode.gaussianBlur;
      gl.uniform1i(this.location.uniform.mode.gaussianBlur, this.mode.gaussianBlur);
    },
    
    toggleRenderOdds : function(gl) {
      this.mode.renderOdds = !this.mode.renderOdds;
      gl.uniform1i(this.location.uniform.mode.renderOdds, this.mode.renderOdds);
    }
    
  };
  
  return EffectTechinque;
  
});