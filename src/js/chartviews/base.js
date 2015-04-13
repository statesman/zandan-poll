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
    _formatData: function() {
      var data = this.model.toJSON().answers;

      // Handle multiple data series (bar chart)
      if(Array.isArray(this.group)) {
        // Get x axis labels
        var labels = ['x'].concat(this.group);

        // Then get values for each group
        var answers = _.map(this.group, function(group) {
          return [group].concat(_.pluck(data, group));
        });

        console.log([labels].concat(answers));
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
