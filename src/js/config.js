require.config({
  paths: {
    jquery: '../../bower_components/jquery/dist/jquery',
    underscore: '../../bower_components/underscore/underscore',
    backbone: '../../bower_components/backbone/backbone',
    marionette: '../../bower_components/marionette/lib/core/backbone.marionette',
    'backbone.babysitter': '../../bower_components/backbone.babysitter/lib/backbone.babysitter',
    'backbone.radio': '../../bower_components/backbone.radio/build/backbone.radio',
    d3: '../../bower_components/d3/d3',
    c3: '../../bower_components/c3/c3',
    highcharts: '../../bower_components/highcharts/highcharts.src'
  },
  map: {
    // Shim Marionette to use backbone.wreqr instead of backbone.radio
    '*': {
      'marionette': 'shims/marionette',
      'backbone.wreqr': 'backbone.radio'
    },
    // But use the real marionette for our shim file, so we can inti
    // backbone.radio
    'shims/marionette': {
      'marionette': 'marionette'
    }
  }
});
