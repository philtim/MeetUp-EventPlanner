(function () {
  'use strict';

  angular
    .module('eventPlanner')
    .controller('MainController', MainController);

  MainController.$inject = [
    'eventService'
  ];

  function MainController(eventService) {
    var vm = this;
    vm.events = eventService.getEvents();

    vm.addEvent = function (event) {
      eventService.addEvent(angular.copy(event));
    };

  }

})();
