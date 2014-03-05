console.log("SYSTEM: Nav view loading...");

define( function(require) {
  
  // Required modules
  var Backbone = require('backbone');
  var _        = require('underscore');

  return Backbone.View.extend({
    
    el       : undefined,
    template : undefined,
    
    initialize : function(options) {
      this.onInit(options);
    },
    
    onInit : function(options) {
      if (options) {
        this.template = options.template;
        this.el       = options.el;
      }
    },
    
    render : function() {
      var html = this.template ? _.template(this.template, {}) : "Undefined template";
      
      if (this.template) {
        this.$el.html(html);
      } else {
        console.log("view template is undefined.");
      }
    }
  });
});