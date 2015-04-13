define(['marionette', 'lib/color', 'c3', 'chartviews/base'], function(Mn, color, c3) {

  // This creates our ChartView base class
  return Mn.ChartView.extend({

    group: ['yrs05', 'yrs620', 'yrs21'],

    render: function() {
      this.chart = c3.generate(_.extend({
        bindto: this.el,
        data: {
          x: 'x',
          columns: this._formatData('total'),
          type : 'bar',
          color: color.c3
        },
        axis: {
          x: {
            type: 'category'
          }
        }
      }, this._chartDefaults));

      return this;
    }

  });

});
