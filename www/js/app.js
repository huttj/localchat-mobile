// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('LocalChat', ['ionic'])

  .run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      if(window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      }
      if(window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  })

  .config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

    $ionicConfigProvider.views.transition('ios');
    $ionicConfigProvider.scrolling.jsScrolling(false);

      $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('login', {
        url: '/',
        controller: 'LoginCtrl',
        templateUrl: 'views/login.html'
      })

      .state('tabs', {
        url: '/tabs',
        templateUrl: 'views/tabs.html',
        abstract: true
      })

      .state('tabs.chat', {
        url: '/chat',
        views: {
          chat: {
            templateUrl: 'views/chat.html'
          }
        }
      })

      .state('tabs.messages', {
        url: '/messages',
          views: {
            messages: {
              templateUrl: 'views/messages.html'
            }
          }
      })

      .state('tabs.settings', {
        url: '/settings',
        views: {
          settings: {
            controller: 'SettingsCtrl',
            templateUrl: 'views/settings.html'
          }
        }
      });

  });
