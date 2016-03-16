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
        signupForm: '@'
      },
      templateUrl: './components/signup/signup.html',
      controller: SignupController,
      controllerAs: 'vm'
    };

    return directive;

    function SignupController() {
      var vm = this;

      vm.register = function register() {

      }
    }
  }

})();
