define(['marionette', 'lib/color'], function(Mn, color) {

  'use strict';

  return Mn.ItemView.extend({

    template: '#tpl-answers',

    tagName: 'ul',

    templateHelpers: {
      dotColor: function(text) {
        return color.tpl(text);
      }
    },

    collectionEvents: {
      'toggle': 'toggle'
    },

    toggle: function(switchTo) {
      this.model = switchTo;
      this.render();
    }

  });

});
