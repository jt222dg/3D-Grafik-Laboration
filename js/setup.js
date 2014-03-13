console.log("SYSTEM: Conifguring RequireJS..");

require.config({

  baseUrl: 'js/lib',

  paths: {
    // Base folder paths
    app          : '../app',
    view         : '../app/view',
    collection   : '../app/collection',
    template     : '../../template',
    webgl        : '../webgl',
    utility      : '../utility',
    shader       : '../../shader',
    model        : '../../model',
    loader       : '../webgl/loader',
    
    // Lib paths
    jquery       : 'jquery/jquery',
    text         : 'require/text',
    'bb-raw'     : 'backbone/backbone',
    backbone     : 'backbone/backbone-module',
    underscore   : 'underscore/underscore',
    
    // Other
    router       : '../app/router'
  },
  
  shim: {
    'bb-raw' : {
      deps    : ['underscore', 'jquery'],
      exports : 'Backbone'
    },
    'underscore' : {
      exports : '_'
    }
  }
});

console.log("SYSTEM: Main module loading...");

require(["app/app", "jquery"], function(app, $) {
  $(app.run());
});
