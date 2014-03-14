define(function(require) {
  
  var TextureLoader = {
    
    loadTexture : function(gl, source) {
      
      var texture = gl.createTexture();
      texture.image = new Image();
      
      var that = this;
      texture.image.onload = function() {
        that.bindTexture(gl, texture);
        texture.isLoaded = true;
      };
      
      texture.image.src = source;
      
      return texture;
    },
    
    bindTexture : function(gl, texture) {
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texture.image);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
      gl.generateMipmap(gl.TEXTURE_2D);
      gl.bindTexture(gl.TEXTURE_2D, null);
    }
    
  };
  
  return TextureLoader;
  
});