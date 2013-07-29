nxt-box
==========================================


Introduction
------------

Nxt-box is a flexible single javascript box that you can use for all your
purposes. You can call it from everywhere in your AngularJS website. The popup
can contain anything. For now it is used as a popup in a map application.


Install
-------

Add nxt-box to your Django site::

- add nxt-box to setup.py
- add nxt_box to settings.py
- include js and css in your page

<script type="text/javascript" src="{{ STATIC_URL }}nxt_box/nxt-box.js"></script>
<link href="{{ STATIC_URL }}nxt_box/nxt-box.css" rel="stylesheet"/>

- optionally add nxt-box to buildout.cfg as auto-checkout and add source if you want to develop.


Usage
-----

Step 1
======

Make a div with BoxAwesome as below. Content types can be defined and coupled
to specific pieces of html. See "manhole" as an example for a static html and
"nxt-timeseries" is an example of a dynamic content (which uses nxt-graph).


<div id="box-awesome-wrapper" ng-controller="BoxAwesome">
  <div id="box-awesome" class="hide" ng-class="{hide: box.disabled}">
    <div id="box-awesome-inner" class="options">
      <button type="button" ng-click="close_box()" class="pull-right" title="{% trans "Close" %}">×</button>

      <div ng-switch on="box.content.type">
      <!-- TODO: Generate these with Django Templates -->
        <div ng-switch-when="infopoint" ng-controller="InfoPoint">
          <h2>{% trans "Water height" %}</h2>
          <nxt-timeseries url="{[{ infourl }]}" height="300px"></nxt-timeseries>
        </div>
        <div ng-switch-when="manhole" ng-controller="Manhole">
          <h2>{% trans "Discharge" %}</h2>
          <div class="row-fluid spacer">
            <div class="span6">
              <span class="rain-helper">{% trans "Discharge:"%}</span>
            </div>
            <div class="span6">
              <div class="btn-group">
                <a ng-click="little()" class="btn btn-disturbance"
                ng-class="{active: box.content.properties.amount <= 100}">
                {% trans "Low" %}</a>
                <a ng-click="much()" class="btn btn-disturbance"
                ng-class="{active: box.content.properties.amount > 100}">
                {% trans "High" %}</a>
              </div>
            </div>
          </div>
          <a ng-click="save()" class="btn btn-success pull-right">{% trans "Save" %}</a>
        </div>
      </div>
    </div>
  </div>
</div>

Step 2
======

From your controller, call open_box using a $broadcast. In your content, define the type as in Step 1 and add optional variables.


html::


<div ng-controller="ExampleController">
  <button type="button" ng-click="button_action()">action!</button>
</div>


js::


app.controller("ExampleController", ["$scope", "$rootScope"
               function($scope, $rootScope){

  // For example you press a button 
  $scope.button_action = function() {
    var content = {
        type: 'manhole',
        properties: 'bladiblabla',
        marker: 'some more content'
    }
    $rootScope.$broadcast('open_box', content);
  }
}]);


Optionally the popup itself can be made very interactive. The controller is one of the ng-switch items. If it is static or if it only uses "content", you don't have to make a controller at all.


// Stupid example that doesn't do anything, really.
app.controller("Manhole", ["$scope", function($scope) {
    // react on 'manhole', that's defined in your button_action.

    $scope.$on('manhole', function(message, content){
      // do something with your content.
      $scope.properties = content.properties;
      $scope.marker = content.marker;
    });
}]);


Post-nensskel setup TODO
------------------------

Here are some instructions on what to do after you've created the project with
nensskel.

- Check https://github.com/nens/nxt-box/settings/collaboration if the team
  "Nelen & Schuurmans" has access.

- Add a new jenkins job at
  http://buildbot.lizardsystem.nl/jenkins/view/djangoapps/newJob or
  http://buildbot.lizardsystem.nl/jenkins/view/libraries/newJob . Job name
  should be "nxt-box", make the project a copy of the existing "lizard-wms"
  project (for django apps) or "nensskel" (for libraries). On the next page,
  change the "github project" to ``https://github.com/nens/nxt-box/`` and
  "repository url" fields to ``git@github.com:nens/nxt-box.git`` (you might
  need to replace "nens" with "lizardsystem"). The rest of the settings should
  be OK.
