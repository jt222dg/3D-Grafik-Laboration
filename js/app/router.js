console.log("SYSTEM: Router module loading...");

define(function(require) {
  
  // Required modules
  var Backbone     = require('backbone');
  var _            = require('underscore');
  var GenericView  = require('view/generic');
  var mainTemplate = require('text!template/main.html');
  var WebGLApp     = require('webgl/app');
  
  return Backbone.Router.extend({
    routes : {
      '*default' : 'goTo'
    },
    
    initialize : function() {
      this._mainView = new GenericView({ template : mainTemplate, el : '#content' }); 
      this._webGLApp = new WebGLApp();
    },
    
    goTo: function() {
      switch (Backbone.history.fragment) {
        default : this._mainView.render(); break;
      }
      
      this._webGLApp.onInit();
      this._webGLApp.onLoop();
    }
  });
});