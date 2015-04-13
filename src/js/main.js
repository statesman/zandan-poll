require(['lib/app', 'd3'], function(App, d3) {

  'use strict';

  // Set Highcharts defaults
  /*
  Highcharts.setOptions({
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: 0,
      plotShadow: false
    },
    title: {
      text: null
    },
    tooltip: {
      pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    credits: {
      enabled: false
    }
  });
  */

  // Fire up the app
  $(function() {
    (new App()).start();
  });

});
