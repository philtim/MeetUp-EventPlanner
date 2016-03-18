(function () {
  'use strict';

  angular
    .module('eventPlanner')
    .controller('MainController', MainController);

  MainController.$inject = [
    'eventService',
    'userService'
  ];

  function MainController(eventService, userService) {
    var vm = this;
    vm.events = eventService.getEvents();

    vm.addEvent = function (event) {
      eventService.addEvent(angular.copy(event));
    };

    vm.logout = function () {
      userService.invalidateUser();
    }

  }

})();
