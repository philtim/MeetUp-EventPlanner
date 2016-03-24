(function () {
  'use strict';

  angular
    .module('eventPlanner')
    .directive('event', event);

  event.$inject = [];

  function event() {
    var directive = {
      restrict: 'E',
      scope: {
        event: '='
      },
      link: linkFunc,
      templateUrl: './components/event/event.html',
      controller: EventController,
      controllerAs: 'vm'
    };

    return directive;

    function linkFunc(scope, el, attrs, vm) {}

    function EventController() {}
  }

})();
