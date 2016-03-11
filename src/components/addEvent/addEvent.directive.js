(function () {
  'use strict';

  angular
    .module('eventPlanner')
    .directive('addEvent', addEvent);


  function addEvent($log) {
    var directive = {
      restrict: 'E',
      scope: {
        createEvent: '&addEvent'
      },
      templateUrl: './components/addEvent/addEvent.html',
      controller: AddEventController,
      controllerAs: 'vm'
    };

    return directive;

    function AddEventController() {
      var vm = this;
      vm.event = {};
      vm.event.guests = [];
      vm.isEventComplete = false;

      vm.addGuest = function addGuest(guest) {
        vm.event.guests.push(guest);
        vm.guest = '';
      };

      vm.clearForm = function clear() {
        vm.event = {};
        vm.isEventComplete = false;
      };

      vm.validate = function submit(el) {
        $log.debug('Inside validate', el);
        vm.isEventComplete = true;
      }

    }
  }

})();
