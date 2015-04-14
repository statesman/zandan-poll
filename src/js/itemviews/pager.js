define(['marionette'], function(Mn) {

  'use strict';

  return Mn.ItemView.extend({

    collectionEvents: {
      'toggle': 'toggle'
    },

    toggle: function(newModel) {
      this.model = newModel;

      this.render();
    },

    serializeData: function() {
      var index = this.collection.indexOf(this.model);

      var url = function(i) {
        var target = this.collection.at(i);
        
        if(typeof target !== 'undefined') {
          return '#question/' + this.collection.at(i).id;
        }
        return false;

      }.bind(this);

      return {
        previous: url(index - 1),
        next: url(index + 1)
      };
    },

    template: '#tpl-pager'

  });

});
