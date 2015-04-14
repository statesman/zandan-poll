define([
  'marionette',
  'backbone',
  'collections/questions',
  'chartviews/years',
  'chartviews/geo',
  'itemviews/questiontoggle',
  'itemviews/answers',
  'lib/color',
  'lib/router',
  'underscore'
], function(
  Mn,
  Backbone,
  QuestionsCollection,
  YearsChartView,
  GeoChartView,
  QuestionToggleView,
  AnswersItemView,
  color,
  Router,
  _
) {

  'use strict';

  return Mn.Application.extend({

    // App data
    questions: new QuestionsCollection(),

    onBeforeStart: function() {
      this.radio = Mn.Radio.channel('app');

      this.router = new Router();
    },

    // Populate data, fill regions when the app is started
    onStart: function() {
      // Setup toggle
      this.toggle = new QuestionToggleView({
        el: '#toggle',
        collection: this.questions
      });

      // Render data views
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
        this.router.navigate('question/' + id, { trigger: true });
      });

      // Update views when router fires a toggle event
      this.radio.comply('toggle', function(id) {
        // Pluck the new model from the collection
        var switchTo = this.questions.get(id);

        // Reset the color scale before rendering views
        color.reset(_.pluck(switchTo.toJSON().answers, 'text'));

        // Fire the toggle event on the collection, which will update
        // all the views
        this.questions.trigger('toggle', switchTo);
      }, this);

      // Fetch data and trigger routing when it's loaded
      this.questions.fetch().done(function() {
        Backbone.history.start();
      });
    }

  });

});
