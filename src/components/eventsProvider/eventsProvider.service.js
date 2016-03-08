(function () {
  'use strict';

  angular
    .module('eventPlanner')
    .factory('eventService', eventService);

  eventService.$inject = ['$log'];

  function eventService($log) {

    var mockEvents = [
      { eventName: '',
        eventType: '',
        eventHost: '',
        startDate: '',
        startTime: '',
        endDate: '',
        endTime: '',
        guestList: '',
        location: '',
        message: ''
      }
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
      $log.info('addEvent:', mockEvents);
    }


  }

})();
