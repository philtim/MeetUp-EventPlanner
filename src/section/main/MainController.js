(function () {
  'use strict';

  angular
    .module('eventPlanner')
    .controller('MainController', MainController);

  MainController.$inject = [
    '$log',
    'eventService'
  ];

  function MainController($log, eventService) {
    var vm = this;
    vm.events = eventService.getEvents();

    vm.addEvent = function(event) {
      $log.debug('addEvent', event);
      eventService.addEvent(angular.copy(event));
    };

  }

})();
