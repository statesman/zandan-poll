define(['marionette', 'jquery', 'jquery.select2'], function(Mn, $) {

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

    onRender: function(){
      // Use select2 for question selection
      this.$el.select2({
        placeholder: 'Select a question'
      });
    },

    template: '#tpl-toggle'

  });

});
