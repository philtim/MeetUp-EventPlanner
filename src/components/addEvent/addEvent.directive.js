(function () {
  'use strict';

  angular
    .module('eventPlanner')
    .directive('addEvent', addEvent);

  function addEvent() {
    var directive = {
      restrict: 'E',
      scope: {
        createEvent: '&addEvent',
        eventForm: '@'
      },
      link: linkFunc,
      templateUrl: './components/addEvent/addEvent.html',
      controller: AddEventController,
      controllerAs: 'vm'
    };

    return directive;

    function linkFunc(scope, el, attrs, vm) {

      // use watchCollection to check if guest form should be valid/invalid
      var guestWatcher = scope.$watchCollection(
        'vm.event.guests',
        function (newVal, oldVal) {
          if(vm.event.guests.length == 0) {
            vm.eventForm.guest.$setValidity('guests', false);
          } else {
            vm.eventForm.guest.$setValidity('guests', true);
          }
        }
      );

      // remove watcher once directive gets removed
      scope.$on('destroy', function () {
        guestWatcher();
      })

    }

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
        vm.event.guests = [];
      };

    }

  }

})();
