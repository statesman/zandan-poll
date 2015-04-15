define(['marionette', 'underscore'], function(Mn, _) {

  /*
   * A base class for all the charts. At minimum, derived classes
   * need to implement a group property to extract data from model.answers
   * with and a render function to setup the chart.
   */
   var tooltipTemplate = Mn.TemplateCache.get('#tpl-tooltip');

   Mn.ChartView = Mn.View.extend({

     // A hash to lookup abbreivated keys in
     keys: {
       yrs05: '0-5 yrs.',
       yrs620: '6-20 yrs.',
       yrs21: '21+ yrs.',
       livAus: 'In Austin',
       livCou: 'Outside Austin',
       livCen: 'Central Austin',
       age18: 'Age 18-34',
       age35: 'Age 35+',
       total: 'Total'
     },

     // Unpack abbreviated keys into verbose field names that will look
     // good on a chart, returns false if not found
     unpackKey: function(abbrev) {
       if(this.keys.hasOwnProperty(abbrev)) {
         return this.keys[abbrev];
       }
       return abbrev;
     },

    // Get the data from the model into a format that c3 can use;
    // It's filtered by the group property, which must be set
    // on the ChartView instance
    _formatData: function() {
      var data = this.model.toJSON().answers;

      // Handle multiple data series (bar chart)
      if(Array.isArray(this.group)) {
        // Get x axis labels
        var labels = ['x'].concat(_.map(this.group, this.unpackKey, this));

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
      },
      tooltip: {
        contents: function (data, defaultTitleFormat, defaultValueFormat, color) {
          return tooltipTemplate({
            data: data,
            format: defaultValueFormat,
            color: color
          });
        }
      }
    },

    // Listen for the collection's toggle event and upate the
    // chart accordingly
    collectionEvents: {
      'toggle': 'toggle'
    }

  });

});
