angular.module('starter.controllers', [])



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
              var src = 'http://graph.facebook.com/' + data.id + '/picture?type=small';
              $scope.userdata = data;
              $scope.userdata.src = src;
              alert(final)
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
  $scope.redirect = function(uri) {
    $state.go('app.' + uri);
  };
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
.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

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