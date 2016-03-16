(function () {
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
        controllerAs: 'main',
        resolve: {authenticate: authenticate}
      })

      .state('login', {
        url: '/login',
        templateUrl: 'section/loginSignup/loginSignup.html',
        controller: 'LoginSignupController',
        controllerAs: 'main'
      });

    $urlRouterProvider.otherwise('/login');

    function authenticate($q, $state, $timeout, userService) {
      if (userService.isAuthenticated()) {
        return $q.when();
      } else {
        $timeout(function () {
          $state.go('login')
        });
        return $q.reject()
      }
    }
  }

})();
