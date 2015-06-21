// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'ngAnimate'])

.run(function($ionicPlatform) {
  
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('login', {
    url: "/login",
    abstract: false,
    templateUrl: "templates/login.html",
    controller: 'LoginCtrl'
  })



  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'AppCtrl'
  })





  .state('app.welcome', {
    url: "/welcome",
    abstract: false,
    views: {
      'menuContent': {
        templateUrl: "templates/welcome.html",
        controller: 'WelcomeCtrl'
      }
    }
  })

  .state('app.leaderboard', {
    url: "/leaderboard",
    abstract: false,
    views: {
      'menuContent': {
        templateUrl: "templates/leaderboard.html",
        controller: 'LeaderboardCtrl'
      }
    }
  })


  .state('app.user', {
    url: "/user/:id",
    abstract: false,
    views: {
      'menuContent': {
        templateUrl: "templates/user.html",
        controller: 'UserCtrl'
      }
    }
  })

  .state('app.questroom', {
    url: "/questroom",
    abstract: false,
    views: {
      'menuContent': {
        templateUrl: "templates/questroom.html"
        // controller: 'LeaderboardCtrl'
      }
    }
  })

  .state('app.trophyroom', {
    url: "/trophyroom",
    abstract: false,
    views: {
      'menuContent': {
        templateUrl: "templates/trophyroom.html",
        controller: 'TrophyroomCtrl'
      }
    }
  })

  .state('app.challenges', {
    url: "/challenges",
    abstract: false,
    views: {
      'menuContent': {
        templateUrl: "templates/challenges.html",
        controller: 'ChallengesCtrl'
      }
    }
  })

  .state('app.map', {
    url: "/map",
    abstract: false,
    views: {
      'menuContent': {
        templateUrl: "templates/map.html",
        controller: 'MapCtrl'
      }
    }
  })
  


  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise(function() {
    console.log('other')
    return '/app/welcome'
  });
});
