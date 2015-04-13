define(['marionette', 'lib/color', 'c3', 'chartviews/base'], function(Mn, color, c3) {

  // This creates our ChartView base class
  return Mn.ChartView.extend({

    group: 'total',

    render: function() {
      this.chart = c3.generate(_.extend({
        bindto: this.el,
        data: {
          columns: this._formatData('total'),
          type : 'pie',
          color: color.c3
        }
      }, this._chartDefaults));

      return this;
    }

  });

});
