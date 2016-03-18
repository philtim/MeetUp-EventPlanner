(function () {
  'use strict';

  angular
    .module('eventPlanner', ['ui.router', 'ngStorage'])
    .run(runConfig);

  function runConfig($rootScope, $state, userService) {
    $rootScope.$on('$stateChangeStart', function (ev, toState) {

      var isLogin = toState.name === 'login';
      if (isLogin) {
        return;
      }

      if (userService.isAuthenticated() === false) {
        ev.preventDefault();
        $state.go('login');
      }

    });
  }

})();
