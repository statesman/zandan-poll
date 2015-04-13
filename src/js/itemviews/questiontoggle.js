define(['marionette'], function(Mn) {

  'use strict';

  return Mn.ItemView.extend({

    collectionEvents: {
      'sync': 'render'
    },

    events: {
      'change': 'toggle'
    },

    toggle: function() {
      this.triggerMethod('toggle', this.$el.val());
    },

    template: '#tpl-toggle'

  });

});
