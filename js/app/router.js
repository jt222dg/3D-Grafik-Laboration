console.log("SYSTEM: Router module loading...");

define(function(require) {
  
  // Required modules
  var Backbone     = require('backbone');
  var _            = require('underscore');
  var GenericView  = require('view/generic');
  var mainTemplate = require('text!template/main.html');
  
  return Backbone.Router.extend({
    routes : {
      '*default' : 'goTo'
    },
    
    initialize : function() {
      this._mainView = new GenericView({ template : mainTemplate, el : 'content' }); 
    },
    
    goTo: function() {
      switch (Backbone.history.fragment) {
        default : this._mainView.render(); break;
      }
    }
  });
});