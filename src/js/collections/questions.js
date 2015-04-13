define(['backbone', 'models/question'], function(Backbone, QuestionModel) {

  'use strict';

  return Backbone.Collection.extend({

    url: 'data/questions.json',

    model: QuestionModel

  });

});
