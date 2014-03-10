define(function(require) {
  
  var Cube = {
    name : "Cube",
    
    vertexPositions : {
      buffer : [
       -0.5, -0.5, 0.0,
        0.5, -0.5, 0.0,
       -0.5,  0.5, 0.0,
        0.5,  0.5, 0.0
      ],
      
      faces : [
        0, 1, 2,
        1, 2, 3
      ],
      
      itemSize : 3,
      numItems : 6
    },
    
    vertexColors : {
      buffer : [
        0.0, 0.5, 0.5, 1.0,
        0.0, 0.5, 0.5, 1.0,
        0.0, 0.5, 0.5, 1.0,
        0.0, 0.5, 0.5, 1.0
      ],
      itemSize : 4,
      numItems : 4
    }
  };
  
  return Cube;
  
});