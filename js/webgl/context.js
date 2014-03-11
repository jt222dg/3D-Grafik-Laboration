define(function(require) {
  
  // Required modules
  var $ = require('jquery');
  
  var Context = {
    
    gl      : undefined,
    program : undefined,
    
    handles : {
      uniform : {
        matrix   : undefined
      },
      
      attrib : {
        position : undefined,
        color    : undefined 
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
        
        this.gl.viewport(0.0, 0.0, canvas.width, canvas.height);
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
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
      
      this.handles.uniform.matrix = gl.getUniformLocation(program, 'matrix');
    
      this.handles.attrib.position = gl.getAttribLocation(program, 'position');
      gl.enableVertexAttribArray(this.handles.attrib.position);
      
      this.handles.attrib.color = gl.getAttribLocation(program, 'color');
      gl.enableVertexAttribArray(this.handles.attrib.color);
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