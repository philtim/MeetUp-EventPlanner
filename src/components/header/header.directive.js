(function () {
  'use strict';

  angular
    .module('eventPlanner')
    .directive('header', header);

  header().$inject = [];

  function header() {
    var directive = {
      restrict: 'E',
      scope: {
      },
      templateUrl: './components/header/header.html',
      controller: HeaderController,
      controllerAs: 'vm'
    };

    return directive;

    function HeaderController() {}
  }

})();
