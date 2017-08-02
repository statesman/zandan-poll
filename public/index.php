<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="initial-scale=1, maximum-scale=1">
    <?php
      $meta = array(
        'title' => 'Explore the 2017 Zandan Poll results',
        'description' => 'Most people surveyed said Austin’s biggest problem is traffic.',
        'thumbnail' => 'http://projects.statesman.com/news/zandan-poll-2017/assets/share-fb.jpg',
        'url' => 'http://projects.statesman.com/news/zandan-poll-2017/',
        'twitter' => 'aasinteractive'
      );
    ?>

    <title>Interactive: <?php print $meta['title']; ?> | Austin American-Statesman</title>
    <link rel="icon" type="image/png" href="//projects.statesman.com/common/favicon.ico">

    <link rel="canonical" href="<?php print $meta['url']; ?>" />

    <meta name="description" content="<?php print $meta['description']; ?>">

    <meta property='og:locale' content='en_US' />
    <meta property='og:site_name' content='Austin American-Statesman' />
    <meta property='fb:app_id' content='135078579956731' />
    <meta property='og:type' content='article' />
    <meta property='article:publisher' content='https://www.facebook.com/statesman' />
    <meta property="og:title" content="<?php print $meta['title']; ?>"/>
    <meta property="og:description" content="<?php print $meta['description']; ?>"/>
    <meta property="og:image" content="<?php print $meta['thumbnail']; ?>"/>
    <meta property="og:url" content="<?php print $meta['url']; ?>"/>

    <meta name="twitter:card" content="summary" />
    <meta name="twitter:site" content="@<?php print $meta['twitter']; ?>" />
    <meta name="twitter:title" content="<?php print $meta['title']; ?>" />
    <meta name="twitter:description" content="<?php print $meta['description']; ?>" />
    <meta name="twitter:creator:id" content="15464292" />
    <meta name="twitter:creator:id" content="16235644" />
    <meta name="twitter:image:src" content="http://projects.statesman.com/news/zandan-poll-2017/assets/share-tw.png" />
    <meta name="twitter:url" content="<?php print $meta['url']; ?>" />

    <link href="dist/style.css" rel="stylesheet">

    <link href='https://fonts.googleapis.com/css?family=Lusitana:400,700|Merriweather+Sans:400,400italic,700italic,700|Merriweather:400,400italic,700,700italic|Open+Sans:400,700' rel='stylesheet' type='text/css'>

    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->

    <?php /* CMG advertising and analytics */ ?>
    <?php include "includes/advertising.inc";?>
    <?php include "includes/metrics-head.inc";?>
  </head>
  <body>
    <nav class="navbar navbar-default" role="navigation">
      <div class="container">
        <div class="navbar-header">
          <a class="navbar-brand" href="http://www.statesman.com/" target="_blank">
            <img width="103" height="26" src="assets/logo-short-black.png" />
          </a>
        </div>
        <ul class="nav navbar-nav navbar-right social">
          <li><a target="_blank" href="https://www.facebook.com/sharer.php?u=<?php echo urlencode($meta['url']); ?>"><i class="fa fa-facebook-square"></i></a></li>
          <li><a target="_blank" href="https://twitter.com/intent/tweet?url=<?php echo urlencode($meta['url']); ?>&via=<?php print urlencode($meta['twitter']); ?>&text=<?php print urlencode($meta['title']); ?>"><i class="fa fa-twitter"></i></a></li>
        </ul>
      </div>
    </nav>

    <div id="spin" style="position:fixed;top:50%;left:50%;z-index:10000"></div>

    <article class="container">
      <div class="header">
        <h1>Explore the 2017 Zandan Poll</h1>
        <p class="author">Interactive by <a href="https://twitter.com/aasinteractive" class="author">Statesman Interactives</a><br />Published April 20, 2017</p>
        <p>Transportation and affordability, as they were in a <a href="http://projects.statesman.com/news/zandan-poll/#question/Q1">similar 2015 survey</a> by pollster Peter Zandan, remain the <a href="http://projects.statesman.com/news/zandan-poll-2017/#question/Q2">greatest concerns</a> of the 800-plus people who were interviewed for an online survey in March.</p>
        <p>The Zandan Poll asks Austin-area residents to to assess their attitudes and behaviors on the economy, growth, culture, community, health and transportation. Peter Zandan, global vice-chair at Hill+Knowlton Strategies, has conducted five such Austin-area polls at his own expense since 1997.</p>
        <p>Read more: <a href="http://www.mystatesman.com/news/local/traffic-and-tacos-polls-gauges-austin-attitudes/MPEDw2Nc7USYAjmSh58ckK/" target="_blank">Traffic and tacos: Polls gauges Austin attitudes<i class="fa fa-angle-double-right"></i></a></p>
      </div>

      <hr />

      <div class="row controls">
        <div class="col-xs-12 col-sm-8 col-md-9 col-lg-10 form-group">
          <label for="question">Select a question:</label>
          <select id="toggle" class="form-control"></select>
        </div>
        <div id="pager" class="col-xs-12 col-sm-4 col-md-3 col-lg-2"></div>
      </div>
      <div class="row">
        <div class="col-xs-12" id="answers"></div>
        <div class="col-xs-12">
          <hr />
          <h3 class="subhed"><i class="fa fa-home"></i> Breakdown by years lived in Austin</h3>
          <div id="years"></div>
        </div>
        <div class="col-xs-12">
          <hr />
          <h3 class="subhed"><i class="fa fa-map-marker"></i> Breakdown by geography</h3>
          <div id="geo"></div>
        </div>
        <div class="col-xs-12">
          <hr />
          <h3 class="subhed"><i class="fa fa-user"></i> Breakdown by age</h3>
          <div id="age"></div>
        </div>
      </div>

      <script type="text/template" id="tpl-toggle">
        <% _.each( items, function(q){ %>
          <option value="<%= q.id %>"><%= q.question %></option>
        <% }); %>
      </script>

      <script type="text/template" id="tpl-pager">
        <div class="btn-group pull-right" role="group">
          <a href="<%= previous %>" class="btn btn-primary btn-sm<% if(previous === false) { %> disabled<% } %>"><i class="fa fa-chevron-left"></i>Previous</a>
          <a href="<%= next %>" class="btn btn-primary btn-sm<% if(next === false) { %> disabled<% } %>">Next<i class="fa fa-chevron-right"></i></a>
        </div>
      </script>

      <script type="text/template" id="tpl-answers">
        <h2 class="question-title"><%= question %></h2>
        <ul class="fa-ul">
          <% _.each( sort(answers), function(a){ %>
            <li>
              <h3>
                <i class="fa fa-li fa-square" style="color:<%= dotColor(a.text) %>;"></i> <span class="value"><%= format(a.total) %></span>
                <%= a.text %>
                <% if (a.choice) { %><br /><small class="top-choices"><strong>Top choice of people who:</strong> <span class="top-choices"><%= a.choice %></span></small><% } %>
              </h3>
            </li>
          <% }); %>
        </ul>
      </script>

      <script type="text/template" id="tpl-tooltip">
        <div class="popover popover-static popover-chart">
          <div class="popover-content">
            <ul class="list-unstyled">
              <% _.each( data, function(d){ %>
                <li class="clearfix">
                  <i class="fa fa-square" style="color:<%= color(d.id) %>;"></i> <%= d.name %> <span class="value pull-right"><%= format(d.value, d.ratio, d.id, d.index) %></span>
                </li>
              <% }); %>
            </ul>
          </div>
        </div>
      </script>
    </article>

    <div class="clearfix" id="ads">
      <div class="visible-xs hidden-sm hidden-md hidden-lg col-xs-12">
        <div id="div-gpt-ad-1403295829614-3" class="center-block" style="width:320px; height:50px;">
          <script type="text/javascript">
          googletag.cmd.push(function() { googletag.display('div-gpt-ad-1403295829614-3'); });
          </script>
        </div>
      </div>
      <div class="hidden-xs visible-sm visible-md visible-lg col-xs-12">
        <div id="div-gpt-ad-1403295829614-1" class="center-block" style="width:728px; height:90px;">
          <script type="text/javascript">
          googletag.cmd.push(function() { googletag.display('div-gpt-ad-1403295829614-1'); });
          </script>
        </div>
      </div>
    </div>

    <p id="legal" class="center-block text-center"><small>© <?php print date("Y"); ?> <a href="https://www.coxmediagroup.com" target="_blank">Cox Media Group</a>. By using this website, you accept the terms of our <a href="http://www.mystatesman.com/visitor_agreement/" target="_blank">Visitor Agreement</a> and <a target="_blank" href="http://www.mystatesman.com/privacy_policy/">Privacy Policy</a>, and understand your options regarding <a target="_blank" href="http://www.mystatesman.com/privacy_policy/#ad-choices">Ad Choices</a><img src="https://media.cmgdigital.com/shared/img/photos/2012/02/29/d3/da/ad_choices_logo.png" alt="AdChoices">.</small></p>

    <?php /* CMG advertising and analytics */ ?>
    <?php include "includes/project-metrics.inc"; ?>
    <?php include "includes/metrics.inc"; ?>

    <script src="dist/scripts.js"></script>

    <?php if($_SERVER['SERVER_NAME'] === 'localhost'): ?>
      <script src="//localhost:35729/livereload.js"></script>
    <?php endif; ?>
  </body>
</html>
