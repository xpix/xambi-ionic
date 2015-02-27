angular.module('starter.controllers', ['starter.services','chart.js'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('SessionsCtrl', function($scope, Session) {
   $scope.sessions = Session.jsonpquery();
   console.log($scope.sessions);
})

.controller("LineCtrl", function ($rootScope, $scope, $stateParams, Sensor) {
  var sensor = $rootScope.sensor;

  //define vars for chart
  $scope.labels = [];
  $scope.series = sensor.info.config.ValNames;
  $scope.data = [];


  // last 6 houres
  // http://78.43.187.187:3080/topic/rollup/avg/1h?path=/sensors/411&start=-30000&prepare=true
  var json = Sensor.jsonpquery({start: -22000,  path: '/sensors/' + sensor.sensor}, function(results){
     for(idx in results){
         item = results[idx];
         if(!item.Time)
            continue;
   
         // Labels in X-Axis
         $scope.labels.push(item.Time);
   
         // save Data
         for(vname in item){
            vitem = item[vname];
            if(vname.match(/^Power/)){
               if(typeof $scope.data[0] == 'undefined')
                  $scope.data[0] = [];
               $scope.data[0].push(vitem);
            }
            if(vname.match(/Value/)){
               var nr = parseInt(vname.substr(-1)) + 1;
               if(typeof $scope.data[nr] == 'undefined')
                  $scope.data[nr] = [];
               $scope.data[nr].push(vitem);
            }
         }
     }
      console.log($scope.data, $scope.labels);
  });


  $scope.onClick = function (points, evt) {
    console.log(points, evt);
  };
})

.controller('SensorCtrl', function($rootScope, $scope, $stateParams, Sensor) {
   // Get data from selected sensor from 
   // $rootScope to prevent a reload
   for(var sensoridx in $rootScope.sensors){
      var sensorobj = $rootScope.sensors[sensoridx];
      if(sensorobj.sensor == $stateParams.sensorId){
         $scope.sensor = sensorobj;
         $rootScope.sensor = sensorobj;
      }
   }
})

.controller('SessionCtrl', function($rootScope, $scope, $stateParams, Session) {
   $scope.group = $stateParams.sessionId;
   $scope.sensors = Session.jsonpquery({subparams: $stateParams.sessionId});
   $rootScope.sensors = $scope.sensors;
   console.log($scope.sensors);
});
