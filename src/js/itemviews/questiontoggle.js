define(['marionette', 'jquery', 'jquery.select2'], function(Mn, $) {

  'use strict';

  return Mn.ItemView.extend({

    collectionEvents: {
      'sync': 'render',
      'toggle': 'route'
    },

    events: {
      'change': 'toggle'
    },

    toggle: function() {
      this.triggerMethod('toggle', this.$el.val());
    },

    // When a toggle event is fired on the collection, update the select2
    // box if it doesn't match (like when a route has triggered the toggle)
    route: function(model) {
      if(this.$el.val !== model.id) {
        this.$el.val(model.id).trigger('change');
      }
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
