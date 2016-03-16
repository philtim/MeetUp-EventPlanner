(function () {
  'use strict';

  angular
    .module('eventPlanner')
    .directive('login', login);

  login.$inject = [
    '$log',
    'userService'
  ];

  function login($log, userService) {
    var directive = {
      restrict: 'E',
      scope: {
        userName: '=',
        userPassword: '='
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
      }
    }
  }

})();
