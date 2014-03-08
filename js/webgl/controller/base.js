define(function(require) {
  
  // Required modules
  var _ = require('underscore');
  var $ = require('jquery');
  
  var Base = function() {
    
  };
  
  Base.prototype.onInit = function() {
    
    console.log("base onInit");
    
  };
  
  Base.prototype.onEvent = function() {
    
    // Empty stub
    
  };
  
  Base.prototype.onLogic = function(delta) {
    
    
  };
  
  Base.prototype.onRender = function(canvasHandler, delta) {
    
    console.log("base render.");
    
  };
  
  Base.prototype.onCleanUp = function() {
    
    
  };
  
  return Base;
  
});