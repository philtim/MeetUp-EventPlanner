(function () {
  'use strict';

  angular
    .module('eventPlanner')
    .directive('signupLogin', signupLogin);

  function signupLogin() {
    var directive = {
      restrict: 'E',
      scope: {
        userName: '=',
        userPassword: '='
      },
      templateUrl: './components/signupLogin/signupLogin.html',
      controller: LoginSignupController,
      controllerAs: 'vm'
    };

    return directive;

    function LoginSignupController() {
      var vm = this;
    }
  }

})();
