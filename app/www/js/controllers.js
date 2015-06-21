var HARDCODEDUSER = {"id":"1409029225","birthday":"02/28/1983","email":"mrnz@wp.pl","first_name":"Przemek","gender":"male","last_name":"Marciniak","link":"http://www.facebook.com/1409029225","locale":"en_US","name":"Przemek Marciniak","timezone":1,"updated_time":"2015-01-05T22:47:38+0000","verified":true,"src":"http://graph.facebook.com/1409029225/picture?type=large"};

angular.module('starter.controllers', [])


.controller('AppCtrl', function($scope) {
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

  var map = new ol.Map({
    target: 'map',
    layers: [
      new ol.layer.Tile({
        source: new ol.source.MapQuest({
          layer: 'osm'
        })
      })
    ],
    view: new ol.View({
      center: ol.proj.transform([-3.1889, 55.9531], 'EPSG:4326', 'EPSG:3857'),
      zoom: 15
    })
  });
})


.controller('ChallengesCtrl', function($scope, $state, $http, $interval) {

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









// ======================================================== OLD


.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [{
    title: 'Reggae',
    id: 1
  }, {
    title: 'Chill',
    id: 2
  }, {
    title: 'Dubstep',
    id: 3
  }, {
    title: 'Indie',
    id: 4
  }, {
    title: 'Rap',
    id: 5
  }, {
    title: 'Cowbell',
    id: 6
  }];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {});