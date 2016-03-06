(function () {
  'use strict';

  angular
    .module('eventPlanner')
    .factory('eventService', eventService);

  eventService.$inject = ['$log'];

  function eventService($log) {

    var mockEvents = [
      {name: 'Event 1', date: 'tomorrow', location: 'here'},
      {name: 'Event 2', date: 'yesterday', location: 'there'}
    ];

    return {
      getEvents: getEvents,
      addEvent: addEvent
    };

    function getEvents() {
      return mockEvents;
    }

    function addEvent(event) {
      console.log(event)
      mockEvents.push(event);
      $log.info('addEvent:', mockEvents);
    }


  }

})();
