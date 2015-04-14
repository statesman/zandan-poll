define([
  'marionette',
  'collections/questions',
  'chartviews/years',
  'chartviews/geo',
  'itemviews/questiontoggle',
  'itemviews/answers',
  'lib/color',
  'underscore'
], function(
  Mn,
  QuestionsCollection,
  YearsChartView,
  GeoChartView,
  QuestionToggleView,
  AnswersItemView,
  color,
  _
) {

  'use strict';

  return Mn.Application.extend({

    // App data
    questions: new QuestionsCollection(),

    // Populate data, fill regions when the app is started
    onStart: function() {
      // Setup toggle
      this.toggle = new QuestionToggleView({
        el: '#toggle',
        collection: this.questions
      });

      // Render views
      /*
      new TotalChartView({
        el: '#total',
        collection: this.questions
      });
      */

      new AnswersItemView({
        el: '#answers',
        collection: this.questions
      });

      new YearsChartView({
        el: '#years',
        collection: this.questions
      });

      new GeoChartView({
        el: '#geo',
        collection: this.questions
      });

      // When someone toggles in the UI, update charts and such
      this.listenTo(this.toggle, 'toggle', function(id) {
        // Pluck the new model from the collection
        var switchTo = this.questions.get(id);

        // Reset the color scale before rendering views
        color.reset(_.pluck(switchTo.toJSON().answers, 'text'));

        // Fire the toggle event on the collection, which will update
        // all the views
        this.questions.trigger('toggle', switchTo);
      });

      // Fetch data and when it returns go ahead and trigger the render,
      // model-loading
      this.questions.fetch().done(function() {
        this.questions.trigger('toggle', this.questions.at(0));
      }.bind(this));
    }

  });

});
