define(['marionette', 'd3', 'underscore', 'lib/color'], function(Mn, d3, _, color) {

  'use strict';

  return Mn.ItemView.extend({

    template: '#tpl-answers',

    tagName: 'ul',

    // Augment answers with a badge if an answer is the top choice for a group
    addChoices: function(data) {
      var titles = {
        yrs05: '<i class="fa fa-home"></i> Have lived in Austin <5 years',
        yrs620: '<i class="fa fa-home"></i> Have lived in Austin 6-20 years',
        yrs21: '<i class="fa fa-home"></i> Have lived in Austin 21+ years',
        livAus: '<i class="fa fa-map-marker"></i> Live in Austin',
        livCou: '<i class="fa fa-map-marker"></i> Live outside Austin',
        livCen: '<i class="fa fa-map-marker"></i> Live in central Austin',
        age18: '<i class="fa fa-user"></i> Millenials',
        age35: '<i class="fa fa-user"></i> Non-millenials'
      };

      /* ~ Get the top choice for each age group ~ */
      var choices = {};

      _.each(_.keys(data.answers[0]), function(check) {
        if(check === 'text' || check === 'total') {
          return;
        }

        // Get the top value for this group
        var max = _.max(data.answers, function(val, key) {
          return val[check];
        });

        // Get the labels for any answer that share that value (accounts
        // for ties)
        var topChoices = _.chain(data.answers)
          .filter(function(val, key) {
            return val[check] === max[check];
          })
          .pluck('text')
          .value();

        choices[check] = topChoices;
      });

      /* ~ Reorganize by answer text ~ */
      var choicesByAnswer = {};

      _.each(data.answers, function(answer) {
        choicesByAnswer[answer.text] = _.chain(choices)
          .mapObject(function(key, val) {
            if(key.indexOf(answer.text) !== -1) {
              return key;
            }
            return null;
          })
          .pairs()
          .filter(function(pair) {
            return pair[1] !== null;
          })
          .map(function(d) {
            return '<span class="label label-default ' + d[0] + '">' + titles[d[0]] + '</span>';
          })
          .value();
      });

      // HTML strings for each answer
      var htmlStrings = _.mapObject(choicesByAnswer, function(val) {
        if(val.length !== 0) {
          return val.join(' ');
        }
        return null;
      });

      data.answers = _.map(data.answers, function(answer) {
        answer.choice = htmlStrings[answer.text];
        return answer;
      });

      return data;
    },

    templateHelpers: {
      dotColor: function(text) {
        return color.tpl(text);
      },
      format: d3.format('%'),
      sort: function(data) {
        return _.sortBy(data, function(d) {
          return -d.total;
        }, this);
      }
    },

    serializeData: function() {
      var data = this.model.toJSON();

      // Add top choices if they haven't been added yet
      if(!data.answers[0].hasOwnProperty('choice')) {
        data = this.addChoices(data);
      }

      return data;
    },

    collectionEvents: {
      'toggle': 'toggle'
    },

    toggle: function(switchTo) {
      this.model = switchTo;
      this.render();
    }

  });

});
