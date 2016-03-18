(function () {
  'use strict';

  angular
    .module('eventPlanner')
    .directive('login', login);

  login.$inject = [
    '$rootScope',
    'AUTH_EVENTS',
    '$log',
    'userService'
  ];

  function login($rootScope, AUTH_EVENTS, $log, userService) {
    var directive = {
      restrict: 'E',
      scope: {
        loginForm: '@'
      },
      templateUrl: './components/login/login.html',
      controller: LoginController,
      controllerAs: 'vm'
    };

    return directive;

    function LoginController() {
      var vm = this;

      vm.authenticate = function authenticate(user) {
        userService.authenticate(user);
      };

      // check for successful login attempt
      $rootScope.$on(AUTH_EVENTS.loginSuccess, function loginSuccess() {
        if (angular.isDefined(vm.loginForm.username)) {
          vm.loginForm.username.$setValidity('loginFailure', true);
          vm.user = {};
        }
      });

      // check for unsuccessful login attempt
      $rootScope.$on(AUTH_EVENTS.loginFailed, function loginFailed() {
        vm.loginForm.username.$setValidity('loginFailure', false);
        vm.user = {};
      });
    }
  }

})();
