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
      link: linkFunc,
      templateUrl: './components/signup/signup.html',
      controller: SignupController,
      controllerAs: 'vm'
    };

    return directive;

    function linkFunc(scope, el, attrs, vm) {
      angular.element(el).find('input')[0].focus();
    }

    function SignupController() {
      var vm = this;

      vm.registerUser = function register(user) {
        userService.registerUser(user);
      }
    }
  }

})();
