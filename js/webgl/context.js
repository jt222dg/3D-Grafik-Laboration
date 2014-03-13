define(function(require) {
  
  // Required modules
  var $ = require('jquery');
  
  var Context = {
    
    gl      : undefined,
    program : undefined,
    
    handles : {
      uniform : {
        modelViewMatrix  : undefined,
        projectionMatrix : undefined,
        textureSampler   : undefined
      },
      
      attrib : {
        position     : undefined,
        textureCoord : undefined
      }
    },
    
    onInit : function(vsScript, fsScript) {
      this.setContext();
      this.initProgram(vsScript, fsScript);
      this.initHandles();
    },
    
    setContext : function() {
      var canvas = $('#canvas').get(0);
      if (canvas !== undefined) {
        canvas.width  = Math.round(canvas.offsetWidth);
        canvas.height = Math.round(canvas.offsetHeight);
        
        try {
          this.gl = canvas.getContext("webgl");
        } catch (e) {
          console.log('A WebGL context could not be initialised:', e);
        }
        
        this.gl.viewportWidth = canvas.width;
        this.gl.viewportHeight = canvas.height;
        
        this.gl.viewport(0.0, 0.0, this.gl.viewportWidth, this.gl.viewportHeight);
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
        this.gl.enable(this.gl.DEPTH_TEST);
      }
    },
    
    initProgram : function(vsScript, fsScript) {
      var gl = this.gl;
      
      var vertexShader = gl.createShader(gl.VERTEX_SHADER);
      gl.shaderSource(vertexShader, vsScript);
      gl.compileShader(vertexShader);
      
      var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
      gl.shaderSource(fragmentShader, fsScript);
      gl.compileShader(fragmentShader);
      
      // Link program with shaders
      this.program = gl.createProgram();
      gl.attachShader(this.program, vertexShader);
      gl.attachShader(this.program, fragmentShader);
      
      gl.linkProgram(this.program);
      gl.useProgram(this.program);
    },
    
    initHandles : function() {
      var gl      = this.gl;
      var program = this.program;
      
      this.handles.uniform.modelViewMatrix = gl.getUniformLocation(program, 'modelViewMatrix');
      this.handles.uniform.projectionMatrix = gl.getUniformLocation(program, 'projectionMatrix');
      this.handles.uniform.textureSampler = gl.getUniformLocation(program, 'textureSampler');
      
      this.handles.attrib.position = gl.getAttribLocation(program, 'position');
      gl.enableVertexAttribArray(this.handles.attrib.position);
      
      this.handles.attrib.textureCoord = gl.getAttribLocation(program, 'textureCoord');
      gl.enableVertexAttribArray(this.handles.attrib.textureCoord);
    },
    
    clearScreen : function() {
      var gl = this.gl;
      
      if (gl !== undefined) {
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      }
    }
    
  };
  
  return Context;
  
});