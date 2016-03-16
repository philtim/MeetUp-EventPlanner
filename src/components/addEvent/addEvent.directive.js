(function () {
  'use strict';

  angular
    .module('eventPlanner')
    .directive('addEvent', addEvent);

  addEvent().$inject = [
    '$filter',
    '$log'
  ];

  function addEvent($filter, $log) {
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

      if (!Modernizr.inputtypes.date) {
        vm.hasDate = false;
        el.addClass('noDate');
      } else {
        vm.hasDate = true;
      }

      if (!Modernizr.inputtypes.time) {
        vm.hasTime = false;
        el.addClass('noTime');
      } else {
        vm.hasTime = true;
      }

      // check if guest form should be valid/invalid
      var guestWatcher = scope.$watchCollection(
        'vm.event.guests',
        function () {
          if(vm.event.guests.length == 0) {
            vm.eventForm.guest.$setValidity('guests', false);
          } else {
            vm.eventForm.guest.$setValidity('guests', true);
          }
        }
      );

      // alternate date creation
      var dateWatcher =  scope.$watchCollection(
        'vm.event.altDate',
        function (newValue, oldValue) {
          if(angular.isUndefined(newValue) || newValue === oldValue) return;

          if(newValue.hasOwnProperty('startDate') && newValue.hasOwnProperty('startTime')) {
            if(angular.isDefined(newValue.startDate) || angular.isDefined(newValue.startTime)) {
              vm.event.startDate = createDateObject(newValue.startDate, newValue.startTime);
            }
          }

          if(newValue.hasOwnProperty('endDate') && newValue.hasOwnProperty('endTime')) {
            if(angular.isDefined(newValue.endDate) || angular.isDefined(newValue.endTime)) {
              vm.event.endDate = createDateObject(newValue.endDate, newValue.endTime);
            }
          }
        }
      );

      // remove watcher once directive gets removed
      scope.$on('destroy', function () {
        guestWatcher();
        dateWatcher();
      })

    }

    function createDateObject(date, time) {
      time = time.split(':');
      date = date.split('/');
      var startDate = {};

      try {
        startDate = new Date(date[2], date[1]-1, date[0], time[1], time[0]);
      } catch(err) {
        $log.error('Creation of date threw error:', err);
      }

      return startDate;
    }

    function AddEventController() {
      var vm = this;
      vm.event = {};
      vm.event.guests = [];
      vm.today = $filter('date')(new Date(), 'mm/dd/yyyy');

      vm.addGuest = function addGuest(guest) {
        vm.event.guests.push(guest);
        vm.guest = '';
      };

      vm.removeGuest = function removeGuest(event, index) {
        event.preventDefault();
        vm.event.guests.splice(index, 1);
      };

      vm.clearForm = function clear() {
        vm.event = {};
        vm.eventForm.$setPristine();
        vm.eventForm.$setUntouched();
        vm.event.guests = [];
      };

      vm.checkDate = function checkDate(form, value) {
        var date = new Date(value);
        var today = new Date();

        if(today > date) {
          form.$setValidity('eventInPast', false);
        } else {
          form.$setValidity('eventInPast', true);
        }
      };

      vm.checkDateAndCompare = function checkDateAndCompare(form, valueEnd, valueStart) {
        vm.checkDate(form, valueEnd);

        if(valueStart) {
          var startDate = new Date(valueStart);
          var endDate = new Date(valueEnd);

          $log.debug(startDate, endDate);
          if(startDate > endDate) {
            form.$setValidity('eventEndInPast', false);
          } else {
            form.$setValidity('eventEndInPast', true);
          }
        }
      }



    }

  }

})();
