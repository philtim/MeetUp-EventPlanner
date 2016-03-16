(function () {
  'use strict';

  angular
    .module('eventPlanner')
    .directive('signup', signup);

  signup.$inject = [
    '$log',
    'userService'
  ];

  function signup($log, userService) {
    var directive = {
      restrict: 'E',
      scope: {
        userName: '=',
        userPassword: '='
      },
      templateUrl: './components/signup/signup.html',
      controller: LoginController,
      controllerAs: 'vm'
    };

    return directive;

    function LoginController() {
      var vm = this;

      vm.register = function register() {

      }
    }
  }

})();
