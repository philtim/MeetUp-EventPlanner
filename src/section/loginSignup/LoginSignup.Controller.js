(function () {
  'use strict';

  angular
    .module('eventPlanner')
    .controller('LoginSignupController', LoginSignupController);

  LoginSignupController.$inject = [
    '$rootScope',
    '$state',
    'AUTH_EVENTS'
  ];

  function LoginSignupController($rootScope, $state, AUTH_EVENTS) {
    $rootScope.$on(AUTH_EVENTS.loginSuccess, loginSuccess);

    function loginSuccess() {
      $state.go('home');
    }
  }

})();
