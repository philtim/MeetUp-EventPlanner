(function () {
  'use strict';

  angular
    .module('eventPlanner')
    .directive('addEvent', addEvent);

  addEvent.$inject = ['$log'];


  function addEvent($log) {
    var directive = {
      restrict: 'E',
      scope: {
        createEvent: '&addEvent',
        eventForm: '@'
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

      vm.addGuest = function addGuest(guest) {
        vm.event.guests.push(guest);
        vm.guest = '';
      };

      vm.removeGuest = function removeGuest(index) {
        vm.event.guests.splice(index, 1);
      };

      vm.clearForm = function clear() {
        vm.event = {};
        vm.eventForm.$setPristine();
        vm.eventForm.$setUntouched();
      };

    }
  }

})();
