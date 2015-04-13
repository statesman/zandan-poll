define(['d3'], function(d3) {

  'use strict';

  /*
   * Use a single D3 color scale across all C3 charts,
   * templates to ensure colors match. It's reset every time
   * we change models so each question starts with the same
   * colors.
   */

  var scale = d3.scale.category10();

  return {
    // Resets the color scale's domain
    reset: function(vals) {
      scale.domain(vals);
    },

    // For C3 charts
    c3: function(c, d) {
      if(typeof d === 'string') {
        return scale(d);
      }
      return scale(d.id);
    },

    // For use in template helpers
    tpl: function(name) {
      return scale(name);
    }
  };

});
