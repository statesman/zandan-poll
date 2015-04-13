define(['marionette'], function(Mn) {

  /*
   * A base class for all the charts. At minimum, derived classes
   * need to implement a group property to extract data from model.answers
   * with and a render function to setup the chart.
   */
   Mn.ChartView = Mn.View.extend({

    // Get the data from the model into a format that c3 can use;
    // It's filtered by the group property, which must be set
    // on the ChartView instance

    /*
    {
      "id": "Q1",
      "question": "What do you think are the three most important problems facing Austin today? (Open-ended responses are reported as coded.)",
      "answers": [{
        "text": "Traffic/ Roads/ Transportation",
        "total": 0.82,
        "yrs05": 0.85,
        "yrs620": 0.85,
        "yrs21": 0.79
      }, {
        "text": "Affordability/ Cost of Living/ Affordable Housing/ Gentrification",
        "total": 0.5,
        "yrs05": 0.43,
        "yrs620": 0.51,
        "yrs21": 0.52
      }, {
        "text": "Population Growth",
        "total": 0.24,
        "yrs05": 0.24,
        "yrs620": 0.22,
        "yrs21": 0.25
      }, {
        "text": "Jobs/ Wages/ Unemployment/ Poverty/ Homelessness",
        "total": 0.17,
        "yrs05": 0.18,
        "yrs620": 0.13,
        "yrs21": 0.18
      }, {
        "text": "Education",
        "total": 0.12,
        "yrs05": 0.1,
        "yrs620": 0.14,
        "yrs21": 0.12
      }, {
        "text": "Water/Drought",
        "total": 0.11,
        "yrs05": 0.11,
        "yrs620": 0.14,
        "yrs21": 0.08
      }, {
        "text": "Crime",
        "total": 0.1,
        "yrs05": 0.1,
        "yrs620": 0.08,
        "yrs21": 0.11
      }, {
        "text": "None of these",
        "total": 0.05,
        "yrs05": 0.06,
        "yrs620": 0.03,
        "yrs21": 0.06
      }]
    }

    ['x', '0-5', '6-20', '21+']
    ['Doing a good job of remaining unique', 50, 35, 35]
    ['Unique but becoming more similar', 44, 51, 50]
    ['Similar to other major U.S. cities', 6, 14, 15]
    */

    _formatData: function() {
      var data = this.model.toJSON().answers;

      // Handle multiple data series (bar chart)
      if(Array.isArray(this.group)) {
        // Get x axis labels
        var labels = ['x'].concat(this.group);

        // Then get values for each group
        var answers = _.map(data, function(answer) {
          // Filter to just items with these keys (includes the text
          // and the group keys)
          var toInclude = ['text'].concat(this.group);
          return _.filter(answer, function(val, key) {
            return toInclude.indexOf(key) !== -1;
          });
        }, this);

        return [labels].concat(answers);
      }

      // A single data series (pie chart)
      return _.map(data, function(datum) {
        return [datum.text, datum[this.group]];
      }, this);
    },

    // Called to update the chart with new data
    _update: function() {
      this.chart.load({
        columns: this._formatData('total'),
        unload: true
      });
      this.chart.legend.hide();
    },

    // Handles model-switching, chart-updating
    toggle: function(newModel) {
      this.model = newModel;

      // If this is the first time to load this chart,
      // render it
      if(!this.hasOwnProperty('chart')) {
        this.render();
      }

      this._update();
    },

    // C3 defaults, applied in the instance with _.extend
    _chartDefaults: {
      legend: {
        hide: true
      }
    },

    // Listen for the collection's toggle event and upate the
    // chart accordingly
    collectionEvents: {
      'toggle': 'toggle'
    }

  });

});
