define([
  'marionette',
  'lib/color',
  'd3',
  'c3',
  'chartviews/base'
], function(Mn, color, d3, c3) {

  return Mn.ChartView.extend({

    group: ['livCou', 'livAus', 'livCen'],

    render: function() {
      this.chart = c3.generate(_.extend({
        bindto: this.el,
        data: {
          x: 'x',
          columns: this._formatData('total'),
          type : 'bar',
          color: color.c3
        },
        chart: {
          padding: {
            left: 25
          }
        },
        axis: {
          rotated: this.$el.width() < 450,
          x: {
            type: 'category'
          },
          y: {
            tick: {
              count: this.$el.width() < 450 ? 4 : undefined,
              format: d3.format('%')
            }
          }
        },
        bar: {
          width: {
            ratio: 0.9
          }
        }
      }, this._chartDefaults));

      return this;
    }

  });

});
