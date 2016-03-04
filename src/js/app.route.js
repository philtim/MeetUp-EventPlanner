(function() {
  'use strict';

  angular
    .module('eventPlanner')
    .config(routerConfig);

  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'section/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      })

      .state('login', {
        url: '/login',
        templateUrl: 'section/login/login.html',
        controller: 'LoginController',
        controllerAs: 'main'
      });

    $urlRouterProvider.otherwise('/');
  }

})();
