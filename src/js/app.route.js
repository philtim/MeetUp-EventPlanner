(function () {
  'use strict';

  angular
    .module('eventPlanner')
    .config(routerConfig);

  function routerConfig($stateProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'section/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      })

      .state('login', {
        url: '/login',
        templateUrl: 'section/loginSignup/loginSignup.html',
        controller: 'LoginSignupController',
        controllerAs: 'main'
      });

  }

})();
