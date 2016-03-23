(function () {
  'use strict';

  angular
    .module('eventPlanner')
    .config(routerConfig);

  function routerConfig($stateProvider) {
    $stateProvider
      .state('events', {
        url: '/events',
        templateUrl: 'section/main/main.html',
        controller: 'MainController',
        controllerAs: 'vm'
      })

      .state('login', {
        url: '/',
        templateUrl: 'section/loginSignup/loginSignup.html',
        controller: 'LoginSignupController',
        controllerAs: 'vm'
      });

  }

})();
