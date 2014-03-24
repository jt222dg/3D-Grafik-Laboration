define(function(require) {
  
  // Required modules
  var $ = require('jquery');
  
  var Context = {
    
    gl      : undefined,
    
    onInit : function() {
      
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
        this.gl.clearColor(0.390, 0.582, 0.926, 1.0);
        this.gl.enable(this.gl.DEPTH_TEST);
      }
      
    },
    
    createProgram : function(vsScript, fsScript) {
      var gl = this.gl;
      
      // Compile vertex shader
      var vertexShader = gl.createShader(gl.VERTEX_SHADER);
      gl.shaderSource(vertexShader, vsScript);
      gl.compileShader(vertexShader);
      
      // Compile fragment shader
      var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
      gl.shaderSource(fragmentShader, fsScript);
      gl.compileShader(fragmentShader);
      
      // Link program with shaders
      var program = gl.createProgram();
      gl.attachShader(program, vertexShader);
      gl.attachShader(program, fragmentShader);
      gl.linkProgram(program);
      gl.useProgram(program);
      
      return program;
    },
    
    initBuffer : function(buffer) {
      
      var gl = this.gl;
      var bufferType = buffer.bufferType === 'array' ? gl.ARRAY_BUFFER : gl.ELEMENT_ARRAY_BUFFER;
      var dataType = buffer.dataType === 'int' ? new Int16Array(buffer.data) : new Float32Array(buffer.data);
      
      buffer.id = gl.createBuffer();
      gl.bindBuffer(bufferType, buffer.id);  
      gl.bufferData(bufferType, dataType, gl.STATIC_DRAW);
      
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