angular.module('starter.controllers', [])



.controller('LoginCtrl', function($scope) {

})

.controller('WelcomeCtrl', function($scope, $state) {
  $scope.redirect = function(uri) {
    $state.go('app.' + uri);
  };
})

.controller('LeaderboardCtrl', function($scope, $state) {
  $scope.redirect = function(uri) {
    $state.go('app.' + uri);
  };
})


.controller('TrophyroomCtrl', function($scope, $state) {
  $scope.redirect = function(uri) {
    $state.go('app.' + uri);
  };
})

.controller('ChallengesCtrl', function($scope, $state, $http, $interval) {
  
  $scope.timer = 10;
  $scope.isDisabled = true;
  var interval =  $interval(function() {
    $scope.timer--;
    if($scope.timer === 0){
      $interval.cancel(interval);
      $scope.isDisabled = false;
    }
      
    
    
  },1000);
  
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