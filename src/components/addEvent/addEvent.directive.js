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
      link: linkFunc,
      templateUrl: './components/addEvent/addEvent.html',
      controller: AddEventController,
      controllerAs: 'vm'
    };

    return directive;

    function linkFunc(scope, el, attr, vm) {
      $log.debug(el);
      el.find('input').on('blur', function(ev) {
        $log.debug('OnBlur', ev.currentTarget);
        vm.validate(ev.currentTarget);
        scope.$apply();
      })
    }

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
