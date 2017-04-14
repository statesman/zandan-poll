# zandan-poll
This is an interactive version of the topline report for the 2015 [Zandan poll](http://zandanpoll.com/) built using Marionette.js. It uses a Backbone router to allow deep-linking to individual questions, [select2](https://select2.github.io/) for navigation among questions and [C3.js](http://c3js.org/) for charts.

The C3 charts are rendered using a special view class, [ChartView](src/js/chartviews/base.js), which is an extension of the base Marionette view class. All of the primary data views - question answers, charts, etc. - hold both a collection and model. The model is changed when the question is changed and views listen to collection events to know when those changes happen.

Views, the router and the Marionette [Application](src/js/lib/app.js) communicate with [Backbone.Radio](https://github.com/marionettejs/backbone.radio) (shimmed [here](https://github.com/statesman/zandan-poll/blob/master/src/js/shims/marionette.js)).

### Mobile & social considerations
- the graphic is built using our responsive Bootstrap template
- all charts resize to fit on mobile and column charts convert to bar charts on small screens
- the included router allows for deep-linking on social, which aims to increase shareability

### Getting started
* `npm install`
* `bower install`
* `grunt data`
* `grunt`

### Copyright
&copy; 2017 Austin American-Statesman
