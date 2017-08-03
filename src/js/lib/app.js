define([
  'marionette',
  'backbone',
  'collections/questions',
  'chartviews/years',
  'chartviews/geo',
  'chartviews/age',
  'itemviews/questiontoggle',
  'itemviews/answers',
  'itemviews/pager',
  'lib/color',
  'lib/router',
  'underscore'
], function(
  Mn,
  Backbone,
  QuestionsCollection,
  YearsChartView,
  GeoChartView,
  AgeChartView,
  QuestionToggleView,
  AnswersItemView,
  PagerView,
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
      // Render controls
      this.toggle = new QuestionToggleView({
        el: '#toggle',
        collection: this.questions
      });

      this.pager = new PagerView({
        el: '#pager',
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

      new AgeChartView({
        el: '#age',
        collection: this.questions
      });

      // When someone toggles in the UI, update charts and such
      this.listenTo(this.toggle, 'toggle', function(id) {
        this.router.navigate('question/' + id, { trigger: true });
      });

      // Update views when router fires a toggle event
      this.radio.comply('toggle', function(id) {
        // Make sure the model is actually changing
        if(typeof this._previous === 'undefined' || this._previous !== id) {
          // Pluck the new model from the collection
          var switchTo = this.questions.get(id);

          // Reset the color scale before rendering views
          color.reset(_.pluck(switchTo.toJSON().answers, 'text'));

          // Fire the toggle event on the collection, which will update
          // all the views
          this.questions.trigger('toggle', switchTo);

          // Store this so we can ensure there has actually been a change
          // before redrawing everything
          this._previous = switchTo.id;

          // Fire metrics and meter
          DDO.action ("interaction.bigJPageView");
          membercenter.sdk.updateConnext();
        }
      }, this);

      // Fetch data and trigger routing when it's loaded
      this.questions.fetch().done(function() {
        Backbone.history.start();
      });
    }

  });

});
