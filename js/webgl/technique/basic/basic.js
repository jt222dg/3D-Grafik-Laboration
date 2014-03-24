define(function(require) {
  
  // Required modules
  var $ = require('jquery');
  var Context = require('webgl/context');
  
  var BasicTechnique = {
    
    locations : {
      uniform : {
        modelViewMatrix  : undefined,
        projectionMatrix : undefined,
        textureSampler   : undefined,
      },
      
      attrib : {
        position     : undefined,
        textureCoord : undefined
      }
    },
    
    onInit : function(vsScript, fsScript) {

      Context.initProgram(vsScript, fsScript);
      this.initHandles();
    },
    
    useProgram : function() {
      var gl = this.gl;
      gl.useProgram(this.program);
    },
    
    initLocations : function() {
      var gl      = this.gl;
      var program = this.program;
      
      this.locations.uniform.modelViewMatrix = gl.getUniformLocation(program, 'modelViewMatrix');
      this.locations.uniform.projectionMatrix = gl.getUniformLocation(program, 'projectionMatrix');
      this.locations.uniform.textureSampler = gl.getUniformLocation(program, 'textureSampler');
      
      this.locations.attrib.position = gl.getAttribLocation(program, 'position');
      gl.enableVertexAttribArray(this.locations.attrib.position);
      
      this.locations.attrib.textureCoord = gl.getAttribLocation(program, 'textureCoord');
      gl.enableVertexAttribArray(this.locations.attrib.textureCoord);
    }
    
  };
  
  return BasicTechnique;
  
});