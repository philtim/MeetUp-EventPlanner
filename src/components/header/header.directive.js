(function () {
  'use strict';

  angular
    .module('eventPlanner')
    .directive('header', header);

  header().$inject = [
    'userService'
  ];

  function header(userService) {
    var directive = {
      restrict: 'E',
      scope: {
      },
      templateUrl: './components/header/header.html',
      controller: HeaderController,
      controllerAs: 'vm'
    };

    return directive;

    function HeaderController() {
      var vm = this;
      vm.isUserAuthenticated = userService.isAuthenticated;

      vm.logout = function () {
        userService.invalidateUser();
      }
    }
  }

})();
