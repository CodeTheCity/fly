var HARDCODEDUSER = {"id":"1409029225","birthday":"02/28/1983","email":"mrnz@wp.pl","first_name":"Przemek","gender":"male","last_name":"Marciniak","link":"http://www.facebook.com/1409029225","locale":"en_US","name":"Przemek Marciniak","timezone":1,"updated_time":"2015-01-05T22:47:38+0000","verified":true,"src":"http://graph.facebook.com/1409029225/picture?type=large"};

angular.module('starter.controllers', [])


.controller('AppCtrl', function($scope) {
  $scope.dpsoa = 'dsadsa';
})

.controller('LoginCtrl', function($scope) {
  openFB.init({
    appId: '786735534689395'
  });
  var callback = function(a) {
    console.log(a);
  };
  $scope.userdata = {};
  $scope.loginViaFB = function login() {
    openFB.login(
      function(response) {
        if (response.status === 'connected') {
          openFB.api({
            path: '/me',
            success: function(data) {

              var final = JSON.stringify(data);
              var data = data;
              var src = 'http://graph.facebook.com/' + data.id + '/picture?type=large';
              $scope.userdata = data;
              $scope.userdata.src = src;
              final.src = src;
              HARDCODEDUSER = final;
            },
            error: function(e) {
              console.log(e)
            }
          });
        } else {
          alert('Facebook login failed: ' + response.error);
        }
      }, {
        scope: 'email'
      });
  }
})

.controller('WelcomeCtrl', function($scope, $state) {
  $scope.userdata = HARDCODEDUSER;
  $scope.redirect = function(uri) {
    $state.go('app.' + uri);
  };
  console.log($scope.userdata)

})

.controller('UserCtrl', function($scope, $state, userFactory) {
  $scope.redirect = function(uri) {
    $state.go('app.' + uri);
  };
  
  $scope.userID = $state.params.id;
  $scope.userdata = userFactory.getUSerByID($scope.userID );

})

.controller('LeaderboardCtrl', function($scope, $state, userFactory) {
  
  $scope.redirect = function(uri) {
    $state.go('app.' + uri);
  };
  
  $scope.users = userFactory.getAllUSers();
  
  $scope.redirectToUserPage= function(id) {
    $state.go('app.user',{id:id});
  };

})


.controller('TrophyroomCtrl', function($scope, $state) {
  $scope.redirect = function(uri) {
    $state.go('app.' + uri);
  };
})

.controller('MapCtrl', function($scope, $state) {
  $scope.redirect = function(uri) {
    $state.go('app.' + uri);
  };
    map = new OpenLayers.Map("mapdiv");
    map.addLayer(new OpenLayers.Layer.OSM());
    
    epsg4326 =  new OpenLayers.Projection("EPSG:4326");
    projectTo = map.getProjectionObject();
   
    var lonLat = new OpenLayers.LonLat( -3.1889, 55.9531 ).transform(epsg4326, projectTo);
          
    var zoom=13;
    map.setCenter (lonLat, zoom);

    var vectorLayer = new OpenLayers.Layer.Vector("Overlay");

    var points = [-3.2, 55.9531, -3.1889, 55.96, -3.19, 55.95];
    var imagesNames = ["fl1.png", "fl2.png", "fl3.png"];
    
    for (i = 0; i < 3; i++) {
       vectorLayer.addFeatures(new OpenLayers.Feature.Vector(
            new OpenLayers.Geometry.Point( points[2*i], points[2*i+1] ).transform(epsg4326, projectTo),
            {description:'This is the value of<br>the description attribute'} ,
            {externalGraphic: './img/'+imagesNames[i], graphicHeight: 20, graphicWidth: 20, graphicXOffset:-10, graphicYOffset:-10  }
        )
       );
    }

    map.addLayer(vectorLayer);
})


.controller('ChallengesCtrl', function($scope, $state, $http, $interval) {
  console.log(HARDCODEDUSER)
  $scope.image = HARDCODEDUSER.src;
  $scope.username = HARDCODEDUSER.first_name;
  $scope.timer = 10;
  $scope.isDisabled = true;
  var interval = $interval(function() {
    $scope.timer--;
    if ($scope.timer === 0) {
      $interval.cancel(interval);
      $scope.isDisabled = false;
    }
  }, 1000);

  $scope.redirect = function(uri) {
    $state.go('app.' + uri);
  };

  var data = {
    resource_id: '8090096e-16aa-43cc-93ae-bfb4acb8cc54', // the resource id
    limit: 5, // get 5 results
    q: '' // query for 'jones'
  };

  $scope.data = $http({
    method: 'GET',
    dataType: 'jsonp',
    url: 'http://edinburghopendata.info/api/action/datastore_search',
    params: data

  }).success(function(data, status) {
    $scope.people = data;
  });

  // $http.jsonp('http://edinburghopendata.info/api/action/datastore_search', {
  //   data: data
  // }).
  // success(function(data, status, headers, config) {
  //   console.log(data)
  //   // this callback will be called asynchronously
  //   // when the response is available
  // }).
  // error(function(data, status, headers, config) {
  //   // called asynchronously if an error occurs
  //   // or server returns response with an error status.
  // });


})

