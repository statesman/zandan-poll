define(['backbone', 'marionette'], function(Backbone, Mn) {

  'use strict';

  return Backbone.Router.extend({

    initialize: function() {
      this.radio = Mn.Radio.channel('app');
    },

    routes: {
      '': 'home',
      'question/:id': 'question'
    },

    home: function(id) {
      this.navigate('question/Q1', { trigger: true });
    },

    question: function(id) {
      this.radio.command('toggle', id);
    }

  });

});
