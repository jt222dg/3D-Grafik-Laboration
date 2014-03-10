// Utility functions since WebGL has no matrix manipulation functionality.
// A little rough and dirty, but they do the job.

define(function(require) {
  var Matrix = {
    getIdentityMatrix: function() {
      return [
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0, 
        0, 0, 0, 1
      ];
    },
    
    getProjectionMatrix: function(angle, aspect, zMin, zMax) {
      var tan = Math.tan(angle),
      A = (zMax + zMin)   / (zMin - zMax),
      B = 2 * zMax * zMin / (zMin - zMax);
      
      return [
        tan / 2,          0, 0,  0,
        0, aspect / tan / 2, 0,  0,
        0,                0, A, -1,
        0,                0, B,  0
      ];
    },
    
    rotateX: function(m, angle) {
      var cos = Math.cos(angle),
      sin = Math.sin(angle),
      tm1 = m[1],
      tm5 = m[5],
      tm9 = m[9];
      
      m[1]  = m[1]  * cos - m[2]  * sin;
      m[2]  = m[2]  * cos + tm1   * sin;
      m[5]  = m[5]  * cos - m[6]  * sin;
      m[6]  = m[6]  * cos + tm5   * sin;
      m[9]  = m[9]  * cos - m[10] * sin;
      m[10] = m[10] * cos + tm9   * sin;
      
      return m;
    },
    
    rotateY: function(m, angle) {
      var cos = Math.cos(angle),
      sin = Math.sin(angle),
      tm0 = m[0],
      tm4 = m[4],
      tm8 = m[8];
      
      m[0]  = m[0]  * cos + m[2]  * sin;
      m[2]  = m[2]  * cos - tm0   * sin;
      m[4]  = m[4]  * cos + m[6]  * sin;
      m[6]  = m[6]  * cos - tm4   * sin;
      m[8]  = m[8]  * cos + m[10] * sin;
      m[10] = m[10] * cos - tm8   * sin;
      
      return m;
    },
    
    rotateZ: function(m, angle) {
      var cos = Math.cos(angle),
      sin = Math.sin(angle),
      tm0 = m[0],
      tm4 = m[4],
      tm8 = m[8];
      
      m[0] = m[0] * cos - m[1] * sin;
      m[1] = m[1] * cos + tm0  * sin;
      m[4] = m[4] * cos - m[5] * sin;
      m[5] = m[5] * cos + tm4  * sin;
      m[8] = m[8] * cos - m[9] * sin;
      m[9] = m[9] * cos + tm8  * sin;
      
      return m;
    },
    
    translateX: function(m, t) {
      m[12] += t;
      
      return m;
    },
    
    translateY: function(m, t) {
      m[13] += t;
      
      return m;
    },
    
    translateZ: function(m, t) {
      m[14] += t;
      
      return m;
    }
  };
  
  return Matrix;
  
});