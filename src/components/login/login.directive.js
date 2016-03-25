(function () {
  'use strict';

  angular
    .module('eventPlanner')
    .directive('login', login);

  login.$inject = [
    '$rootScope',
    'AUTH_EVENTS',
    '$timeout',
    'userService'
  ];

  function login($rootScope, AUTH_EVENTS, $timeout, userService) {
    var directive = {
      restrict: 'E',
      scope: {
        loginForm: '@'
      },
      link: linkFunc,
      templateUrl: './components/login/login.html',
      controller: LoginController,
      controllerAs: 'vm'
    };

    return directive;

    function linkFunc(scope, el, attrs, vm) {
      angular.element(el).find('input')[0].focus();
    }

    function LoginController() {
      var vm = this;

      vm.authenticate = function authenticate(user) {
        userService.authenticate(user);
      };

      // check for successful login attempt
      $rootScope.$on(AUTH_EVENTS.loginSuccess, function loginSuccess() {
        if (angular.isDefined(vm.loginForm)) {
          vm.loginForm.username.$setValidity('loginFailure', true);
        }
      });

      // check for unsuccessful login attempt
      $rootScope.$on(AUTH_EVENTS.loginFailed, function loginFailed() {
        vm.loginForm.username.$setValidity('loginFailure', false);

        $timeout(function () {
          vm.loginForm.username.$setValidity('loginFailure', true);
        }, 2000);
      });
    }
  }

})();
