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
        normalMatrix     : undefined,
        textureSampler   : undefined,
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
        this.gl.clearColor(0.390, 0.582, 0.926, 1.0);
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
      this.handles.uniform.normalMatrix = gl.getUniformLocation(program, 'normalMatrix');
      this.handles.uniform.textureSampler = gl.getUniformLocation(program, 'textureSampler');
      
      this.handles.uniform.directionalLight.ambient = gl.getUniformLocation(program, 'directionalLight.ambient');
      this.handles.uniform.directionalLight.diffuse = gl.getUniformLocation(program, 'directionalLight.diffuse');
      this.handles.uniform.directionalLight.direction = gl.getUniformLocation(program, 'directionalLight.direction');
      
      this.handles.attrib.position = gl.getAttribLocation(program, 'position');
      gl.enableVertexAttribArray(this.handles.attrib.position);
      
      this.handles.attrib.normal = gl.getAttribLocation(program, 'normal');
      gl.enableVertexAttribArray(this.handles.attrib.normal);
      
      this.handles.attrib.textureCoord = gl.getAttribLocation(program, 'textureCoord');
      gl.enableVertexAttribArray(this.handles.attrib.textureCoord);
    },
    
    bindBuffer : function(buffer) {
      
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