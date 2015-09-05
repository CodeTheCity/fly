var HARDCODEDUSER = {"id":"1409029225","birthday":"02/28/1983","email":"mrnz@wp.pl","first_name":"Przemek","gender":"male","last_name":"Marciniak","link":"http://www.facebook.com/1409029225","locale":"en_US","name":"Przemek Marciniak","timezone":1,"updated_time":"2015-01-05T22:47:38+0000","verified":true,"src":"http://graph.facebook.com/1409029225/picture?type=large"};

angular.module('starter.controllers', [])


.controller('AppCtrl', function($scope) {
  $scope.dpsoa = 'dsadsa';
})

.controller('LoginCtrl', function($scope, $state) {
  // openFB.init({
  //   appId: '786735534689395'
  // });
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
              // console.log('http://graph.facebook.com/' + data.id + '/picture?type=large')
              var src = 'http://graph.facebook.com/' + data.id + '/picture?type=large';
              $scope.userdata = data;
              $scope.userdata.src = src;
              HARDCODEDUSER = $scope.userdata;
              //HARDCODEDUSER.src = src;
              
              console.log(HARDCODEDUSER)
              
              $state.go('app.welcome')
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
  $scope.initial = true; 
  
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


.controller('questroom', function($scope, $state,  $http) {
  $scope.redirect = function(uri) {
    $state.go('app.' + uri);
  };


  $http.get('http://codethecity-fly.herokuapp.com/quest/species/')
      .success(function(data, status) {
          console.log('data');
          $scope.data = data;
      });

})

.controller('quest', function($scope, $state,  $http) {
  $scope.redirect = function(uri) {
    $state.go('app.' + uri);
  }

  $scope.picture = function() {
    console.log('pic');

    navigator.camera.getPicture(onSuccess, onFail, { quality: 50,
    destinationType: Camera.DestinationType.FILE_URI });

    function onSuccess(imageURI) {
         var image = document.getElementById('myImage');
         image.src = imageURI;
    }

    function onFail(message) {
        alert('Failed because: ' + message);
    }
  }
})

.controller('MapCtrl', function($scope, $state) {
  console.log('map');
  $scope.redirect = function(uri) {
    $state.go('app.' + uri);
  };
    map = new OpenLayers.Map("mapdiv");
    map.addLayer(new OpenLayers.Layer.OSM());
    
    epsg4326 =  new OpenLayers.Projection("EPSG:4326");
    projectTo = map.getProjectionObject();
   
    var lonLat = new OpenLayers.LonLat( -3.24, 55.9331 ).transform(epsg4326, projectTo);
          
    var zoom=13;
    map.setCenter (lonLat, zoom);

    var vectorLayer = new OpenLayers.Layer.Vector("Overlay");

    var points = [-3.2781,55.9257,
-3.2335,55.9507,
-3.2151,55.9221,
-3.2554,55.9188,
-3.2400,55.9408,
-3.2880,55.9169,
-3.2698,55.9291,
-3.2181,55.9465,
-3.2340,55.9114,
-3.2143,55.9355,
-3.2233,55.9233,
-3.2584,55.9156,
-3.2411,55.9390,
-3.2586,55.9490,
-3.2843,55.9355,
-3.2224,55.9222,
-3.2255,55.9183,
-3.2591,55.9130,
-3.2367,55.9218,
-3.2847,55.9418
];
    var imagesNames = ["flower.png", "frog.png", "oak.png", "fish.png", "lion.png"];
    
    for (i = 0; i < 20; i++) {
       vectorLayer.addFeatures(new OpenLayers.Feature.Vector(
            new OpenLayers.Geometry.Point( points[2*i], points[2*i+1] ).transform(epsg4326, projectTo),
            {description:'This is the value of<br>the description attribute'} ,
            {externalGraphic: './img/'+imagesNames[i%5], graphicHeight: 30, graphicWidth: 30, graphicXOffset:-15, graphicYOffset:-10  }
        )
       );
    }

    map.addLayer(vectorLayer);
})


.controller('ChallengesCtrl', function($scope, $state, $http, $interval) {

  
  $scope.userdata = HARDCODEDUSER;
  
  $scope.timer = 6;
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

