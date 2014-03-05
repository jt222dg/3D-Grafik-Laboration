console.log("SYSTEM: App module loading...");

define(function(require) {
  
  // Required modules
  var Backbone = require('backbone');
  var Router   = require('router');
  
  return {
    run : function() {
    
      (new Router());
      Backbone.history.start();
    }
  };
});