(function () {
  'use strict';

  angular
    .module('eventPlanner')
    .factory('eventService', eventService);

  eventService.$inject = [];

  function eventService() {

    var mockEvent1 = {
      name: 'Event',
      type: 'Geburtstag',
      host: 'Ich',
      start: '2016-12-30T22:59:00.000Z',
      end: '2016-12-31T22:59:00.000Z',
      guests: ['Philipp', 'Amy-Zoe'],
      location: 'Egenhausen',
      message: 'Testnachricht'
    };

    var mockEvents = [
      mockEvent1
    ];

    return {
      getEvents: getEvents,
      addEvent: addEvent
    };

    function getEvents() {
      return mockEvents;
    }

    function addEvent(event) {
      mockEvents.push(event);
    }

  }

})();
