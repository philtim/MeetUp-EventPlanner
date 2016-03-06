(function () {
  'use strict';

  angular
    .module('eventPlanner')
    .directive('addEvent', addEvent);


  function addEvent($log) {
    var directive = {
      restrict: 'E',
      scope: {
        test: '&'
      },
      templateUrl: './components/addEvent/addEvent.html',
      controller: AddEventController,
      controllerAs: 'vm'
    };

    return directive;

    function AddEventController() {
      var vm = this;

      vm.submit = function submit(event) {
        $log.debug('Inside submit', event);
        vm.test();
      }
    }
  }

})();
